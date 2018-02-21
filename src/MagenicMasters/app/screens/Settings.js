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
    Platform
} from "react-native";

export default class Settings extends Component {
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
        this.state = {
            settings: { createDate: new Date(), workOffline: false },
            dateErrorColor: "#FF0000"
        };
    }

    dateChanged = newDate => {
        this.setState({
            settings: {
                ...this.state.settings,
                createDate: newDate
            }
        });
    };

    setDate = async () => {
        try {
            const dateChanged = this.dateChanged;
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.settings.createDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                dateChanged(new Date(year, month, day));
            }
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }
    };

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.rowStyle}>
                    <Text>Create Date:</Text>
                    {Platform.OS === "ios" && (
                        <DatePickerIOS
                            style={{ flex: 1 }}
                            date={this.state.settings.createDate}
                            mode="date"
                            onDateChange={this.dateChanged}
                        />
                    )}
                    {Platform.OS === "android" && (
                        <TouchableNativeFeedback
                            style={{ flex: 1 }}
                            onPress={() => this.setDate()}
                        >
                            <Text style={{ flex: 1, textAlign: "right" }}>
                                {this.state.settings.createDate.toDateString()}
                            </Text>
                        </TouchableNativeFeedback>
                    )}
                </View>
                <View style={styles.rowStyle}>
                    <Text style={{ flex: 1 }}>Work Offline:</Text>
                    <Switch
                        value={this.state.settings.workOffline}
                        onValueChange={newSetting =>
                            this.setState({
                                settings: {
                                    ...this.state.settings,
                                    workOffline: newSetting
                                }
                            })
                        }
                    />
                </View>
                <View style={{ flex: 1 }} />
                {this.state.settings.workOffline && (
                    <View style={{ alignItems: "center", padding: 20 }}>
                        <Text style={{ color: "#FF0000" }}>
                            Working Offline
                        </Text>
                    </View>
                )}
            </View>
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
    headerStyle: {
        backgroundColor: "#2196F3"
    },
    headerButtonStyle: {
        color: "#FFFFFF",
        padding: 20
    }
});
