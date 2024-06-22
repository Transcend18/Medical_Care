import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, TouchableWithoutFeedback, View, Platform, Text, Image, Keyboard} from "react-native";
import { StatusBar as sb } from "react-native";
export function Pharmacy(){
    return(
        <KeyboardAvoidingView
        style={{backgroundColor: "white", flex: 1}}
        behavior={Platform.OS=="ios" ? "padding" : 'height'}>
            <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            >
                {/* The Whole page */}
                <View style={{flex: 1, width: "100%"}}>
                    <View style={{flex: 1, width: "100%"}}>
                        <View style={{width: "100%", backgroundColor: "#AD88C6",  paddingTop:Platform.OS=="android" ? sb.currentHeight: "14%",
                        borderEndWidth: 3, borderLeftWidth: 3, borderBottomWidth: 3, paddingBottom: 10, justifyContent: "space-between",
                        flexDirection: "row", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 20}}>
                            <Text style={{color: "#E1AFD1",fontSize: 38, marginTop: 7, fontWeight: "bold", letterSpacing: 3}}>Pharmacy</Text>
                            <Image style={{width: 50, height: 50}} source={require("../../../assets/images/Logo2.png")}/>
                        </View>
                    </View>

                    {/* Body */}
                    <View style={{ flex: 2, width: "100%", paddingHorizontal: 10, paddingTop: 100, marginTop: Platform.OS=="android" ? "-70%" : "-85%"}}>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}