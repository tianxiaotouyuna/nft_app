import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { ImageSource } from "react-native-vector-icons/Icon";
import { ActivityIndicator } from "react-native-paper";
import { pxToDp } from "@/utils/system";
import Spinner from "react-native-spinkit";
type butonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (isOpen:boolean) => void;
};

const EyeBtn: FunctionComponent<butonProps> = (props) => {
    const [isOpen, setisOpen] = useState(false);
  const { onPress, style} =
    props;
  const tapEye=()=>{
    setisOpen(!isOpen)
    onPress(isOpen)
  }
  return (
    <Pressable style={{width:pxToDp(88),height:pxToDp(88),alignItems:"flex-end",justifyContent:"center"}} onPress={tapEye}>
      <Image
          style={[styles.image]}
          source={isOpen?require("@/resources/显示icon.png"):require("@/resources/隐藏icon.png")}
          /> 
    </Pressable>
       
  );
};

export default EyeBtn;
