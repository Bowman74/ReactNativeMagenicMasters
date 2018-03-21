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
    ScrollView,
    Button,
    Image
} from "react-native";

import DateControl from "./DateControl";

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
            dateErrorColor: "#FF0000",
            imageUri: ""
        };
    }

    updateSettings(newSettings) {
        this.setState({
            settings: newSettings
        });
    }

    updateImageUri(newImageUri) {
        this.setState({
            imageUri: newImageUri
        });        
    }

    render() {
        const navigation = this.props.screenProps;
        const updateImage = this.updateImageUri;
        return (
            <ScrollView style={styles.mainView}>
                <View style={styles.rowStyle}>
                    <Text>User Name:</Text>
                    <Text style={{ flex: 1, textAlign: "right" }}>
                        {this.props.screenProps.userName}
                    </Text>
                </View>
                <View style={styles.dateRowStyle}>
                    <Text>Create Date:</Text>
                    <DateControl
                        style={{ flex: 1 }}
                        settings={this.state.settings}
                        updateParentSettings={this.updateSettings.bind(this)}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Text>Current Date:</Text>
                    <Text style={{ flex: 1, textAlign: "right" }}>
                        {this.state.settings.createDate.toDateString()}
                    </Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={{ flex: 1 }}>Take Picture:</Text>
                    <Button
                        title="Select Picture"
                        onPress={() => {
                            navigation.navigate("ImageSelector", { updateUri: this.updateImageUri.bind(this) });
                        }}
                    />
                </View>
                <View style={styles.rowStyle}>
                    <Image 
                        style={{height: 150, width: 150}}
                        source={{uri: this.state.imageUri}}
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
    },
    preview: {
        flex: 1,
        height: 500,
        justifyContent: "flex-end",
        alignItems: "center"
    }
});
