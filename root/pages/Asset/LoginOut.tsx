import React, { FunctionComponent, useState } from "react";
import { View, Button, Platform, Alert, ImageStore, Pressable } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/asset/loginout";
import { walletActions } from "@/action/walletActions";
import { wallet } from "@/reducers/walletReducer";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import useNavigationOptions from "@/hooks/useNavigationOptions";
const LoginOut: FunctionComponent = () => {

  const dispatch = useDispatch();
  const connector = useWalletConnect(); // valid
  const logout = () => { dispatch(walletActions.disconnect(connector))}
  
  useNavigationOptions(
    {
      headerTitle:'设置'
    }
  )
  return (
    <View style={styles.container}>
      <NtfButton
        width={pxToDp(590)}
        heigh={pxToDp(100)}
        onPress={ logout}
        text={"退出钱包"}
        borderRadius={pxToDp(12)}
        style={{marginBottom:100}}
      />
    </View>
  );
};

export default LoginOut;

