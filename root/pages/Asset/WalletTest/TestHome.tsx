import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert, TextInput } from "react-native";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Navigate, Storage } from "@/utils/index";
import { connected } from "process";
import { MarketService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import storage from './pstorage';

import { ethers, providers } from "ethers";
import { gd } from './pglobal'
import { OURWALLETINFOCHAINNAME } from "@/constants/cache-keys";
const TestHome: FunctionComponent = () => {
  const connector = useWalletConnect(); // valid
  const [balance, setBalance] = useState('');
  const [tips, settips] = useState('请先创建或导入钱包');
  const [assetsSource, setAssetsSource] = useState([]);
  const [pwd, setpwd] = useState('');
  const [currentChain, setcurrentChain] = useState('BNB');
const [showPop, setshowPop] = useState(false);
  const nav = useNavigation()
  nav.setOptions(
    {
      title: "非中心钱包",
      headerTitleAlign: "center",
      headerRight: null
    }
  )
  useFocusEffect(
    React.useCallback(() => {
      get_storageInfo();
      refresh_assets();
    }, []))

  const get_storageInfo = async () => {
    const m_wallet_addr = await Storage.load(CacheKeys.OURWALLETINFO);
    settips(m_wallet_addr ? '当前地址：' + m_wallet_addr : '请先创建或导入钱包')
    const chainName = await Storage.load(CacheKeys.OURWALLETINFOCHAINNAME);
    setcurrentChain(chainName)
  }
  const refresh_assets = async () => {

    await storage.init_default_assets();

    const wallets = await storage.wallets();
    if (wallets == null || wallets.length == 0) {
      setAssetsSource([]);
    }
    const m_wallet_addr = await Storage.load(CacheKeys.OURWALLETINFO);


    let assets = await storage.assets_for_wallet(m_wallet_addr);


    console.log("aaaassets......");

    console.log("const wallets = await storage.wallets()");

    console.log(JSON.stringify(assets))

    var m_w_assets = [];
    for (var i = assets.length - 1; i >= 0; i--) {
      let w_asset = await storage.asset(assets[i]);
      if (w_asset) {
        w_asset.balance = 0.0;
        m_w_assets.push(w_asset);
      }
    }

    setAssetsSource(m_w_assets);

    getBalances(m_wallet_addr, m_w_assets);


  }

  const getBalances = async (wAddress: string, w_assets: any) => {

    try {
      const prov = gd.public_provider;

      let big_balance = await prov.getBalance(wAddress);

      big_balance = ethers.utils.formatEther(big_balance);
      if (big_balance) {
        setBalance(big_balance.toString());
      }
      // Alert.alert('balance_succes:'+JSON.stringify(big_balance))



      for (var i = w_assets.length - 1; i >= 0; i--) {

        let w_asset = w_assets[i];
        //eth self
        if (w_asset.address.length < 20) {
          w_asset.balance = big_balance.toString();
          continue;
        }
        // console.log(w_asset);
        let contract = new ethers.Contract(w_asset.address, gd.daiAbi, prov);
        if (contract != null) {
          // console.log("contract:"+JSON.stringify(contract));
          let asset_big_balance = await contract.balanceOf(wAddress);
          asset_big_balance = ethers.utils.formatEther(asset_big_balance);
          w_asset.balance = asset_big_balance.toString();
        } else {
          w_asset.balance = -1;
        }
      }

    } catch (e) {
      // Alert.alert('balance:error:'+JSON.stringify(e))
      console.log(JSON.stringify(e))
      setBalance(JSON.stringify(e))
    } //get balance

    setAssetsSource(w_assets);
  }

const changeChain=async (name:string,index:number)=>{
    await Storage.save(CacheKeys.OURWALLETINFOCHAINNAME, name);
    setBalance('获取中...')
    setcurrentChain(name)
    if(index==0)
    gd.public_provider=new providers.InfuraProvider(ethers.providers.getNetwork("ropsten"),"11a4f41ed7074cb6bb93a88d3fc421b0")//主链
    else if(index==1)
    gd.public_provider=new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")//BNB
    else if(index==2)
    gd.public_provider=new ethers.providers.JsonRpcProvider("http://192.168.1.104:8545")//local
    else 
    gd.public_provider=new providers.InfuraProvider(ethers.providers.getNetwork("rinkeby"),"11a4f41ed7074cb6bb93a88d3fc421b0")//主链
    refresh_assets()
}
  const renderView = () => {
    if (connector.connected == false) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{flexDirection:'row',justifyContent:"space-between",width:'80%'}}>
          <NtfButton
            width={pxToDp(150)}
            heigh={pxToDp(40)}
            onPress={() => changeChain('主链',0)}
            text={"主链"}
            borderRadius={pxToDp(12)}
          />
          <NtfButton
            width={pxToDp(150)}
            heigh={pxToDp(40)}
            onPress={() => changeChain('BNB链',1)}
            text={"BNB链"}
            borderRadius={pxToDp(12)}
          />
          <NtfButton
            width={pxToDp(150)}
            heigh={pxToDp(40)}
            onPress={() => changeChain('本地链',2)}
            text={"私有链"}
            borderRadius={pxToDp(12)}
          />
          <NtfButton
            width={pxToDp(150)}
            heigh={pxToDp(40)}
            onPress={() => changeChain('本地链',3)}
            text={"RINKEYBY"}
            borderRadius={pxToDp(12)}
          />
          </View>
          <View style={{flexDirection:"row",alignSelf: "flex-start" }}>
          <Text style={{ alignSelf: "flex-start" }}>当前链:</Text>
          <Text style={{ alignSelf: "flex-start" }}>{currentChain}</Text>
          </View>
          <Text style={{ alignSelf: "flex-start" }}>输出框：</Text>
          <View style={{ width: '100%', height: pxToDp(200), backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR }}>
            <Text style={{ margin: 30, fontWeight: 'bold' }}>{tips}</Text>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "flex-start", paddingTop: pxToDp(30) }}>
            <Text>余额：</Text>
            <Text>{balance}</Text>

          </View>

          <NtfButton
            width={pxToDp(590)}
            heigh={pxToDp(100)}
            onPress={() => Navigate.navigate("CreatWallet", {})}
            text={"创建钱包"}
            imageSource={require("@/resources/add.png")}
            borderRadius={pxToDp(12)}
            style={{ marginTop: pxToDp(60) }}
          />

          <NtfButton
            width={pxToDp(590)}
            heigh={pxToDp(100)}
            onPress={() => Navigate.navigate("InsertWallet", {})}
            text={"导入钱包"}
            imageSource={require("@/resources/add.png")}
            borderRadius={pxToDp(12)}
            style={{ marginTop: pxToDp(60) }}
          />

          <NtfButton
            width={pxToDp(590)}
            heigh={pxToDp(100)}
            onPress={() => Navigate.navigate("CoinTypeManage", {})}
            text={"币种管理"}
            imageSource={require("@/resources/add.png")}
            borderRadius={pxToDp(12)}
            style={{ marginTop: pxToDp(60) }}
          />
          <NtfButton
            width={pxToDp(590)}
            heigh={pxToDp(100)}
            onPress={() => Navigate.navigate("TransferCoin", {})}
            text={"转账钱币"}
            imageSource={require("@/resources/add.png")}
            borderRadius={pxToDp(12)}
            style={{ marginTop: pxToDp(60) }}
          />
        </View>
      )
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom }]}>
      {renderView()}

    </View>
  );
};

export default TestHome;
