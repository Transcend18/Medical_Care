import { StackActions, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Keyboard, Platform, TouchableWithoutFeedback, View, Image, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator, TextInput } from "react-native-paper";
import Animated, {FadeInDown, FadeInLeft, FadeInRight, FadeInUp} from "react-native-reanimated";
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Config/FireBase.config.key";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


export function SignupScreen(){
    const navigation = useNavigation();

    const [isFocus, setIsFocuse] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    

    const [accountType, setAccountType] = useState("");
    const [Specialization, setSpecialization] = useState("")
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname]= useState("");
    const [countryName, setCountryName]= useState("")
    const [stateName, setStateName]= useState("")
    const [cityName, setCityName]= useState("")
    const [email, setEmail] = useState("");
    const [card, setCard] = useState("");
    const [zipCode, setZipCode]= useState("")
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loadAnimation, setLoadAnimation] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    {/* Create A client Function */}
    async function CreateAClient(){
        // To chect which account type is set
        if (accountType == "Expert") {
            if ((Specialization.length, firstname.length, lastname.length, email.length
                ,address.length, zipCode.length, card.length, password.length, phone.length) == 0)
            {
                await setLoadAnimation(!loadAnimation);
                await setTimeout(() => {
                    setLoadAnimation(loadAnimation);
                    Alert.alert("Failed", "Complete all Fields");
                }, 4000);
            }else{
                await setLoadAnimation(!loadAnimation)
                await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setTimeout(() => {
                        setLoadAnimation(loadAnimation)
                        onAuthStateChanged(auth, (user) => {
                            const uid = user.uid;
                            setDoc(doc(db, "AccountType_General", uid), {
                                AccountType: accountType,
                                Specialization: Specialization,
                                Firstname: firstname,
                                Lastname: lastname,
                                Email: email,
                                Address: address,
                                PostalCode: zipCode,
                                CardNumber: card,
                                PhoneNumber: phone,
                            })
                        })
                    }, 5000);
                    Alert.alert("Success", "Account created Successfully", [{
                    text: "Proceed",
                    onPress: () => {
                        navigation.dispatch(
                            StackActions.replace("Login")
                        )
                    }
                    }]);
                }).catch((e) => {
                    Alert.alert("Failed", "An error has occured", [{
                        text: "Retry"
                    }])
                })
            }
        }else{
            if ((firstname.length, lastname.length, email.length
                ,address.length, zipCode.length, card.length, password.length, phone.length) == 0)
            {
                await setLoadAnimation(!loadAnimation);
                await setTimeout(() => {
                    setLoadAnimation(loadAnimation);
                    Alert.alert("Failed", "Complete all Fields");
                }, 4000);
            }else{
                await setLoadAnimation(!loadAnimation)
                await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setTimeout(() => {
                        setLoadAnimation(loadAnimation)
                        onAuthStateChanged(auth, (user) => {
                            const uid = user.uid;
                            setDoc(doc(db, "AccountType_General", uid), {
                                AccountType: "Patient",
                                Firstname: firstname,
                                Lastname: lastname,
                                Email: email,
                                Address: address,
                                PostalCode: zipCode,
                                CardNumber: card,
                                PhoneNumber: phone,
                            })
                        })
                    }, 5000);
                    Alert.alert("Success", "Account created Successfully", [{
                    text: "Proceed",
                    onPress: () => {
                        navigation.dispatch(
                            StackActions.replace("Login")
                        )
                    }
                    }]);
                }).catch((e) => {
                    Alert.alert("Failed", "An error has occured", [{
                        text: "Retry"
                    }])
                })
            }
        }
    }


    {/*The function to create country data area */}
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://api.countrystatecity.in/v1/countries',
            headers: {
              'X-CSCAPI-KEY': 'RVdMRnJKV1MyMklneDM2VkF6YkR6R1hyT3BLc2xYVWFIOWNabGVCaQ=='
            }
          };
          axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            var count = Object.keys(response.data).length;
            let countryArray = [];
            for(var i = 0; i < count; i++){
                countryArray.push({
                    value: response.data[i].iso2,
                    label: response.data[i].name
                }); 
            }
            setCountryData(countryArray);
          })
          .catch(function (error) {
            console.log(error);
        });
    },[])

    {/*To handle states in country */}
    const handleState = (countryCode) => {
        var config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
            headers: {
              'X-CSCAPI-KEY': 'RVdMRnJKV1MyMklneDM2VkF6YkR6R1hyT3BLc2xYVWFIOWNabGVCaQ=='
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            var count = Object.keys(response.data).length;
            let stateArray = [];
            for(var i = 0; i = count; i++){
                stateArray.push({
                    value: response.data[i].iso2,
                    label: response.data[i].name
                }); 
            }
            setStateData(stateArray);
          })
          .catch(function (error) {
            console.log(error);
        });
    };

    {/*Handle city Dropdown */}
    const handleCity = (countryCode, stateCode) => {
        var config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
            headers: {
              'X-CSCAPI-KEY': 'RVdMRnJKV1MyMklneDM2VkF6YkR6R1hyT3BLc2xYVWFIOWNabGVCaQ=='
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            var count = Object.keys(response.data).length;
            let cityArray = [];
            for(var i = 0; i = count; i++){
                cityArray.push({
                    value: response.data[i].id,
                    label: response.data[i].name
                }); 
            }
            setCityData(cityArray);
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <KeyboardAvoidingView
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
                                        SignUp
                                    </Animated.Text>
                                </View>

                                {/*Form*/}
                                <View style={{alignItems: 'center', paddingHorizontal: 25, marginTop: Platform.OS=="ios" ? 150 : 100}}>
                                    {/*Buttons to register User */}
                                    <View style={{ flexDirection: 'row',justifyContent: 'space-around', width: '100%', marginBottom: 25, marginTop: Platform.OS == "ios" ? -50 : -30}}>
                                        <TouchableOpacity onPress={() => setAccountType("Expert")}>
                                            <Animated.View entering={FadeInLeft.delay(200).duration(2000).damping()}style={{backgroundColor: '#F2BED1', width: 150, alignItems: 'center', paddingVertical: 10, borderRadius: 20}}>
                                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Expert</Text>
                                            </Animated.View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => setAccountType("Patient")}>
                                            <Animated.View entering={FadeInRight.delay(400).duration(2000).damping()} style={{backgroundColor: '#CDFADB', width: 150, alignItems : 'center', paddingVertical: 10, borderRadius: 20}}>
                                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Patient</Text>
                                            </Animated.View>
                                        </TouchableOpacity>
                                    </View>

                                    {accountType == "Expert" ?
                                        <Animated.View entering={FadeInDown.delay(200).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                            <TextInput
                                            label='Specialization/Field'
                                            value={Specialization}
                                            onChangeText={(text) => setSpecialization(text)}
                                            right={<TextInput.Icon icon="star" disabled/>}
                                            style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                            />
                                        </Animated.View>
                                        :
                                        null
                                    }

                                    <Animated.View entering={FadeInDown.delay(200).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label='FirstName'
                                        value={firstname}
                                        onChangeText={(text) => setFirstname(text)}
                                        right={<TextInput.Icon icon="account" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(400).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label='LastName'
                                        value={lastname}
                                        onChangeText={(text) => setLastname(text)}
                                        right={<TextInput.Icon icon="account" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(600).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label='Email'
                                        value={email}
                                        keyboardType="email-address"
                                        onChangeText={(text) => setEmail(text)}
                                        right={<TextInput.Icon icon="fax" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(600).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label='Home/Street No.'
                                        value={address}
                                        keyboardType="default"
                                        onChangeText={(text) => setAddress(text)}
                                        right={<TextInput.Icon icon="home" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    {/* Country DropDown */}
                                    <Animated.View entering={FadeInDown.delay(800).duration(2000).springify().damping(4)}style={{backgroundColor: "#aeafb0", width: "100%", borderRadius: 2, height: 55, borderRadius: 20, marginBottom: 30}}>
                                        <Dropdown
                                        style={{height: 55, borderColor: 'grey', borderRadius: 8, paddingHorizontal: 15}}
                                        placeholderStyle={{fontSize: 16}}
                                        selectedTextStyle={{fontSize: 16}}
                                        inputSearchStyle={{height: 40, fontSize: 16}}
                                        iconStyle={{width: 20, height: 20}}
                                        data={countryData}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? "Country" : "..."}
                                        searchPlaceholder="Search..."
                                        value={country}
                                        onFocus={() => setIsFocuse(true)}
                                        onBlur={() => setIsFocuse(false)}
                                        onChange={item => {
                                            setCountry(item.value);
                                            handleState(item.value);
                                            setCountryName(item.label)
                                            setIsFocuse(false)
                                        }}
                                        />
                                    </Animated.View>

                                    {/* State DropDown */}
                                    <Animated.View entering={FadeInDown.delay(1000).duration(2000).springify().damping(4)} style={{backgroundColor: "#aeafb0", width: "100%", borderRadius: 2, height: 55, borderRadius: 20, marginBottom: 30}}>
                                        <Dropdown
                                        style={{height: 55, borderColor: 'grey', borderRadius: 8, paddingHorizontal: 15}}
                                        placeholderStyle={{fontSize: 16}}
                                        selectedTextStyle={{fontSize: 16}}
                                        inputSearchStyle={{height: 40, fontSize: 16}}
                                        iconStyle={{width: 20, height: 20}}
                                        data={stateData}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? "State" : "..."}
                                        searchPlaceholder="Search..."
                                        value={state}
                                        onFocus={() => setIsFocuse(true)}
                                        onBlur={() => setIsFocuse(false)}
                                        onChange={item => {
                                            setState(item.value);
                                            handleCity(country, item.value)
                                            setStateName(item.label)
                                            setIsFocuse(false)
                                        }}
                                        />
                                    </Animated.View>

                                    {/* City DropDown */}
                                    <Animated.View entering={FadeInDown.delay(1200).duration(2000).springify().damping(4)} style={{backgroundColor: "#aeafb0", width: "100%", borderRadius: 2, height: 55, borderRadius: 20, marginBottom: 30}}>
                                        <Dropdown
                                        style={{height: 55, borderColor: 'grey', borderRadius: 8, paddingHorizontal: 15}}
                                        placeholderStyle={{fontSize: 16}}
                                        selectedTextStyle={{fontSize: 16}}
                                        inputSearchStyle={{height: 40, fontSize: 16}}
                                        iconStyle={{width: 20, height: 20}}
                                        data={cityData}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? "City" : "..."}
                                        searchPlaceholder="Search..."
                                        value={city}
                                        onFocus={() => setIsFocuse(true)}
                                        onBlur={() => setIsFocuse(false)}
                                        onChange={item => {
                                            setCity(item.value);
                                            setCityName(item.label)
                                            setIsFocuse(false)
                                        }}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(1400).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label='Postal Code'
                                        value={zipCode}
                                        onChangeText={(text) => setZipCode(text)}
                                        right={<TextInput.Icon icon="zip-box" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(1600).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label={accountType=="Expert" ? "Staff I'D" :'Card No.'}
                                        value={card}
                                        onChangeText={(text) => setCard(text)}
                                        right={<TextInput.Icon icon="card" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View>

                                    <Animated.View entering={FadeInDown.delay(1800).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
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

                                    <Animated.View entering={FadeInDown.delay(2000).duration(2000).springify().damping(4)} style={{width: "100%", borderRadius: 2, height: 50, borderRadius: 20, marginBottom: 30}}>
                                        <TextInput
                                        label='Phone'
                                        value={phone}
                                        keyboardType="phone-pad"
                                        onChangeText={(text) => setPhone(text)}
                                        right={<TextInput.Icon icon="phone" disabled/>}
                                        style={{backgroundColor: "#aeafb0",borderRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}
                                        />
                                    </Animated.View> 

                                    <View style={{width: "100%"}}>
                                        <TouchableOpacity style={{width: '100%'}} onPress={CreateAClient}>
                                            <Animated.View entering={FadeInDown.delay(2400).duration(2000).springify().damping(6)} style={{flexDirection: 'row',marginBottom: Platform.OS=='ios' ? 15 : 10, 
                                                borderRadius: 20, paddingVertical: 10, width: '100%',backgroundColor: accountType == "Expert" ? "#F2BED1" : "#CDFADB",
                                                alignItems: 'center', paddingLeft: Platform.OS=='ios' ? 120 : 100,
                                                }}>
                                                <ActivityIndicator
                                                animating={loadAnimation}
                                                size={25
                                                }
                                                />
                                                <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>SignUp</Text>
                                            </Animated.View>
                                        </TouchableOpacity>

                                        <Animated.View entering={FadeInDown.delay(2600).duration(8000).springify().damping(6)} style={{width: '100%',flexDirection: 'row', alignItems: 'center', paddingHorizontal: '13%', paddingBottom: 40}}>
                                            <Text style={{fontSize: 18}}>Already have an account? </Text>
                                            <TouchableOpacity onPress={() => {
                                                navigation.dispatch(
                                                    StackActions.replace('Login')
                                                )
                                                }}>
                                                <Text style={{fontSize: 18, color:'red'}}>Login.</Text>
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