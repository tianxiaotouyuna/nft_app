import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable } from "react-native";
import styles from "./ntf-button";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { ImageSource } from "react-native-vector-icons/Icon";
import { ActivityIndicator } from "react-native-paper";
import { pxToDp } from "@/utils/system";
import Spinner from "react-native-spinkit";
type butonProps = {
  style?: StyleProp<ViewStyle>;
  width?: number;
  heigh?: number;
  onPress?: () => void;
  children?: ReactNode;
  imageSource?: ImageSource;
  text?: string;
  textColor?: string;
  font?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  loadingUse?: boolean;
  status?: string;
};

const NtfButton: FunctionComponent<butonProps> = (props) => {
  const { width, heigh, onPress, font, style, imageSource, text, textColor = UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, borderRadius = 1000, borderColor = UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, backgroundColor = 'white', loadingUse = false, status = '确定' } =
    props;
  const [isloading, setisloading] = useState(false);
  const isClick = () => {
    setisloading(true)
    onPress()
  }
  return (
    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
      onPress={isClick}
      style={[
        styles.base,
        style,
        { width: width, height: heigh, borderRadius: borderRadius, borderColor: borderColor, backgroundColor: backgroundColor },
      ]}
      rippleContainerBorderRadius={borderRadius}
    >
      {/* <View style={[{ flexDirection: "row",alignItems:"center" },loadingUse&&isloading?{justifyContent:'space-between',width:'100%',marginHorizontal:pxToDp(40)}:{ flexDirection: "row",alignItems:"center" }]}> */}
      <View style={{ flexDirection: "row", alignItems: "center", width: '100%', justifyContent: "center" }}>
        {imageSource ? <Image
          style={styles.btn_icon}
          source={imageSource}
        /> : null}
        {loadingUse && isloading ?
          <Text style={[styles.btn_text, { fontSize: font, color: textColor }]}>交易进行中</Text>
          :
          <Text style={[styles.btn_text, { fontSize: font, color: textColor }]}>{text}</Text>
        }
        {loadingUse && isloading ?
          <Spinner style={styles.spinner} isVisible={true} size={pxToDp(30)} type={'Wave'} color={'white'} />
          : null}
      </View>
    </Ripple>
  );
};

export default NtfButton;
