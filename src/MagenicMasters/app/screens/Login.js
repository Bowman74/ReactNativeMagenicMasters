import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

import { NavigationActions } from "react-navigation";

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    login = () => {
        if (this.state.userName == "" || this.state.password == "") {
            Alert.alert(
                "Validation error",
                "User name and password must be filled in"
            );
            return;
        }
        let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "TabNavigator",
                    params: { userName: this.state.userName }
                })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        const loginMethod = this.login;
        return (
            <View style={styles.mainView}>
                <View style={styles.topSpacer} />
                <Text>User Name:</Text>
                <TextInput
                    value={this.state.userName}
                    onChangeText={userName => this.setState({ userName })}
                />
                <Text>Password:</Text>
                <TextInput
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Login"
                    onPress={() => {
                        loginMethod();
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
