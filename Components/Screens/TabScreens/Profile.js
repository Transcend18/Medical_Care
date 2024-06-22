import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, TouchableWithoutFeedback, View, 
    Platform, Text, Image, Keyboard, ScrollView, TouchableOpacity, 
    Alert, StatusBar as sb} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AppContext } from "../../AppContext/App-Context";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function Profile(){
    const navigator = useNavigation();
    const { userToken, logout, user, userDetails} = useContext(AppContext);

    const checkUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            !token ? navigator.dispatch(StackActions.replace("Login")) : null;
        } catch (error) {
            Alert.alert('Error','problem fetching authorization token @ home');
        }
    [userToken]}

    useEffect(() => {
        checkUserToken();
    },[userToken]);


    return(
        user !==null
        ?
        <KeyboardAvoidingView
        style={{backgroundColor: "white", flex: 1}}
        behavior={Platform.OS=="ios" ? "padding" : 'height'}>
            <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            >
                {/* The Whole page */}
                <View style={{width: "100%", flex: 1}}>
                    <StatusBar style="light"/>
                    {/* Head View */}
                    <View style={{flex: 1,backgroundColor: "#AD88C6", flexDirection: "row", borderBottomLeftRadius: 20, paddingHorizontal: 20, 
                    borderBottomRightRadius: 20, paddingTop: Platform.OS=="ios" ? "14%" : sb.currentHeight, justifyContent: "space-between",
                    borderEndWidth: 3, borderLeftWidth: 3, borderBottomWidth: 3
                    }}>
                        <Text style={{color: "#E1AFD1",fontSize: 38, marginTop: 7, fontWeight: "bold", letterSpacing: 3}}>Profile</Text>
                        <Image style={{width: 50, height: 50}} source={require("../../../assets/images/Logo2.png")}/>
                    </View>
                    
                    {/* Body View */}
                    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 2, width: "100%", paddingBottom: 700}}>
                    <View style={{width: "100%", paddingVertical: 10, paddingHorizontal: 10}}>
                        {/* Hold Profile Picture */}
                        <View style={{width: "100%", alignItems: "center",}}>
                            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{marginLeft: "35%",width: 110, height: 110,}}>
                                    <Image style={{width: 110, height: 110, borderRadius: 100, resizeMode: "contain", borderWidth: 2}}
                                    source={require("../../../assets/images/user1.jpg")}
                                    />
                                    <View style={{position: "absolute", marginTop: 70, alignSelf: "flex-end"}}>
                                        <TouchableOpacity>
                                            <View style={{backgroundColor: "white", borderRadius: 20, borderWidth: 3, borderColor: "white"}}>
                                                <AntDesign name="camera" size={40} color="purple" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{paddingVertical: 20, alignItems: "center"}}>
                                    <TouchableOpacity onPress={logout}>
                                        <Feather style={{alignSelf: "center"}} name="log-out" size={40} color="black" />
                                        <Text>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/*  */}
                            <View style={{width: "100%", alignItems: "center", marginTop: 10}}>
                                <Text style={{fontSize: 22, fontWeight: "bold", letterSpacing: 3}}>{userDetails.Lastname + ' ' + userDetails.Firstname}</Text>
                            </View>

                            {/*  */}
                            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 20}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", letterSpacing: 2}}>Personal info</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 20, color: "purple"}}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                            {/*  */}
                            <View style={{width: "100%"}}>
                                <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20, 
                                backgroundColor: "#aeafb0", flexDirection: "row", justifyContent: "space-between",
                                borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: "center", marginBottom: 5
                                }}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Email</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 18}}>{userDetails.Email}</Text>
                                    </View>
                                </View>
                                {/*  */}
                                <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20, 
                                backgroundColor: "#aeafb0", flexDirection: "row", justifyContent: "space-between",
                                alignItems: "center", marginBottom: 5
                                }}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Phone</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 18}}>{userDetails.PhoneNumber}</Text>
                                    </View>
                                </View>
                                {/*  */}
                                <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20, 
                                backgroundColor: "#aeafb0", flexDirection: "row", justifyContent: "space-between",
                                borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: "center", marginBottom: 5
                                }}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Location</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 18}}>Oye-Ekiti</Text>
                                    </View>
                                </View>
                            </View>


                            {/* Second Section fpr Medical records*/}
                            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 20}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", letterSpacing: 2}}>Records</Text>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 20, color: "purple"}}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                            {/*  */}
                            <View style={{width: "100%"}}>
                                <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20, 
                                backgroundColor: "#aeafb0", flexDirection: "row", justifyContent: "space-between",
                                borderTopRightRadius: 20, borderTopLeftRadius: 20, alignItems: "center", marginBottom: 5
                                }}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Blood Group</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 18}}>O+</Text>
                                    </View>
                                </View>
                                {/*  */}
                                <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20, 
                                backgroundColor: "#aeafb0", flexDirection: "row", justifyContent: "space-between",
                                alignItems: "center", marginBottom: 5
                                }}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Genotype</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 18}}>AA</Text>
                                    </View>
                                </View>
                                {/*  */}
                                <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20, 
                                backgroundColor: "#aeafb0", flexDirection: "row", justifyContent: "space-between",
                                borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: "center"
                                }}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Age</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 18}}>16</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    :
    null
    )
}