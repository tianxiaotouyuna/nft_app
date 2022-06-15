import React, { FunctionComponent, ReactNode, useState } from "react";
import {
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import styles from "./assetBtn-style";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import { walletActions } from "@/action/walletActions";
import { useDispatch } from "react-redux";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Navigate } from "@/utils/index";
import { UIELEMENTS } from "@/constants/index";
type AssetBtnWrapsProps = {
  onPress_1?: () => void;
  onPress_2?: () => void;
  onPress_3?: () => void;
  nextPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
const AssetBtnWraps: FunctionComponent<AssetBtnWrapsProps> = (props) => {
  const { style ,onPress_3,nextPress} = props;
  const dispatch = useDispatch();
  const connector = useWalletConnect(); // valid
  const login = () => {
    dispatch(walletActions.connect(connector));
  };

  return (
    <View style={[styles.container, style]}>
       {/* <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={ login}
        text={"Metamask"}
        imageSource={require("@/resources/位图1.png")}
        borderRadius={pxToDp(12)}
      /> */}
      {/* 
      <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={ login}
        text={"Metamask"}
        imageSource={require("@/resources/位图1.png")}
        borderRadius={pxToDp(12)}
      />

      <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={ login}
        text={"imToken"}
        imageSource={require("@/resources/位图2.png")}
        borderRadius={pxToDp(12)}
      />

      <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={login}
        text={"TokenPocket"}
        imageSource={require("@/resources/位图3.png")}
        borderRadius={pxToDp(12)}
      /> */}

      <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        // onPress={()=>Navigate.navigate("MnemonicPage", {})}
        onPress={onPress_3}
        text={"创建钱包"}
        textColor={'white'}
        backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
        borderRadius={pxToDp(12)}
        style={{ marginTop: pxToDp(60) }}
      />

<NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={()=>Navigate.navigate("CenterWallet", {})}
        text={"导入钱包"}
        textColor={'white'}
        backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
        borderRadius={pxToDp(12)}
        style={{ marginTop: pxToDp(60) }}
      />

      <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={()=>Navigate.navigate("CenterWallet", {})}
        text={"创建中心钱包"}
        imageSource={require("@/resources/add.png")}
        borderRadius={pxToDp(12)}
        style={{ marginTop: pxToDp(60) }}
      />
    </View>
  );
};

export default AssetBtnWraps;
