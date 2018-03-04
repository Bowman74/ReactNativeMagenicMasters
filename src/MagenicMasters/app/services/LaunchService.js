import React from "react";
import Enumerable from "linq";

export default class LaunchService {
    static async getLaunchesAsync() {
        try {
            let response = await fetch("https://launchlibrary.net/1.3/launch/");
            let responseJson = await response.json();
            var returnValue = Enumerable.from(responseJson.launches)
                .groupBy("$.lsp.id", "$")
                .select("{agency:$.first().lsp,data:$.toArray()}")
                .toArray();
            return returnValue;
        } catch (error) {
            console.error(error);
        }
    }
}
