import { getFocusedRouteNameFromRoute, NavigationContainerRef, StackActions, TabActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { CacheKeys } from "../constants";
import { Route, Storage }  from "../utils";

export const navigationRef = React.createRef<NavigationContainerRef & StackNavigationProp<any>>();

export const navigate = async (name: string, params?: any) => {
    // const { openid } = await Storage.load(CacheKeys.USERINFO);
    // if (Route.authRoutes.includes(name) && !openid) {
    //     navigationRef.current?.navigate(Route.SCREEN.Wallet, {
    //         routeName: name,
    //         params: params,
    //     })
    // } else {
    //     navigationRef.current?.navigate(name, params);
    // }
    navigationRef.current?.navigate(name, params);
}

export const goBack = () => {
    navigationRef.current?.goBack();
}

export const pop = (count: number) => {
    navigationRef.current?.pop(count);
}

export const selectTab = () => {
    navigationRef.current?.dispatch(TabActions.jumpTo('HomeRoute'))
}
