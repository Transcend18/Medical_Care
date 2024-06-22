import React, { useState,  useContext, useCallback, useLayoutEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { StatusBar as sb } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { AppContext } from '../../../AppContext/App-Context';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../Config/FireBase.config.key';

export function MessageScreen() {
    const [messages, setMessages] = useState([]);
    const {user, userDetails, userType} = useContext(AppContext);

    useLayoutEffect(() => {
        const collectionRef = collection(db, 'messages');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unSubscribe = onSnapshot(q, snapshot => {
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: userType.Email,
                    createdAt: doc.data().createdAt,
                    text: doc.data().text,
                    //_user: doc.data().user,
                }))
            )
        });
        return () => unSubscribe();
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const {_id, createdAt, text, _user} = messages[0];
        addDoc(collection(db, 'messages'), {
            _id,
            createdAt,
            text,
            _user,
        });
        }, []);


    return (
        user !== null
        ?
        <KeyboardAvoidingView
        behavior={Platform.OS=="ios" ? "padding" : 'height'}
        style={{flex: 1}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1, backgroundColor: "white", width: "100%", justifyContent: "space-around"}}>
            
            {/*  */}
            <View style={{width: "100%", flexDirection: "row", backgroundColor: "#AD88C6",  
            paddingTop:Platform.OS=="android" ? sb.currentHeight + 10: "13%", paddingBottom: 15,
            borderEndWidth: 3, borderLeftWidth: 3, borderBottomWidth: 3, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 20
            }}>
                <Image style={{width: 60, height: 60, borderRadius: 50}} source={require("../../../../assets/images/user1.jpg")}/>
                <Text style={{alignSelf: "center", fontSize: 22, letterSpacing: 3, fontWeight: "bold", marginLeft: "15%", color: "#E1AFD1"}}>
                jogn Doe
                </Text>
            </View>

            {/* Gifted Chat comes below */}
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: JSON.parse(user).user_uid,
                avatar: require('../../../../assets/images/user1.jpg')
            }}
            />
            {/*  */}
            
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    :
    null
    );
};
