import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    FlatList
} from "react-native";

export default class LandingPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Landing",
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
            peopleList: [],
            listRefreshing: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            peopleList: [
                { key: "1", fname: "Drop Dead", lname: "fred" },
                { key: "2", fname: "Alexander", lname: "Palmer" },
                { key: "3", fname: "Dorothy", lname: "Stephens" },
                { key: "4", fname: "Patti", lname: "Gibson" },
                { key: "5", fname: "Kirk", lname: "Duncan" },
                { key: "6", fname: "Fannie", lname: "Jenkins" },
                { key: "7", fname: "Rose", lname: "Strickland" },
                { key: "8", fname: "Iris", lname: "Harrington" },
                { key: "9", fname: "Julie", lname: "Torres" },
                { key: "10", fname: "Clay", lname: "Craig" },
                { key: "11", fname: "Jeanne", lname: "Sims" },
                { key: "12", fname: "Caroline", lname: "Waters" },
                { key: "13", fname: "Earl", lname: "Bush" },
                { key: "14", fname: "Cornelius", lname: "Norman" },
                { key: "15", fname: "Bob", lname: "Gregory" },
                { key: "16", fname: "Doug", lname: "Benson" },
                { key: "17", fname: "Angela", lname: "Lloyd" },
                { key: "18", fname: "Eleanor", lname: "Garner" },
                { key: "19", fname: "Reginald", lname: "Carlson" },
                { key: "20", fname: "Barbara", lname: "Greer" }
            ]
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    render() {
        return (
            <View style={styles.mainView}>
                <FlatList
                    style={styles.listView}
                    data={this.state.peopleList}
                    ItemSeparatorComponent={this.renderSeparator}
                    refreshing={this.state.listRefreshing}
                    onRefresh={async () => {
                        await this.setState({ listRefreshing: true });
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        await this.setState({
                            peopleList: [
                                { key: "16", fname: "Doug", lname: "Benson" },
                                { key: "17", fname: "Angela", lname: "Lloyd" },
                                {
                                    key: "18",
                                    fname: "Eleanor",
                                    lname: "Garner"
                                },
                                {
                                    key: "19",
                                    fname: "Reginald",
                                    lname: "Carlson"
                                },
                                { key: "20", fname: "Barbara", lname: "Greer" }
                            ]
                        });
                        await this.setState({ listRefreshing: false });
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }}
                            >
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
                                    <Text>{item.lname}</Text>
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
                                    <Text>{item.fname}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    listView: {
        flex: 1
    },
    headerStyle: {
        backgroundColor: "#2196F3"
    },
    headerButtonStyle: {
        color: "#FFFFFF",
        padding: 20
    }
});
