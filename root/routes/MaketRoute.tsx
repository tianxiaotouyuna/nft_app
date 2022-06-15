import Market from "@/pages/Market/Market";
import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../utils";
import React, { FunctionComponent } from 'react'
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ScreenStack = createStackNavigator();

const MaketRoute: FunctionComponent = () => {
    return (
        <ScreenStack.Navigator>
            <ScreenStack.Screen name={' '} initialParams={{as:1}} component={Market} options={{
            headerShown:true
            }}/>
        </ScreenStack.Navigator>
    )
}

export default MaketRoute