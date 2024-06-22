import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../Screens/TabScreens/HomeScreen";
import { Entypo } from '@expo/vector-icons';
import { Platform, View } from "react-native";
import { Chat } from "../Screens/TabScreens/Chat";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { Profile } from "../Screens/TabScreens/Profile";
import { Pharmacy } from "../Screens/TabScreens/Pharmacy";


export function TabNavigation(){
    const [color, setColor] = useState("")
    const Tab = createBottomTabNavigator()


    function Home(){
        return (
            <View>
                <Entypo name="home" size={35} color="#AD88C6" />
            </View>
        )
    };
    function Chat_(){
        return (
            <View>
                <Ionicons name="chatbubbles" size={35} color="#AD88C6" />
            </View>
        )
    };
    function Store(){
        return (
            <View>
                <MaterialIcons name="local-pharmacy" size={35} color="#AD88C6" />
            </View>
        )
    };
    function Profile_(){
        return (
            <View>
                <FontAwesome5 name="user-alt" size={35} color="#AD88C6" />
            </View>
        )
    };
    function changeActiveColor(){
        setColor("#E1AFD1")
    };
    function changeInactiveColor(){
        setColor("#AD88C6")
    }
    return(
       <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false,
       tabBarLabelStyle: {fontSize: 16, fontWeight: "bold", marginBottom: Platform.OS=="ios" ? -20 : 10, 
       marginTop: Platform.OS=="ios" ? -10  : 0, color: "#E1AFD1"},
       tabBarStyle: {borderRadius: 30, marginBottom: 25, position: "absolute", borderWidth: 2},
       tabBarActiveTintColor: "green", tabBarInactiveTintColor: "red"
       }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: Home}}/>
        <Tab.Screen name="Pharmacy" component={Pharmacy} options={{tabBarIcon: Store}}/>
        <Tab.Screen name="Chat" component={Chat} options={{tabBarIcon: Chat_}}/>
        <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: Profile_}}/>
       </Tab.Navigator>
    )
}