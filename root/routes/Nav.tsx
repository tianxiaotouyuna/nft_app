import React, { Fragment, FunctionComponent } from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator, Header, HeaderBackButton} from "@react-navigation/stack";
import { Navigate, Route, Storage } from "../utils";
import Screen from "@/routes/Screen";
export const Nav: FunctionComponent = () => {
  const RootStack = createStackNavigator();
  const configNavs = () => {
    return (
      <NavigationContainer ref={Navigate.navigationRef} >
        <RootStack.Navigator>
          <RootStack.Screen
            name="Screen"
            component={Screen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  };

  return configNavs();
};
