import React, { FunctionComponent, useState } from "react";
import FastImage from "react-native-fast-image";

import styles from "./header-backbtn";
import { View, StyleProp, ViewStyle, Pressable, Text } from 'react-native'
import { Button } from "react-native-paper";
import { Image } from "react-native-animatable";
type HeaderBackButtonProps = {
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
};

const HeaderBackButton: FunctionComponent<HeaderBackButtonProps> = (props) => {
    const {
        style,
        onPress,
    } = props;
    return (
        <Pressable onPress={onPress}>
                <View style={styles.btnBg}>
					<Image style={styles.image} source={require('@/resources/home/more.png')} />
                </View>
        </Pressable>
    );
};

export default HeaderBackButton;
