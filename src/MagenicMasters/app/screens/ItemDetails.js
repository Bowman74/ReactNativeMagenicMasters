import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    Switch,
    DatePickerIOS,
    TouchableNativeFeedback,
    DatePickerAndroid,
    Platform,
    ScrollView
} from "react-native";

export default class ItemDetails extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Item Details",
        headerTintColor: "#FFFFFF",
        headerStyle: styles.headerStyle
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView horizontal style={styles.mainView}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            paddingRight: 10,
                            width: 100
                        }}
                    >
                        Last Name:
                    </Text>
                    <Text>{params.detailItem.lname}</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            paddingRight: 10,
                            width: 100
                        }}
                    >
                        First Name:
                    </Text>
                    <Text>{params.detailItem.fname}</Text>
                </View>
                <Text style={{ fontSize: 96 }}>
                    {JSON.stringify(params.detailItem)}
                </Text>
                <Text style={{ fontSize: 96 }}>
                    Big text to cause scrolling
                </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column"
    },
    rowStyle: {
        flexDirection: "row",
        padding: 10
    },
    dateRowStyle: {
        flexDirection: "row",
        padding: 10,
        height: 200
    },
    headerStyle: {
        backgroundColor: "#2196F3"
    },
    headerButtonStyle: {
        color: "#FFFFFF",
        padding: 20
    }
});
