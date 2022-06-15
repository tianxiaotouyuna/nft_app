import React, { FunctionComponent, useState } from "react";
import FastImage from "react-native-fast-image";
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    ShineOverlay,
} from "rn-placeholder";
import styles from "./hotnft-card";
import BaseCard from "../BaseCard/BaseCard";
import { View, StyleProp, ViewStyle, Pressable, Text } from 'react-native'
import { Button } from "react-native-paper";
type HotProps = {
    data: any;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    borderRadius:number
};

const HotNFtCard: FunctionComponent<HotProps> = (props) => {
    const {
        data = [],
        style,
        onPress,
        borderRadius
    } = props;
    return (
        <BaseCard style={[style, styles.base,{borderRadius:borderRadius}]}
        >
            <FastImage
                style={[styles.image,{borderRadius:borderRadius}]}
                resizeMode="cover"
                source={{ uri: data?.head }}
            />
            <Text style={styles.text1}>{data.name}</Text>
            <Text style={styles.text2}>{data.plus}</Text>
            <Text style={styles.text2}>{data.plus}</Text>
            <View style={styles.last}>
            <Text style={styles.text2}>{data.plus}</Text>
            <Button style={styles.button} icon={require('@/resources/home/more.png')}  onPress={()=>{}} mode="text"></Button>
            </View>
        </BaseCard>
    );
};

export default HotNFtCard;
