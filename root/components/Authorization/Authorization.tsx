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
import { Navigate, Storage } from "@/utils/index";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp } from "@/utils/system";
import { CacheKeys } from "@/constants/index";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch } from "react-redux";
import { walletActions } from "@/action/walletActions";
import { OpenSeaService } from "@/services/index";
import { gd } from "@/pages/Asset/WalletTest/pglobal";
import storage from '@/pages/Asset/WalletTest/pstorage';
import { ethers } from "ethers";
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

const Authorization: FunctionComponent<PopProps> = (props) => {
  const { style, data, sure_press, cancle_press } = props;
  const connector = useWalletConnect(); // valid
  const [wallet, setwallet] = useState();
  const dispatch = useDispatch();


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
        payMoney(data?.creatorAddress,'0x9184e72a')
    
    
  }

  const payMoney=async (toAdress:string,amount:string)=>{
    const walAddr = await Storage.load(CacheKeys.OURWALLETINFO);
    const prov = gd.public_provider;
    let mod_wallet = await storage.wallet(walAddr); 
      let wallet = await ethers.Wallet.fromEncryptedJson(mod_wallet.keyStore, '3881219a');
    
    let connect_wallet =  wallet.connect(prov);
    connect_wallet.sendTransaction({
            to: toAdress,
            value: amount,
            gasPrice: connect_wallet.provider.getGasPrice(),
            gasLimit: 21000,
        }).then(function(tx) {
         console.log("tx:"+JSON.stringify(tx));

        });

      //  let nonce =await prov.getTransactionCount(walAddr);
      //  console.log("nonce:"+nonce);
      // //  Alert.alert('nonce==='+JSON.stringify(nonce));

      //    var transaction = {
      //        nonce: nonce,
      //        to: toAdress,
      //        value: ethers.utils.parseEther(amount),
      //        //data: "0x",
      //        //chainId: Vue.prototype.eth_provider.chainId
      //    };

      //    var signedTransaction = connect_wallet.signTransaction(transaction);
      //    let tx = await prov.sendTransaction(signedTransaction);

      //    await tx.wait();

         console.log("connect_wallet:"+JSON.stringify(connect_wallet));
  }
  const renderLoginOut = () => {
    return (

      <View style={[styles.modalContent, style]}>
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingLeft: -pxToDp(24), justifyContent: "center" }}>
          <Image
            style={styles.arrow}
            source={require("@/resources/return_33.png")}
          />
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>授权</Text>
        </View>
        <View style={{ width: '100%', alignItems: "center", paddingVertical: pxToDp(36) }}>
          {/* <Image
          style={styles.image}
          source={require("@/resources/return_33.png")}
        /> */}
          <View style={[styles.image_p]} />

          <Text style={styles.text}>NFT 市场</Text>
        </View>
        <View
          style={{
            backgroundColor: "#F0F0F0",
            height: pxToDp(2),
            width: "100%",
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>钱包</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>MetaMask</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>发送地址</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24), maxWidth: pxToDp(230) }} numberOfLines={1} ellipsizeMode='middle'>{wallet?.accounts[0]}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>接收地址</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24), maxWidth: pxToDp(230) }} numberOfLines={1} ellipsizeMode='middle'>{data?.creatorAddress}</Text>
        </View>

        <View
          style={{
            backgroundColor: "#F0F0F0",
            height: pxToDp(2),
            width: "100%",
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>网络</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>BSD</Text>
        </View>


        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>Gas</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>钱包11</Text>
        </View>
        <View
          style={{
            backgroundColor: "#F0F0F0",
            height: pxToDp(2),
            width: "100%",
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>授权数量</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>不限制</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
          <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>数据</Text>
          <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>钱包11</Text>
        </View>

        <View style={{ justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: pxToDp(40) }}>
          <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }}>
            <NtfButton text="拒绝" width={pxToDp(310)} heigh={pxToDp(84)} borderRadius={pxToDp(12)} textColor='#3352DB' borderColor='#3352DB' onPress={cancle_press}>
              {" "}
            </NtfButton>
            <NtfButton text="确定" width={pxToDp(310)} heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={buy} loadingUse={true}>
              {" "}
            </NtfButton>
          </View>
        </View>

      </View>
    )
  }
  return (
    renderLoginOut()
  );
};

export default Authorization;

//    //   {
//    //     "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
//    //     "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
//    //     "gas": "0x76c0",
//    //     "gasPrice": "0x9184e72a000",
//    //     "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
//    //     "value": "0x9184e72a"
//    // }
// var va=getDisplayBalance(520000000000000000,18)
// Alert.alert(JSON.stringify(va))

// $opts = [
//   'jsonrpc' => '2.0',
//   'method' => 'eth_sendTransaction', //转账接口
//   'params' => [
// 0=>[
//       'from' =>'0xb60e8dd61c5d32be8058bb8eb970870f07233155',//转账地址
//       'to' => '0xdac17f958d2ee523a2206206994597c13d831ec7',    //usdt 智能合约地址
//       'value'=>'0x', //合约交易, value为0
//       'gas'=>'0x' . dechex( '1000000' ),  // 1000000 可根据自己修改, 少的话,交易失败率高
//       'gasPrice'=>'0x' . dechex( '1000000000' ), //同 gas
//       'data' => '0xa9059cbb000000000000000000000000b60e8dd61c5d32be8058bb8eb970870f0723315500000000000000000000000000000000000000000000000000000000000f4240' 
//       //data参数: '0xa9059cbb'.处理的接收地址 . 处理的交易金额
//       //处理的接收地址: 地址去掉0x , 然后在前补0到64位
//       //处理的交易金额: 交易金额转成16进制,如果带0x 去掉0x,不带0x忽略, 然后在前方补0到64位   
//   ],

// ],
//   'id' => time()
// ];