import { useState,createContext,useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [userToken,setUserToken] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [chat_title_name, setChat_title_name] = useState('');
    const [ExpertId, setExpertId] = useState([]);
    const [userType, setUserType] = useState([]);

    const logout = () => {
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('uid');
    }

    const isLoggedIn = async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken');
            let user_ = await AsyncStorage.getItem('user');
            setUserToken(userToken);
            setUser(user_);
            setUserDetails(userDetails); 
        } catch (error) {
            Alert.alert(
                'Error handling',
                'An error has occured! @ context',
                [{
                    text:'Dismiss',
                    onPress:console.error(error)
                }]
            )
        }
    }

    useEffect(() => {
        isLoggedIn();
    },[])

    return (
        <AppContext.Provider value={{user,setUser,userToken,setUserToken,logout, userDetails, setUserDetails,
            chat_title_name, setChat_title_name, ExpertId, setExpertId, userType, setUserType
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,AppProvider }