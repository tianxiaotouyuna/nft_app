import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  Image,
} from "react-native";
import styles from "./styles";
import Bottom from "@/pageranges/markdetail/buy/bottom/bottom";
import { Navigate, Storage } from "@/utils/index";
import PopBtn from "../LoginOutBtn/PopBtn";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp } from "@/utils/system";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
export enum WalletPopStyle {
  MNEMONICPOP = 1, //助记词提示
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  popStyle?: WalletPopStyle;
  sure_press?: () => void;
  cancle_press?: () => void;
};

const WalletPop: FunctionComponent<PopProps> = (props) => {
  const { style, popStyle, sure_press, cancle_press } = props;

  const [wallet, setwallet] = useState();

  useEffect(() => {
    get_storageInfo();
  }, [])

  const get_storageInfo = async () => {
    let info = await Storage.load(CacheKeys.WALLETINFO);
    setwallet(info)
  }



  const renderTipsMnemonic = () => {
    return (

      <View style={[styles.modalContent, style]}>

        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", width: '100%',marginTop:pxToDp(20) }}>
              <Image
                style={styles.arrow}
                source={require("@/resources/hint.png")}
              />
              <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginTop: pxToDp(12), alignSelf: "center" }}>温馨提示</Text>
          </View>
        </View>
        <Text style={{ fontSize: pxToDp(28), color: '#333333', marginTop: pxToDp(50), marginBottom: pxToDp(60) }}>
        創建的身份將作為您的帳戶，務必保存助記詞
        </Text>
        <NtfButton width={'100%'} heigh={pxToDp(100)} text="下一步" backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} textColor={'white'} style={{ marginHorizontal: pxToDp(100), }} 
        onPress={sure_press}></NtfButton>

      </View>
    )
  }
  return (
    renderTipsMnemonic()
  );
};

export default WalletPop;
