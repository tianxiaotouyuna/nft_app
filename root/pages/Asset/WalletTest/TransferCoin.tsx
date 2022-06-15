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
import { gd } from "./pglobal";
const TransferCoin: FunctionComponent = () => {
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
  const [zhuji, setzhuji] = useState('');
  const [toAdress, settoAdress] = useState('');
  const [amount, setamount] = useState('');
  const [pwd, setpwd] = useState('');
  const nav = useNavigation()
  const navigation = useNavigation();

  nav.setOptions(
    {
      title: "转账",
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
            <TextInput placeholder="输入转账地址：" onChangeText={text => settoAdress(text)}
              value={toAdress}></TextInput>
          </View>

          <View style={{ backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR, width: '80%', height: pxToDp(88), borderRadius: 100, paddingHorizontal: 20, marginTop: pxToDp(80) }}>
            <TextInput placeholder="输入转账金额：" onChangeText={text => setamount(text)}
              value={amount}></TextInput>
          </View>
          <NtfButton text="确定" width={'80%'} heigh={pxToDp(88)} style={{ marginTop: pxToDp(80) }} onPress={()=>setshowPop(true)}></NtfButton>
        </View>
      )
    }
  };

  const sendCoin=async ()=>{

    if(toAdress.length==0||amount.length==0){
      Alert.alert('请输入转账地址或金额')
      return
    }
    if(pwd.length==0){
      Alert.alert('请输入密码')
      return
    }
    const walAddr = await Storage.load(CacheKeys.OURWALLETINFO);
    const prov = gd.public_provider;
    let mod_wallet = await storage.wallet(walAddr); 
      let wallet = await ethers.Wallet.fromEncryptedJson(mod_wallet.keyStore, pwd);
    
    let connect_wallet =  wallet.connect(prov);
   
   if(walAddr == null || walAddr.length <35 )
   {//eth

       let nonce =await prov.getTransactionCount(walAddr);
       console.log("nonce:"+nonce);
      //  Alert.alert('nonce==='+JSON.stringify(nonce));

         var transaction = {
             nonce: nonce,
             to: toAdress,
             value: ethers.utils.parseEther(amount),
             //data: "0x",
             //chainId: Vue.prototype.eth_provider.chainId
         };

         var signedTransaction = connect_wallet.signTransaction(transaction);
         let tx = await prov.sendTransaction(signedTransaction);

         await tx.wait();

         console.log("tx:"+JSON.stringify(tx));
   }

   else{
     let token = new ethers.Contract(walAddr, gd.daiAbi, connect_wallet);
        //  Alert.alert('asd==='+JSON.stringify(token));
         if (token !=null) {
         Alert.alert('转账成功')
         let tx = await token.transfer(toAdress, ethers.utils.parseEther(amount))
         await tx.wait()
     }
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
            <TextInput placeholder="输入包密码：" onChangeText={text => setpwd(text)}
              value={pwd}></TextInput>
          </View>

          <NtfButton text="确定" width={'80%'} heigh={pxToDp(88)} onPress={sendCoin}></NtfButton>
        </View>

      </Modal>
    </View>
  );
};

export default TransferCoin;
