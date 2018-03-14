import React from "react";
import Enumerable from "linq";
import { AsyncStorage } from "react-native";
import SQLite from "react-native-sqlite-storage";

export default class LaunchService {
    static async getLaunchesAsync() {
        let returnValue = JSON.parse("[]");
        try {
            let response = await fetch("https://launchlibrary.net/1.3/launch/");
            let responseJson = await response.json();
            returnValue = Enumerable.from(responseJson.launches)
                .groupBy("$.lsp.id", "$")
                .select("{agency:$.first().lsp,data:$.toArray()}")
                .toArray();

            await LaunchService.saveToDB(returnValue);
            //await AsyncStorage.setItem(
            //    "launchData",
            //    JSON.stringify(returnValue)
            //);
            return returnValue;
        } catch (error) {
            console.error(error);
        }
        return returnValue;
    }

    static async getCachedLaunchesAsync() {
        let returnValue = "[]";
        try {
            let storageValue = await AsyncStorage.getItem("launchData");
            if (storageValue != null) {
                returnValue = storageValue;
                console.log(JSON.stringify(returnValue));
            }
            return JSON.parse(returnValue);
        } catch (error) {
            console.error(error);
        }
        return returnValue;
    }

    static getDatabaseConnection() {
        return new Promise((resolve, reject) => {
            var db = SQLite.openDatabase(
                "launch.db",
                "1.0",
                "launch",
                200000,
                result => {},
                error => {
                    reject(error);
                }
            );
            db.executeSql(
                "create table if not exists Agency (id INT, Name CHAR(50), abbrev CHAR(50), countryCode CHAR(10), type INT, infoURL CHAR(100), wikiURL CHAR(100))",
                [],
                (results) => {
                    db.executeSql(
                        "create table if not exists Launch (id INT, Name CHAR(50), windowstart CHAR(20), windowend CHAR(20), net CHAR(20))",
                        [],
                        (results) => {
                            resolve(db);
                        }
                    );
                }
            );

        });

    }

    static async saveToDB(launches) {
        let db = await LaunchService.getDatabaseConnection();
        db.executeSql("select count(*) as c from Launch", [], (results) => {
            console.log("count");
            console.log(results.rows.raw());
        });
        db.executeSql("select count(*) as c from Agency", [], (results) => {
            console.log("count");
            console.log(results.rows.raw());
        });
        db.executeSql("delete from Agency", [], (results) => {
            db.executeSql("delete from Launch", [], (results) => {
                launches.forEach(launchInfo => {
                    let agency = launchInfo.agency;
                    db.executeSql(
                        "insert into Agency (id, Name, abbrev, countryCode, type, infoURL, wikiURL) VALUES (" +
                            agency.id +
                            ', "' +
                            agency.Name +
                            '", "' +
                            agency.abbrev +
                            '", "' +
                            agency.countryCode +
                            '", "' +
                            agency.type +
                            '", "' +
                            agency.infoURL +
                            '", "' +
                            agency.wikiURL +
                            '")',
                        [],
                        (results) => {
                            launchInfo.data.forEach(launch => {
                                db.executeSql(
                                    "insert into Launch (id, Name, windowstart, windowend, net) VALUES (" +
                                        launch.id +
                                        ', "' +
                                        launch.Name +
                                        '", "' +
                                        launch.windowstart +
                                        '", "' +
                                        launch.windowend +
                                        '", "' +
                                        launch.net +
                                        '")',
                                    [],
                                    (results) => {}
                                );
                            });
                        }
                    );
    
                });
            });
        });
    }

    static pullFromDB(db) {}
}
