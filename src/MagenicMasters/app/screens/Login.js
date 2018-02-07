import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

export default class Login extends Component {
    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.topSpacer} />
                <Text>User Name:</Text>
                <TextInput />
                <Text>Password:</Text>
                <TextInput />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Login"
                    onPress={() => {
                        Alert.alert("Login", "We are logged in");
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#BBDEFB"
    },
    topSpacer: {
        flex: 0.3
    },
    buttonSpacer: {
        flex: 0.2
    }
});
