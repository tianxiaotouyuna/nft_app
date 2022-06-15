import Order from "@/pages/Order/Order";
import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../utils";
import React, { FunctionComponent } from 'react'

const ScreenStack = createStackNavigator();

const OrderRoute: FunctionComponent = () => {
    return (
        <ScreenStack.Navigator>
            <ScreenStack.Screen name={' '} component={Order} options={{
            headerShown:true
            }}/>
        </ScreenStack.Navigator>
    )
}

export default OrderRoute