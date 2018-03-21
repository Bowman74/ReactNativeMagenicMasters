import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert, Platform, Dimensions } from "react-native";
import { RNCamera } from "react-native-camera";

import PushNotification from "react-native-push-notification";
import Swiper from 'react-native-swiper';

import TakePicture from './TakePicture';

export default class ImageSelector extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Settings",
        headerTintColor: "#FFFFFF",
        headerStyle: styles.headerStyle,
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Tos");
                }}
            >
                <Text style={styles.headerButtonStyle}>Terms</Text>
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
    }

    render() {
        const { params } = this.props.navigation.state;
        const { navigation } = this.props;
        return (
            <Swiper style={styles.pickerWindow} showsButtons={true}>
            <View style={{flex: 1}}>
              <TakePicture style={{flex: 1}} updateUri={params.updateUri.bind(this)} navigation={navigation} />
            </View>
            <View style={{flex: 1}}>
              <Text style={{flex: 1}}>Some other way to get a picture.</Text>
            </View>
          </Swiper>
        );
    }
}

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20
    },
    headerStyle: {
        backgroundColor: "#2196F3"
    },
    pickerWindow: {
        width: Platform.OS === "android" ? deviceWidth : "auto",
        height: Platform.OS === "android" ? 603 : "auto"
    },
});
