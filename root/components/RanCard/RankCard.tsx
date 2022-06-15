import React, { FunctionComponent, useState } from "react";
import FastImage from "react-native-fast-image";
import { View,  StyleProp, ViewStyle, Pressable, Text } from 'react-native'
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    ShineOverlay,
} from "rn-placeholder";
import { Navigate } from "../../utils";
import BannerCard, { CardStyle } from "../BannerCard/BannerCard";
import styles from "./rank-style";
import AutoScroll from "@homielab/react-native-auto-scroll";
import BaseCard from "../BaseCard/BaseCard";
import { Title } from "react-native-paper";
type RankCardProps = {
    data: any;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
};

const RankCard: FunctionComponent<RankCardProps> = (props) => {
    const {
        data = {},
        onPress,
        style
    } = props;
    return (
        <BaseCard style={[style,styles.base]}
        >
            <FastImage
                style={styles.head}
                resizeMode="cover"
                source={{ uri: data?.head }}
            />
            <View >
                <Text style={styles.text1}>{data.name}</Text>
                <Text style={styles.text2}>{data.plus}</Text>
            </View>
        </BaseCard>
    )
};

export default RankCard;
