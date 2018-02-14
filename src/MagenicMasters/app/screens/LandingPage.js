import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class LandingPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Landing for " + navigation.state.params.loginName
    });

    render() {
        return (
            <View style={styles.mainView}>
                <Text>Landing Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    }
});
