import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../utils";
import React, { FunctionComponent } from 'react'
import Home from "@/pages/Home/Home";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ScreenStack = createStackNavigator();

const HomeRoute: FunctionComponent = () => {
    return (
        <ScreenStack.Navigator>
            <ScreenStack.Screen name={' '} initialParams={{'tabarHeight':useBottomTabBarHeight}} component={Home} options={{
            headerShown:true
            }}/>
        </ScreenStack.Navigator>
    )
}

export default HomeRoute