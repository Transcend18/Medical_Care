import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Keyboard, TouchableNativeFeedback, Platform, Image, FlatList, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { View, Text } from "react-native";
import { StatusBar as sb } from "react-native";

export function Chat(){
    const navigator = useNavigation()
    const looping = () => {
        for (let index = 0; index < 10000; index++) {
            return index;
            
        }
    }
    const DisplayChatFormat = [
        {
            id: looping(),
            name: "John Doe",
            Image: require("../../../assets/images/user1.jpg")
        },    
    ]
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS=="ios" ? "padding" : 'height'}
        style={{flex: 1, backgroundColor: "white", width: "100%"}}
        >
            <StatusBar style="light"/>
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>

                {/* Header */}
                <View style={{flex: 1, width: "100%"}}>
                    <View style={{flex: 1, width: "100%"}}>
                        <View style={{width: "100%", backgroundColor: "#AD88C6",  paddingTop:Platform.OS=="android" ? sb.currentHeight : "14%",
                        borderEndWidth: 3, borderLeftWidth: 3, borderBottomWidth: 3, paddingBottom: 10, justifyContent: "space-between",
                        flexDirection: "row", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 20}}>
                            <Text style={{color: "#E1AFD1",fontSize: 38, marginTop: 7, fontWeight: "bold", letterSpacing: 3}}>Chat</Text>
                            <Image style={{width: 50, height: 50}} source={require("../../../assets/images/Logo2.png")}/>
                        </View>
                    </View>

                    {/* Body */}
                    <View style={{ flex: 2, width: "100%", paddingHorizontal: 10, paddingTop: 100, marginTop: Platform.OS=="android" ? "-70%" : "-85%"}}>
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        data={DisplayChatFormat}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => navigator.navigate("message")}>
                                <View style={{width: "100%", flexDirection: "row", marginBottom: 20}}>
                                    <View>
                                        <Image style={{width: 70, height: 70, borderRadius: 50}} source={item.Image}/>
                                    </View>
                                    <View style={{alignSelf: "center"}}>
                                        <Text style={{fontWeight: "bold",fontSize: 20, letterSpacing: 2, marginLeft: 10, marginBottom: 15}}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        />
                        <View style={{marginTop: 40, marginBottom: 10, alignItems: "center"}}>
                            <Text>Meta</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </KeyboardAvoidingView>
    )
}