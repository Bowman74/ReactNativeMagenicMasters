/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Login from "./app/screens/Login";
import TabNavigator from "./app/screens/TabNavigator";
import Tos from "./app/screens/Tos";

import { StackNavigator } from "react-navigation";

const NavigationRoutes = {
    Login: { screen: Login },
    TabNavigator: { screen: TabNavigator }
};

export const RootStack = StackNavigator(NavigationRoutes);

const ModalStack = StackNavigator(
    {
        RootStack: { screen: RootStack },
        Tos: { screen: Tos }
    },
    {
        mode: "modal",
        navigationOptions: {
            header: null
        }
    }
);

export default class App extends React.Component {
    render() {
        return <ModalStack />;
    }
}
