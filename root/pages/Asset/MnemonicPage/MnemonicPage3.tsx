import React, { FunctionComponent, useEffect, useState } from "react";
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
import MnemonicGirdle, { MonicGridleStyle } from "@/components/MnemonicGirdle/MnemonicGirdle";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Ripple from "react-native-material-ripple";
var selectMnemonic_ = new Array()
const MnemonicPage3: FunctionComponent = () => {
  const mnemonic: Array<string> = useRoute().params?.mnemonic ?? {};
const [selectMnemonic, setselectMnemonic] = useState([]);
const [needRefr, setneedRefr] = useState(false);
useNavigationOptions(
    {
      headerTitle: '确认备份',
      headerTitleAlign: 'center'
    }
  )
useFocusEffect(
  React.useCallback(() => {
  setselectMnemonic([])
  selectMnemonic_=new Array
}, [])
);
  const addOne = (text: string) => {
    selectMnemonic_.push(text)
    setselectMnemonic(selectMnemonic_)
    setneedRefr(!needRefr)
  }
  const renderStep2 = () => {
    return (
      <View style={{ flex: 1, paddingBottom: pxToDp(200) }}>
        <Text style={[styles.tips_text_beifen, { marginVertical: pxToDp(46) }]}>請按順序點擊助記詞，以確認您正確備份。</Text>
        <View style={{ backgroundColor: '#EBEBEB', borderRadius: pxToDp(16), marginHorizontal: pxToDp(-20), padding: pxToDp(20), marginBottom: pxToDp(40) }}>
          <MnemonicGirdle needRefresh={needRefr} paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={selectMnemonic} monicGridleStyle={MonicGridleStyle.INPUTSTYLE}></MnemonicGirdle>
        </View>
        <MnemonicGirdle paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={mnemonic} monicGridleStyle={MonicGridleStyle.INPUTSTYLE_TIPS} selectHasChange={(text: string) => addOne(text)} ></MnemonicGirdle>
        <Text style={[styles.tips_text_beifen, { marginTop: pxToDp(46) }]}>1.妥善保管助記詞至離網路安全的地方。</Text>
        <Text style={[styles.tips_text_beifen, { marginTop: pxToDp(12) }]}>2.請勿將助記詞在網絡上進行分享。</Text>
      </View>

    )
  }
  const goNext = () => {
    Navigate.navigate('MnemonicPage2', { type: 2 })

  }
  return (
    <View style={styles.container}>

      <ScrollView style={{ paddingBottom: pxToDp(200) + useSafeAreaInsets().bottom }}
        showsVerticalScrollIndicator={false}>
        {renderStep2()}

      </ScrollView>
      <NtfButton
        width={'100%'}
        heigh={pxToDp(100)}
        onPress={() => goNext()}
        text={"已確認備份"}
        borderRadius={pxToDp(12)}
        textColor={'white'}
        backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
        style={{ bottom: pxToDp((40 + useSafeAreaInsets().bottom) * 2), position: "absolute", alignSelf: 'center' }}
      />
    </View>
  );
};

export default MnemonicPage3;

