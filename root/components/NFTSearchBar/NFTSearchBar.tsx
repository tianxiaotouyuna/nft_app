import styles from './styles';
import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, TextInput } from 'react-native'
import { pxToDp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { UIELEMENTS } from '@/constants/';
import { Navigate } from '@/utils/index';
export enum SearchStyle {
  HOME1_STYLE = 1, //首页占位
  HOME2_STYLE = 2, //热门合集
}
type ExGoodsCardProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void;
  searchStyle?: SearchStyle
}

const NFTSearchBar: FunctionComponent<ExGoodsCardProps> = (props) => {

  const { style, children, onPress, searchStyle } = props;
  const gotoSearch = () => {

  }
  const placeholderSearchBar = () => {
    return (
      <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
        rippleContainerBorderRadius={200}
        onPress={() => Navigate.navigate('Search')}
        style={[styles.container, style]}>
        <Image source={require("@/resources/Search.png")} ></Image>
        <Text style={styles.text}  >搜索</Text>
      </Ripple>
    )
  }
  const searchBar = () => {
    return (
      <View style={[styles.container2, style]}>
        <Pressable 
        onPress={() => Navigate.goBack()}>
        <Text style={styles.text_cancle}>取消</Text>
        </Pressable>
        <View style={[styles.leftBg]}>
          <Image source={require("@/resources/Search.png")} ></Image>
          <TextInput style={styles.textInput2} placeholderTextColor='#AAAAAA' placeholder='搜索' autoFocus={true}></TextInput>
        </View>
      </View>
    )
  }
  return (
    searchStyle==SearchStyle.HOME1_STYLE ? placeholderSearchBar() : searchBar()

  )
}
export default NFTSearchBar
