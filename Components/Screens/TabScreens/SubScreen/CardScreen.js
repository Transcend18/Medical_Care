import React from 'react';
import MapView from 'react-native-maps';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, RollInLeft, SlideInLeft, ZoomIn, ZoomInLeft, ZoomOut } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function CardScreen({route}) {
    const {name} = route.params;
    const navigator = useNavigation()

    const DocName = name
    console.log(DocName);

  return (
    <View style={styles.container}>
        <StatusBar style='dark'/>
        {/* Map And user Picture */}
        <View style={styles.mapContainer}>
            <View>
                <Animated.View entering={ZoomIn.duration(1000).damping()}>
                    <MapView style={styles.map} 
                        initialRegion={{
                            latitude: 7.77847796,
                            longitude: 5.31456343,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </Animated.View>
                <Animated.View entering={FadeIn.delay(400).duration(2000).damping()} 
                style={{position:"absolute", alignSelf: "center", marginTop: Platform.OS=="ios" ? "40%" : "25%", borderRadius: 100}}>
                    <View style={{backgroundColor: "red", borderRadius: 100}}>
                        <Image 
                        style={{width: 150, height: 150, borderRadius: 100, resizeMode: "contain", borderWidth: 2}} 
                        source={require("../../../../assets/images/user1.jpg")}
                        />
                    </View>
                </Animated.View>
            </View>
        </View>

        {/* This will hold the settings for the whole app */}
        <View style={styles.bodyContainer}>
            {/* This will hold Exper deatils  */}
            <Animated.View entering={FadeInUp.delay(600).duration(2000).damping()} style={{marginTop: '10%', width: "100%", alignItems: "center"}}>
                <Text style={{fontSize: 28, letterSpacing: 2, fontWeight: "600"}}>{name}</Text>
            </Animated.View>
            {/* This will be the button to direct user to Char Scren */}
            <View style={{marginVertical: "10%", width: "100%", alignItems: "center"}}>
                <TouchableOpacity onPress={() => navigator.navigate("message", [{
                    docName_: DocName
                }])}>
                    <Animated.View entering={FadeInDown.delay(400).duration(2000).damping()}style={
                        {backgroundColor: "purple", width: "100%", alignItems: "center", 
                        paddingHorizontal: 110, paddingVertical: 15, borderRadius: 50}}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold"}}>
                            Book Service
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Animated.View entering={FadeInDown.delay(1600).duration(2000).damping()} style={
                        {marginTop: 20,backgroundColor: "purple", width: "100%", alignItems: "center", 
                        paddingHorizontal: 120, paddingVertical: 15, borderRadius: 50}}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold"}}>
                            BookMark
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEDEB"
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    flex: 2,
    width: "100%",
    alignItems: 'center', 
    paddingHorizontal: 10
  }
});
