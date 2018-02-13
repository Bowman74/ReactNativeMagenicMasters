/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Login from "./app/screens/Login";
import LandingPage from "./app/screens/LandingPage";

import { StackNavigator } from "react-navigation";

const RootStack = StackNavigator(
    {
        Login: { screen: Login },
        LandingPage: { screen: LandingPage }
    },
    {
        initialRouteName: "Login"
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}
