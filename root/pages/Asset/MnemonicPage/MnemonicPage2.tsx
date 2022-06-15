import React, { FunctionComponent, useState } from "react";
import { View, Button, Platform, Alert, ImageStore, Pressable } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/asset/chain_wallet/mnemonic";
import { walletActions } from "@/action/walletActions";
import { wallet } from "@/reducers/walletReducer";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import useNavigationOptions from "@/hooks/useNavigationOptions";
import { Image, Text } from "react-native-animatable";
import { UIELEMENTS } from "@/constants/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Navigate } from "@/utils/index";
import MnemonicGirdle from "@/components/MnemonicGirdle/MnemonicGirdle";
import { useRoute } from "@react-navigation/native";
const MnemonicPage2: FunctionComponent = () => {
  const mnemonic: any = useRoute().params?.mnemonic ?? {};

  useNavigationOptions(
    {
      headerTitle: '備份助記詞',
      headerTitleAlign: 'center'
    }
  )
  const renderStep2 = () => {
    return (
      <View>
        <Text style={[styles.tips_text_beifen, { marginVertical: pxToDp(46) }]}>請按順序抄寫助記詞，確保備份正確</Text>
        <MnemonicGirdle paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={3} columnCount={3} data={mnemonic}></MnemonicGirdle>
        <Text style={[styles.tips_text_beifen, { marginTop: pxToDp(46) }]}>1.妥善保管助記詞至離網路安全的地方。</Text>
        <Text style={[styles.tips_text_beifen, { marginTop: pxToDp(12) }]}>2.請勿將助記詞在網絡上進行分享。</Text>
      </View>

    )
  }
  const goNext = () => {
    Navigate.navigate('MnemonicPage3', { mnemonic: mnemonic })

  }
  return (
    <View style={styles.container}>
      {renderStep2()}
      <NtfButton
                width={'100%'}
                heigh={pxToDp(100)}
                onPress={()=>goNext()}
                text={"已確認備份"}
                borderRadius={pxToDp(12)}
                textColor={'white'}
                backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
                style={{ bottom: pxToDp((40 + useSafeAreaInsets().bottom) * 2), position: "absolute", alignSelf: 'center' }}
            />
    </View>
  );
};

export default MnemonicPage2;

