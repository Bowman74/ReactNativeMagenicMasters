import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

import { NavigationActions } from "react-navigation";

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { push } = this.props.navigation;
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
                        let resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: "LandingPage",
                                    params: { loginName: "Kevin" }
                                })
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
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
