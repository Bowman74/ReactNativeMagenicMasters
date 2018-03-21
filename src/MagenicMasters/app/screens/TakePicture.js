import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { RNCamera } from "react-native-camera";

import PushNotification from "react-native-push-notification";

export default class TakePicture extends Component {
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

        PushNotification.configure({
            onNotification: function(notification) {
                Alert.alert("Notification", "Notification Pressd.");   
            }
        });
    }

    snapPicture = async function() {
        const { params } = this.props.navigation.state;
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            params.updateUri(data.uri)
            PushNotification.localNotification({
                title: "Picture",
                message: "Picture Taken",
                number: 9999
            });
            this.props.navigation.goBack(null);
        }
    };

    render() {
        return (
            <View style={styles.mainView}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={
                        "We need your permission to use your camera phone"
                    }
                />
                <TouchableOpacity
                    onPress={this.snapPicture.bind(this)}
                    style={styles.capture}
                >
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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
    }
});
