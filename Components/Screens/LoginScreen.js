import { StackActions, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback, View, Image, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import Animated, {FadeInDown, FadeInUp} from "react-native-reanimated";
import { auth } from "../Config/FireBase.config.key";
import { AppContext } from "../AppContext/App-Context";
import { generateAlphaNumChars } from "../Alpha-num-char/generate-alpha-num-chars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginScreen(){
    const {userToken,setUserToken,setUser} = useContext(AppContext);
    const navigation = useNavigation();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadAnimation, setLoadAnimation] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const checkUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem(`userToken`);
            token ? navigation.dispatch(StackActions.replace("TabScreen")) : null;
        } catch (error) {
            Alert.alert('Error','problem fetching authorization token');
            console.error(error);
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [userToken]);
    
    async function loginAction(){
        if((email.length, password.length) == 0){
            await setLoadAnimation(!loadAnimation)
            setTimeout(() => {
                setLoadAnimation(loadAnimation)
                Alert.alert("Error", "Please fill in all field");
            }, 3000);
        } else{       
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                onAuthStateChanged(auth, async (user) => {
                    let token_ = generateAlphaNumChars(36);
                    let dataForStorage = {
                        token: token_,
                        user_uid: user.uid,
                        user_email: user.email
                    }
                    setUser(user.uid);
                    setUserToken(token_);
                    AsyncStorage.setItem(`userToken`,JSON.stringify(token_));
                    AsyncStorage.setItem('user',JSON.stringify(dataForStorage));
                    
                })
            }).catch( e => {
                setLoadAnimation(!loadAnimation)
                setTimeout(() => {
                    setLoadAnimation(loadAnimation)
                    Alert.alert("Failed", "Invalid Username or Password", [{
                        text: "Retry"
                    }])
                }, 4000);
            })
        }
    };

    return(
        <KeyboardAvoidingView
        style={{backgroundColor: 'white'}}
        behavior={Platform.OS=="ios" ? "padding" : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                        {/*The main page begins here */}
                    <View style={{backgroundColor: "white"}}>
                            <StatusBar style="light"/>
                            <View style={{flex: 1}}>
                                <Image style={{height: Platform.OS=="ios" ? 800 : 650, width: '100vh'}} 
                                source={require('../../assets/images/background.png')}/>
                            </View>
                            {/* lights */}
                            <View style={{position: 'absolute', flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                                <Animated.Image entering={FadeInUp.delay(200).duration(7000).springify().damping(2)} 
                                style={{height: Platform.OS=="android" ? 220 : 250, width: 90}}source={require("../../assets/images/light.png")}/>

                                <Animated.Image entering={FadeInUp.delay(400).duration(7000).springify().damping(2)} 
                                style={{height: Platform.OS=='android' ? 160 : 180, width: 65}}source={require("../../assets/images/light.png")}/>
                            </View>

                            {/* tittle and form */}
                            <View style={{height: "100%", width: "100%", marginTop: Platform.OS=='ios'? '-130%' : '-123%'}}>
                                {/*tittle */}
                                <View style={{alignItems: "center"}}>
                                    <Animated.Text entering={FadeInUp.duration(2000).springify().damping(3)} style={{color: 'white', fontSize: 40, fontWeight: 'bold', letterSpacing: 4}}>
                                        Login
                                    </Animated.Text>
                                </View>

                                {/*Form*/}
                                <View style={{alignItems: 'center', paddingHorizontal: 25, marginTop: Platform.OS=="ios" ? 150 : 100}}>
                                    <Animated.View entering={FadeInDown.delay(200).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 40}}>
                                        <TextInput
                                        label='Email or Card No.'
                                        value={email}
                                        onChangeText={(text) => {setEmail(text)}}
                                        right={<TextInput.Icon icon="account" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(400).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 40}}>
                                        <TextInput
                                        label='Password'
                                        secureTextEntry={hidePassword}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        right={<TextInput.Icon icon="eye" onPress={() => {
                                            setHidePassword(!hidePassword)
                                        }}/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <View style={{width: "100%"}}>
                                        <TouchableOpacity style={{width: '100%'}} onPress={loginAction}>
                                            <Animated.View entering={FadeInDown.delay(600).duration(2000).springify().damping(6)} style={{flexDirection: 'row',marginBottom: Platform.OS=='ios' ? 35 : 10, 
                                                borderRadius: 20, paddingVertical: 10, width: '100%',backgroundColor: "#abcdeb",
                                                alignItems: 'center', paddingLeft: Platform.OS=='ios' ? 130 : 110,
                                                }}>
                                                <ActivityIndicator
                                                animating={loadAnimation}
                                                size={25
                                                }
                                                />
                                                <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>Login</Text>
                                            </Animated.View>
                                        </TouchableOpacity>

                                        <Animated.View entering={FadeInDown.delay(800).duration(8000).springify().damping(6)} 
                                        style={{width: '100%',flexDirection: 'row', alignItems: 'center', paddingHorizontal: '13%', marginBottom: Platform.OS=="ios" ? 150 : 0}}>
                                            <Text style={{fontSize: 18}}>Don't have an account? </Text>
                                            <TouchableOpacity onPress={() => {
                                                navigation.dispatch(
                                                    StackActions.replace('SignUp')
                                                )
                                                }}>
                                                <Text style={{fontSize: 18, color:'red'}}>Signup.</Text>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    </View>

                                </View>

                            </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}