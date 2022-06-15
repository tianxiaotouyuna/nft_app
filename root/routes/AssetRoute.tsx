import Asset from "@/pages/Asset/Asset";
import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../utils";
import React, { FunctionComponent } from 'react'
import LoginOut from "@/pages/Asset/LoginOut";
import Market from "@/pages/Market/Market";

const ScreenStack = createStackNavigator();

const AssetRoute: FunctionComponent = () => {
    return (
        <ScreenStack.Navigator>
            <ScreenStack.Screen name={' '} component={Asset}/>
        </ScreenStack.Navigator>
    )
}

export default AssetRoute