import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";
import { Image } from "react-native";
import LandingPage from "./LandingPage";
import Settings from "./Settings";

export default TabNavigator(
    {
        LandingPage: { screen: LandingPage },
        Settings: { screen: Settings }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === "LandingPage" && focused) {
                    return (
                        <Image
                            tintColor="#2196F3"
                            style={{ padding: 10 }}
                            source={require("../assets/images/Icon-Tips.png")}
                        />
                    );
                } else if (routeName === "LandingPage" && !focused) {
                    return (
                        <Image
                            tintColor="#808080"
                            source={require("../assets/images/Icon-Tips.png")}
                        />
                    );
                } else if (routeName === "Settings" && focused) {
                    return (
                        <Image
                            tintColor="#2196F3"
                            source={require("../assets/images/Icon-Legal.png")}
                        />
                    );
                } else {
                    return (
                        <Image
                            tintColor="#808080"
                            source={require("../assets/images/Icon-Legal.png")}
                        />
                    );
                }
            }
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom",
        animationEnabled: false,
        swipeEnabled: false
    }
);
