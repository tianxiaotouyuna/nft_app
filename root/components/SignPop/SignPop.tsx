import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  Image,
} from "react-native";
import styles from "./styles";
import Bottom from "@/pageranges/markdetail/buy/bottom/bottom";
import { Navigate, Storage } from "@/utils/index";
import PopBtn from "../LoginOutBtn/PopBtn";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp } from "@/utils/system";
import { CacheKeys } from "@/constants/";
export enum CardStyle {
  LOGINOUT_STYLE = 1, //退出登录
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  sure_press?: () => void;
  cancle_press?: () => void;
};

const SignPop: FunctionComponent<PopProps> = (props) => {
  const { style, cardStyle, sure_press, cancle_press } = props;

  const [wallet, setwallet] = useState();
  const [wallet_net, setwallet_net] = useState();  
  useEffect(() => {
    get_storageInfo();
}, [])
  
  const get_storageInfo =async ()=>{
   let info = await Storage.load(CacheKeys.OURWALLETINFO);
   const wallet_net = await Storage.load(CacheKeys.OURWALLETINFOCHAINNAME);
   setwallet(info)
   setwallet_net(wallet_net)
   console.log('info=========='+JSON.stringify(info))
  }
  const renderLoginOut=()=>{
    return(

      <View style={[styles.modalContent, style]}>
      <View style={{ flexDirection: "row", width: '100%', alignItems: "center",paddingLeft:-pxToDp(24) }}>
        <Image
          style={styles.arrow}
          source={require("@/resources/return_33.png")}
        />

        <Text style={{ fontSize: pxToSp(32) ,fontWeight:"bold",marginLeft:pxToDp(10)}}>签名</Text>
      </View>
      <View style={{  width: '100%', alignItems: "center" ,paddingVertical:pxToDp(36)}}>
      {/* <Image
        style={styles.image}
        source={require("@/resources/return_33.png")}
      /> */}
      <View style={[styles.image_p]}/>
      <Text style={styles.text}>NFT 市场</Text>
      </View>
      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />
      <View style={{ flexDirection: "row",  justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
        <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>钱包</Text>
        <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>非中心钱包</Text>
      </View>

      <View style={{ flexDirection: "row",  justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
        <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>发送地址</Text>
        <Text style={{ color: '#383838', fontSize: pxToSp(24) ,maxWidth:pxToDp(230)}} numberOfLines={1} ellipsizeMode='middle'>{wallet}</Text>
      </View>

      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />
      <View style={{ flexDirection: "row",  justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
        <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>网络</Text>
        <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>{wallet_net}</Text>
      </View>


      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />
      <View style={{ flexDirection: "row",  justifyContent: "space-between", width: '100%', paddingVertical: pxToDp(20) }}>
        <Text style={{ color: '#707A83', fontSize: pxToSp(28) }}>数据</Text>
        <Text style={{ color: '#383838', fontSize: pxToSp(24) }}>钱包11</Text>
      </View>

      <View style={{justifyContent: "space-between", alignItems: "center" ,width:'100%',marginTop:pxToDp(40)}}>
        <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }}>
          <NtfButton text="拒绝" width={pxToDp(310)} heigh={pxToDp(84)} borderRadius={pxToDp(12)} textColor='#3352DB' borderColor='#3352DB' onPress={cancle_press}>
            {" "}
          </NtfButton>
          <NtfButton text="确定" width={pxToDp(310)} heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={sure_press} >
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

export default SignPop;
