import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert, Clipboard } from "react-native";
import Modal from "react-native-modal";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Image } from "react-native-animatable";
import styles from "./styles";
import AssetBtnWraps from "@/pageranges/AssetBtnWraps/AssetBtnWraps";
import AssetTopBg from "@/components/AssetTopBg/AssetTopBg";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { walletActions } from "@/action/walletActions";
import { useNavigation } from "@react-navigation/native";
import { Navigate, Storage } from "@/utils/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import { TextInput } from "react-native-gesture-handler";
import "react-native-get-random-values"

// Pull in the shims (BEFORE importing ethers)
import "@ethersproject/shims"
import storage from './pstorage';

// Import the ethers library
import { ethers } from "ethers";
const CreatWallet: FunctionComponent = () => {
  const connector = useWalletConnect(); // valid
  const [showLoginout, setshowLoginout] = useState(false);
  const [ntfData, setntfData] = useState([]);
  const [data, setdata] = useState();
  const [privateKey, setprivateKey] = useState('');
  const [mnemonic, setmnemonic] = useState('');
  const [adress, setadress] = useState('');
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(walletActions.disconnect(connector));
    setshowLoginout(false)
  };
  const rightBtnClick = () => { setshowLoginout(true) };
  const [outPut, setoutPut] = useState('');
  const [text1, settext1] = useState('');
  const [text2, settext2] = useState('');
  const nav = useNavigation()
  const navigation = useNavigation();
  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    Alert.alert(value + '复制成功')
    console.log('复制的内容', str)
  }
  nav.setOptions(
    {
      title: "创建钱包",
      headerTitleAlign: "center",
      headerRight: null
    }
  )

  const creatWalletClick = async () => {
    if (text1.length == 0) {
      Alert.alert(JSON.stringify('请先输入密码'))

      return
    }
    console.log('asdasd====')
    const entropy = ethers.utils.randomBytes(16);//生成随机字符串

    const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词

    const e_wallet = ethers.Wallet.fromMnemonic(mnemonicTemp);//根据助记词生成钱包
    console.log('asdasd====' + JSON.stringify(e_wallet))
    Alert.alert(JSON.stringify('钱包创建成功，'))

    let options = {};
    options.scrypt = { N: 64, r: 8, p: 1 };

    let jsonRet = await e_wallet.encrypt(text2, options);
    await storage.new_wallet(e_wallet.address, jsonRet, "", "");

    setoutPut('钱包创建成功，\n 地址：' + e_wallet.address + '\n 私钥：' + e_wallet.privateKey + '\n 助记词' + JSON.stringify(e_wallet.mnemonic?.phrase))
    await Storage.save(CacheKeys.OURWALLETINFO, e_wallet.address);

    setprivateKey(e_wallet.privateKey)
    setmnemonic(e_wallet.mnemonic?.phrase)
    setadress(e_wallet.address)
  }
  const renderView = () => {
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start" }}>输出框：</Text>
          <View style={{ width: '100%', height: pxToDp(200), backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR }}>
            <Text>{outPut}</Text>
          </View>

          <Pressable onPress={() => copyAdress(adress || '还未创建钱包')}>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: 'row', opacity: outPut.length }}>
              <Text>复制地址：</Text>
              <Image
                style={styles.arrow}
                source={require("@/resources/copy.png")}
              />
            </View>
          </Pressable>
          <Pressable onPress={() => copyAdress(privateKey || '还未创建钱包')}>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: 'row', opacity: outPut.length }}>
              <Text>复制密钥：</Text>
              <Image
                style={styles.arrow}
                source={require("@/resources/copy.png")}
              />
            </View>
          </Pressable>

          <Pressable onPress={() => copyAdress(mnemonic || '还未创建钱包')}>
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: 'row', opacity: outPut.length }}>
              <Text>复制助记词：</Text>
              <Image
                style={styles.arrow}
                source={require("@/resources/copy.png")}
              />
            </View>
          </Pressable>

          <View style={{ backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR, width: '80%', height: pxToDp(88), borderRadius: 100, paddingHorizontal: 20, marginTop: pxToDp(80) }}>
            <TextInput placeholder="请确认密码：" onChangeText={text => settext1(text)}
              value={text1}></TextInput>
          </View>
          <View style={{ backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR, width: '80%', height: pxToDp(88), borderRadius: 100, paddingHorizontal: 20, marginTop: pxToDp(80) }}>
            <TextInput placeholder="请确认密码：" onChangeText={text => settext1(text)}
              value={text1}></TextInput>
          </View>
          <NtfButton text="确定" width={'80%'} heigh={pxToDp(88)} style={{ marginTop: pxToDp(80) }} onPress={creatWalletClick}></NtfButton>
        </View>
      )
  };

  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom }]}>
      {renderView()}

    </View>
  );
};

export default CreatWallet;
