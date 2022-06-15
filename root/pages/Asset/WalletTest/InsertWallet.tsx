import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert } from "react-native";
import Modal from "react-native-modal";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Image } from "react-native-animatable";
import styles from "@/styles/pages/asset/asset";
import AssetBtnWraps from "@/pageranges/AssetBtnWraps/AssetBtnWraps";
import AssetTopBg from "@/components/AssetTopBg/AssetTopBg";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { walletActions } from "@/action/walletActions";
import PopBtn from "@/components/LoginOutBtn/PopBtn";
import { useNavigation } from "@react-navigation/native";
import { Navigate, Storage } from "@/utils/index";
import { connected } from "process";
import { MarketService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import { TextInput } from "react-native-gesture-handler";
import "react-native-get-random-values"

// Pull in the shims (BEFORE importing ethers)
import "@ethersproject/shims"
import storage from './pstorage';

// Import the ethers library
import { ethers } from "ethers";
const InsertWallet: FunctionComponent = () => {
  const connector = useWalletConnect(); // valid
  const [showLoginout, setshowLoginout] = useState(false);
  const [ntfData, setntfData] = useState([]);
  const [data, setdata] = useState();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(walletActions.disconnect(connector));
    setshowLoginout(false)
  };
  const [showPop, setshowPop] = useState(false);
  const rightBtnClick = () => { setshowLoginout(true) };
  const [outPut, setoutPut] = useState('');
  const [text1, settext1] = useState('');
  const [zhuji, setzhuji] = useState('');
  const [text2, settext2] = useState('');
  const nav = useNavigation()
  const navigation = useNavigation();

  nav.setOptions(
    {
      title: "导入钱包",
      headerTitleAlign: "center",
      headerRight: null
    }
  )

  const creatWalletClick = () => {
    console.log('asdasd====')
    setshowPop(true)

  }
  const renderView = () => {
    if (connector.connected == false) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start" }}>输出框：</Text>
          <View style={{ width: '100%', height: pxToDp(200), backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR }}>
            <Text>{outPut}</Text>
          </View>

          <View style={{ backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR, width: '80%', height: pxToDp(88), borderRadius: 100, paddingHorizontal: 20, marginTop: pxToDp(80) }}>
            <TextInput placeholder="请输入密钥：" onChangeText={text => settext1(text)}
              value={text1}></TextInput>
          </View>
          <View style={{ backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR, width: '80%', height: pxToDp(88), borderRadius: 100, paddingHorizontal: 20, marginTop: pxToDp(80) }}>
            <TextInput placeholder="或输入助记词：" onChangeText={text => setzhuji(text)}
              value={zhuji}></TextInput>
          </View>
          <NtfButton text="确定" width={'80%'} heigh={pxToDp(88)} style={{ marginTop: pxToDp(80) }} onPress={creatWalletClick}></NtfButton>
        </View>
      )
    }
  };
  const pwdCreatWallet = async () => {
    let e_wallet: any;
    if (text2.length > 0) {
      if (text1.length) {
        e_wallet = new ethers.Wallet(text1);
      }
      else if (zhuji.length > 0) {

        e_wallet = ethers.Wallet.fromMnemonic(zhuji);


      }
    }
    else {
      Alert.alert(JSON.stringify('请输入密码'))

    }


    if (e_wallet != null) {
      setoutPut('钱包导入成功，\n 地址：' + e_wallet.address + '\n 私钥：' + e_wallet.privateKey)

      Alert.alert(JSON.stringify('钱包导入成功，'))

      let options = {};
      options.scrypt = { N: 64, r: 8, p: 1 };

      let jsonRet = await e_wallet.encrypt(text2, options);
      await storage.new_wallet(e_wallet.address, jsonRet, "", "");
      await Storage.save(CacheKeys.OURWALLETINFO, e_wallet.address);

    }

  }
  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom }]}>
      {renderView()}
      <Modal isVisible={showPop} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <View style={{ backgroundColor: 'white', alignItems: "center", paddingBottom: 20 }}>
          <View style={{ alignSelf: "flex-start", width: '100%', backgroundColor: 'white', flexDirection: 'row', justifyContent: "space-between", padding: 20 }}><Text>输入钱包密码</Text>

            <Pressable style={{ width: 80, height: 44, alignItems: "flex-end" }} onPress={() => (setshowPop(false)

            )}>
              <Text>关闭</Text>
            </Pressable>


          </View>

          <View style={{ backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR, width: '80%', height: pxToDp(88), borderRadius: 100, paddingHorizontal: 20, marginBottom: 20 }}>
            <TextInput placeholder="设置钱包密码：" onChangeText={text => settext2(text)}
              value={text2}></TextInput>
          </View>

          <NtfButton text="确定" width={'80%'} heigh={pxToDp(88)} onPress={pwdCreatWallet}></NtfButton>
        </View>

      </Modal>
    </View>
  );
};

export default InsertWallet;
