
import { assign } from 'lodash'
import React, { useEffect } from 'react'
import { View, Text, StatusBarProps, StatusBar, Alert } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import useNavigationListener from './useNavigationListener'
import { StackNavigationOptions } from '@react-navigation/stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import useNavigationOptions from './useNavigationOptions'
import useStatusBar from './useStatusBar'
import { UIELEMENTS } from '../constants'
import { Source } from 'react-native-fast-image'
import { ImageSource } from 'react-native-vector-icons/Icon'

type Options = {
    navigationBarColor?: String
    headerTintColor?: String
    headerTitleAlign?:String
    headerBackImageSource?:ImageSource

    statusBar?: StatusBarProps
    navigationOptions: StackNavigationOptions
}

const useInitScreen = (options: Options = {}) => {

    const {
        navigationBarColor = "#ffffff",
        headerBackImageSource
    } = options;

    const default_settings={
        headerTintColor : UIELEMENTS.DEFAULT_HEADER_COLOR,
        headerTitleAlign:'center',
    }
    Object.assign(options.navigationOptions, {'headerTitleAlign':options.navigationOptions?.headerTitleAlign||default_settings.headerTitleAlign,'headerTintColor':options.navigationOptions?.headerTintColor||default_settings.headerTintColor})
    const navigationReturns = useNavigationOptions(options.navigationOptions);
    useStatusBar(options.statusBar);
    useNavigationListener({
        onFocus: () => {
            initAndroidNavigation();
        }
    })

    const initAndroidNavigation = () => {
        changeNavigationBarColor(navigationBarColor, true, true);
    }

    return { ...navigationReturns }

}

export default useInitScreen
