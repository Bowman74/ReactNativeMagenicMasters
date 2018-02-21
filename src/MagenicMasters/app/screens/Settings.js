import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    Switch
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
            settings: { createDate: "", workOffline: false },
            dateErrorColor: "#FF0000"
        };
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.rowStyle}>
                    <Text style={{ flex: 1 }}>Create Date:</Text>
                    <TextInput
                        style={{
                            width: 75,
                            color: this.state.dateErrorColor
                        }}
                        value={this.state.settings.createDate}
                        onChangeText={newDate =>
                            this.setState(
                                {
                                    settings: {
                                        ...this.state.settings,
                                        createDate: newDate
                                    }
                                },
                                function() {
                                    if (this.state.settings.createDate)
                                        var dateValue = Date.parse(
                                            this.state.settings.createDate
                                        );
                                    if (isNaN(dateValue) == true) {
                                        this.setState({
                                            dateErrorColor: "#FF0000"
                                        });
                                    } else {
                                        this.setState({
                                            dateErrorColor: "#000000"
                                        });
                                    }
                                }
                            )
                        }
                    />
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
