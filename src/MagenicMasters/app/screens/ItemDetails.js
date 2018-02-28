import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TextInput,
    Switch,
    DatePickerIOS,
    DatePickerAndroid,
    Platform,
    ScrollView,
    Animated,
    Easing,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";

export default class ItemDetails extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Item Details",
        headerTintColor: "#FFFFFF",
        headerStyle: styles.headerStyle
    });

    constructor(props) {
        super(props);
        this.state = {
            fadeOut: new Animated.Value(1),
            leftPostion: new Animated.Value(1000)
        };
    }

    componentDidMount() {
        Animated.sequence(
            [
                Animated.timing(this.state.leftPostion, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.out(Easing.back())
                }).start()
            ],
            [
                Animated.timing(this.state.fadeOut, {
                    toValue: 0,
                    duration: 3000
                }).start()
            ]
        );
    }

    render() {
        const { params } = this.props.navigation.state;
        const { fadeOut } = this.state;
        const { leftPostion } = this.state;
        return (
            <ScrollView style={styles.mainView}>
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
                <Animated.Text
                    style={{
                        fontSize: 96,
                        opacity: fadeOut,
                        left: leftPostion
                    }}
                >
                    {JSON.stringify(params.detailItem)}
                </Animated.Text>
                <Text style={{ fontSize: 96 }}>
                    Big text to cause scrolling
                </Text>
                <TouchableHighlight onPress={() => {}}>
                    <Text>TouchableHighlight</Text>
                </TouchableHighlight>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                    onPress={() => {}}
                >
                    <View style={{ backgroundColor: "red" }}>
                        <Text>TouchableNativeFeedback</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableOpacity onPress={() => {}}>
                    <Text>TouchableOpacity</Text>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View>
                        <Text>TouchableWithoutFeedback</Text>
                    </View>
                </TouchableWithoutFeedback>
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
