
import { FlatList, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View, ActivityIndicator, Alert } from "react-native";
import { Platform, StatusBar as sb} from "react-native";
import { Card, Searchbar, Text} from "react-native-paper";
import Animated, {FadeInDown, FadeInLeft, FadeInUp} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext/App-Context";
import { getDoc, doc, getDocs, collection, where} from "firebase/firestore";
import { db } from "../../Config/FireBase.config.key";
import { query } from "firebase/firestore";


export function HomeScreen(){
    const navigator = useNavigation()
    const {user, userDetails, setUserDetails, setExpertId, ExpertId, userType, setUserType} = useContext(AppContext);
    

    const getUser = async () => {
        try {
            const onSnap = await getDoc(doc(db,'AccountType_General',JSON.parse(user).user_uid));
            if (onSnap.exists()) {
                setUserDetails(onSnap.data());
            } else {
                console.log("User not found");
            }
        } catch (error) {
            Alert.alert("Eroor", "Check internet connection")
        }
    }
   useEffect(() => {
    if (user) {
        getUser()   
    }
   }, [user]);

   const getUsersWithExpertAccountType = async () => {
        try {
            const q = query(collection(db, "AccountType_General"), where("AccountType", "==", "Expert"));
            const querySnapshot = await getDocs(q);
            const users = [];
            const uID = []
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
                uID.push(doc.id);
            });
            setExpertId(uID)
            setUserType(users);
        } catch (error) {
            console.log("Error getting users", error);
        }
    }
    
   useEffect(() => {
    getUsersWithExpertAccountType()
    }, []);
        
    //console.log(ExpertId[]);
    return(
        userDetails !== null 
        ?
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
                behavior={Platform.OS=="ios" ? "padding" : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    
                    {/*First View */}
                    <View style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <Animated.View entering={FadeInUp.duration(1000).damping()} style={{backgroundColor: '#AD88C6', width: '100%', height: '100%', borderBottomLeftRadius: 35, borderBottomRightRadius: 35, paddingBottom: 20, borderEndWidth: 3, borderLeftWidth: 3, borderBottomWidth: 3}}>
                                {/*Hold Images */}
                                <View style={{flexDirection: 'row', width: '100%'}}>
                                    <Animated.View entering={FadeInLeft.delay(200).duration(2000).damping()}  style={{marginLeft: 10}}>
                                        <Image source={require('../../../assets/images/Logo2.png')}
                                        style={{width: 70, height: 70, marginTop: Platform.OS=='ios' ? 40 : sb.currentHeight}}
                                        />
                                    </Animated.View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '50%', marginLeft: 20}}>
                                        <Animated.Image entering={FadeInUp.delay(200).duration(2000).springify().damping(4)} style={{height: Platform.OS=="android" ? 80 : 110, width: 40}} source={require('../../../assets/images/light.png')}/>
                                        <Animated.Image entering={FadeInUp.delay(300).duration(2000).springify().damping(4)} style={{height: Platform.OS=="android" ? 70 : 90, width: 30}} source={require('../../../assets/images/light.png')}/>
                                    </View>
                                </View>
                                {/*Hold user Name */}
                                <Animated.View entering={FadeInUp.delay(400).duration(2000).damping()} style={{paddingHorizontal: 20, marginVertical: 10}}>
                                    <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
                                        Hi, {userDetails.Lastname + ' ' + userDetails.Firstname}
                                    </Text>
                                </Animated.View>
                                {/*SearchBar */}
                                <Animated.View entering={FadeInDown.delay(500).duration(2000).damping()} style={{paddingHorizontal: 20}}>
                                    <Searchbar
                                    placeholder="Search"
                                    style={{borderRadius: 50, alignItems:'center'}}
                                    />
                                </Animated.View>
                            </Animated.View>
                        </View>
                        <View style={{flex: 2, padding: 10}}>
                            {userType.length > 0
                            ?
                            <FlatList
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            data={userType}
                            renderItem={({item}) => (
                                <TouchableOpacity>
                                    <Card style={{marginRight: 10}}>
                                        <Card.Cover style={{width: 250, height: 150}} resizeMode="cover" source={require("../../../assets/images/user1.jpg")}/>
                                        <Card.Content style={{maxWidth: 250, marginVertical: 10}}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>{item.Lastname + ' ' + item.Firstname}</Text>
                                            <Text style={{fontSize: 16}}>{item.bio}</Text>
                                        </Card.Content>
                                        <Card.Actions>
                                            <TouchableOpacity onPress={() => navigator.navigate("CardScreen", {
                                                name: item.Lastname + ' ' + item.Firstname,
                                                ExpertId: ExpertId
                                            })}>
                                                <View style={{backgroundColor: '#7469B6', paddingVertical: 10, borderRadius: 20, paddingHorizontal: 50}}>
                                                    <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>View Profile</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Card.Actions>
                                    </Card>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => {
                               item.Email
                            }}
                            />
                            :
                            <View style={{flex: 1, marginTop: 200 ,backgroundColor: "white"}}>
                                <ActivityIndicator  animating={true} size={30} color={"blue"}/>
                            </View>
                            }
                        </View>
                    </View>
        
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    :
    <ActivityIndicator size={60} animating={true}/>
    )
}