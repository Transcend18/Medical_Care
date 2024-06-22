import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SignupScreen } from "../Screens/SignUpScreen";
import { TabNavigation } from "./TabNavigation";
import { CardScreen } from "../Screens/TabScreens/SubScreen/CardScreen";
import { MessageScreen } from "../Screens/TabScreens/SubScreen/messageScreen";



export function StackNavigator(){

    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUp" component={SignupScreen}/>
            <Stack.Screen name="CardScreen" component={CardScreen}/>
            <Stack.Screen name="message" component={MessageScreen}/>
            <Stack.Screen name="TabScreen" component={TabNavigation}/>
           </Stack.Navigator>
        </NavigationContainer>
    )
}