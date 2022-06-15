import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import Bottom from "@/pageranges/markdetail/buy/bottom/bottom";
import { Navigate, Storage } from "@/utils/index";
import PopBtn from "../LoginOutBtn/PopBtn";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp } from "@/utils/system";
import PwdInput from "../PwdInput/PwdInput";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { CacheKeys } from "@/constants/index";
import { gd } from "@/pages/Asset/WalletTest/pglobal";
import storage from '@/pages/Asset/WalletTest/pstorage';
import { ethers } from "ethers";
import { OpenSeaService } from "@/services/index";
export enum CardStyle {
  LOGINOUT_STYLE = 1, //退出登录
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  sure_press?: () => void;
  cancle_press?: () => void;
  data?: any
};

const WalletInput: FunctionComponent<PopProps> = (props) => {
  const { style, cardStyle, sure_press, cancle_press, data } = props;
  const connector = useWalletConnect(); // valid
  const [wallet, setwallet] = useState();
  const [pwd, setpwd] = useState('');
  const [txGoOn, settxGoOn] = useState(false);
  useEffect(() => {
    get_storageInfo();
  }, [])

  const get_storageInfo = async () => {
    let info = await Storage.load(CacheKeys.WALLETINFO);
    setwallet(info)
  }

  const buy = async () => {
    const param = {
      "data": data?.creatorAddress,
      "from": wallet?.accounts[0],//20字节，发送方地址
      "gas": "0x76c0",
      "gasPrice": "0x9184e72a000",
      "to": data?.creatorAddress,//20字节，接收方地址，当为空时，为创建合约交易；
      // "value": "0x9184e72a"
      "value": "0x99184e7"
    }
    console.log('signPersonalMessage==========' + JSON.stringify({
      "data": data?.creatorAddress,
      "from": '0x306Ed1Fc004A69298D730F876F178A679fAdC084',//20字节，发送方地址
      "gas": "0x76c0",
      "gasPrice": "0x9184e72a000",
      "to": data?.creatorAddress,//20字节，接收方地址，当为空时，为创建合约交易；
      "value": "0x9184e72a"
    }))
    // 付款
    // 1:第三方钱包
    // dispatch(walletActions.buy(connector, param));
    //2:自己钱包


    //合约交互
    //1:opensea 合约购买
    //2:自己合约
    //  const res=await OpenSeaService.createBuyOrder({path:'',params:{
    //     asset: {
    //       tokenId: data?.tokenId,
    //       tokenAddress: data?.creatorAddress,
    //       name: data?.assetName,
    //       schemaName: data?.schemaName
    //   },
    //   accountAddress: '0x658004c7E5Ef8EfC4E22A5F19359f8BB27AFfce7',
    //   startAmount: 1,
    //   }})
    // Alert.alert(JSON.stringify(res))

    //自己钱包购买

    //  activeWallet.sendTransaction({
    //             to: targetAddress,
    //             value: amountWei,
    //             gasPrice: activeWallet.provider.getGasPrice(),
    //             gasLimit: 21000,
    //         }).then(function(tx) {
    //         });
    payMoney(data?.creatorAddress, data?.sellOrders?.current_price)


  }

  const payMoney = async (toAdress: string, amount: string) => {
    // if(pwd.length==0){Alert.alert('请输入密码');return}


    
    const walAddr = await Storage.load(CacheKeys.OURWALLETINFO);
    const prov = gd.public_provider;
    let mod_wallet = await storage.wallet(walAddr);
    let wallet = await ethers.Wallet.fromEncryptedJson(mod_wallet.keyStore, pwd);

    let connect_wallet = wallet.connect(prov);
    // const value= ethers.utils.formatUnits(amount)
    const value= '0x419fed3e'
    const params = {
      to: '0x241467c5b26a3DB48945B57931FE7B0e4F8B6bF5',
      // to: toAdress,
      value: ethers.utils.parseEther('0.001'),
      // value:value,
      // value:ethers.utils.tonu,
      gasPrice: connect_wallet.provider.getGasPrice(),
      gasLimit: 21000,
    }
    console.log("tx---------------------params:" + JSON.stringify(params));

    connect_wallet.signMessage('授权').then( (tx) =>{
      console.log("tx_scuess:" + JSON.stringify(tx));
      Alert.alert(JSON.stringify(tx))
      connect_wallet.sendTransaction(params).then( (tx) =>{
        console.log("tx_scuess:" + JSON.stringify(tx));
        Alert.alert(JSON.stringify(tx))
        heyueExchange(walAddr)
      }).catch((error)=>{
        Alert.alert('tx_error'+JSON.stringify(error))
        console.log("tx_error:" + JSON.stringify(error));
      });
    }).catch((error)=>{
      Alert.alert('tx_error'+JSON.stringify(error))
      console.log("tx_error:" + JSON.stringify(error));
    });

    console.log("connect_wallet:" + JSON.stringify(connect_wallet));
  }

  const heyueExchange=(walAddr:string)=>{
    const params={
      asset:{
        // tokenId:data?.tokenId,
        // tokenAddress:data?.tokenAddress,
        // schemaName:data?.schemaName,
        tokenId:'0',
        tokenAddress:'0x381748c76f2b8871afbbe4578781cd24df34ae0d',
        schemaName:'OpenSea Creature Sale',
      },
      accountAddress:walAddr,
      // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
      startAmount: 1.2
    }
    console.log("createBuyOrder---------------------params:" + JSON.stringify(params));
    OpenSeaService.createBuyOrder({path:{},params:params}).then((res)=>{
      Alert.alert(JSON.stringify(res))
    }).catch((error)=>{
      Alert.alert(JSON.stringify(error))
    })
  }
  const closeInput=()=>{
    if(txGoOn==true)return
    cancle_press()
  }
  const txGo=()=>{
    settxGoOn(true)
    buy()
    setTimeout(() => {
      settxGoOn(false)
    }, 3000);
  }
  const renderLoginOut = () => {
    return (

      <View style={[styles.modalContent, style]}>
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>

          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>钱包密码</Text>
          <Pressable onPress={closeInput}>

            <Image
              style={styles.image}
              source={require("@/resources/closure.png")}
            />
          </Pressable>
        </View>

        <PwdInput onChangePWdText={(text:string)=>{setpwd(text)}} style={{ width: pxToDp(606), height: pxToDp(84), marginTop: pxToDp(44), borderRadius: pxToDp(16), borderWidth: pxToDp(2), borderColor: '#E8E8E8' }}></PwdInput>
        <Text style={{ fontSize: pxToSp(24), color: '#3352DB', alignSelf: "flex-end", marginTop: pxToDp(12) }}>忘记密码</Text>

        <View style={{ justifyContent: "center", alignItems: "center", width: '100%', marginTop: pxToDp(40) }}>
          <NtfButton loadingUse={true} text="确定" width={pxToDp(492)} heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={txGo} >
            {" "}
          </NtfButton>
        </View>

      </View>
    )
  }
  return (
    renderLoginOut()
  );
};

export default WalletInput;
