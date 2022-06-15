import styles from '@/styles/components/homeGridle';
import { pxToDp, windowWidth } from '@/utils/system';
import React, { FunctionComponent } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import Ripple from 'react-native-material-ripple';
import { Card } from 'react-native-paper';
import { UIELEMENTS } from '../constants';
import { Navigate } from '../utils';
export enum CardStyle {
    ExMallCard = 1,//兑换确认页面
    SignInCard = 2,//兑换记录页面
}
type HomeGirdleProps = {
    style?: StyleProp<ViewStyle>
    items: any
    paddingHorizontal: number
    onTap?: () => void
}

const HomeGirdle: FunctionComponent<HomeGirdleProps> = (props) => {

    const { style, onTap, items, paddingHorizontal } = props;
    const itemWidth = (windowWidth - paddingHorizontal * 2) / items.length
    const renderView = () => (
        <View style={[style,{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            {items?.map((item: any, index: number) => (
                renderItem(item,index)
            ))}
        </View>
    )
    const renderItem = (item: any,index: number) => (
    <Ripple rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} onPress={() => { Navigate.navigate('Category', {title:item?.text}) }} style={[styles.ripple, { width: itemWidth, height: itemWidth }]} key={`${index}`}>
            <Image style={{ width: pxToDp(124), height: pxToDp(124) }} source={item?.source} />
            <Text style={styles.text}>{item?.text}</Text>
        </Ripple>

    )
    return (

        renderView()
    )
}
export default HomeGirdle
