import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  Image,
} from "react-native";
import styles from "./pop-btn";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { ImageSource } from "react-native-vector-icons/Icon";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
type RippleProps = Ripple['props'] & {
};

const MnemonicRipple: FunctionComponent<RippleProps> = (props) => {
const [isSelect, setisSelect] = useState(false);
  const renderLoginOut = () => {
const click=()=>{

  props?.onPress()
  setisSelect(true)
}
    return (
      <Ripple disabled={isSelect} onPress={()=>click()} style={[props?.style,isSelect==true?{backgroundColor:'#EBEBEB'}:{}]} rippleContainerBorderRadius={props?.rippleContainerBorderRadius}>
        {props?.children}
    </Ripple>
    )
  }
  return (
    renderLoginOut()
  );
};

export default MnemonicRipple;
