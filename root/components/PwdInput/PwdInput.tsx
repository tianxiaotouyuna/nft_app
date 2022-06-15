import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, TextInput } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { ImageSource } from "react-native-vector-icons/Icon";
import { pxToDp } from "@/utils/system";
type butonProps = {
  style?: StyleProp<ViewStyle>;
  width?: number;
  heigh?: number;
  onsecretIconTap?: () => void;
  onChangePWdText?: (text: string) => void;
  children?: ReactNode;
  text?: string;
  textColor?: string;
  font?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
};

const PwdInput: FunctionComponent<butonProps> = (props) => {
  const [value, setvalue] = useState();
  const [isSecret, setisSecret] = useState(true);
  const { width, heigh, onsecretIconTap, font, style, text, textColor = UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, borderRadius = 1000, borderColor = UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, backgroundColor = 'white', onChangePWdText } =
    props;
  const onChangeText = (text: string) => {
    onChangePWdText(text)
  }
  function onsecretIcon() {
    setisSecret(!isSecret);
  }
  return (
    <View style={[styles.base, style]}>
      <TextInput
        style={{ height: 40 ,width:'80%'}}
        onChangeText={text => onChangeText(text)}
        value={value}
        placeholderTextColor='#AAAAAA'
        placeholder='输入密码'
        secureTextEntry={isSecret}
      >

      </TextInput>
      <Pressable onPress={onsecretIcon}>
        <Image
          style={styles.image}
          source={isSecret ? require("@/resources/m_hide.png") : require("@/resources/m_hide_s.png")}
        />
      </Pressable>
    </View>
  );
};

export default PwdInput;
