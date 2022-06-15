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
import { CacheKeys, UIELEMENTS } from "@/constants/index";
export enum OrderPopStyle {
  CANCEL_OFFER_STYLE = 1, //取消出价
  ACCEPT_OFFER_STYLE = 2, //接受出价
  DOWNPRICE_ORDER_STYLE = 3 ,//挂单降价
  CANCEL_ORDER_STYLE = 4, //挂单下架
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  popStyle?: OrderPopStyle;
  sure_press?: () => void;
  cancle_press?: () => void;
};

const OrderPop: FunctionComponent<PopProps> = (props) => {
  const { style, popStyle, sure_press, cancle_press } = props;

  const [wallet, setwallet] = useState();

  useEffect(() => {
    get_storageInfo();
  }, [])

  const get_storageInfo = async () => {
    let info = await Storage.load(CacheKeys.WALLETINFO);
    setwallet(info)
  }

  const renderCancleOffer = () => {
    return (

      <View style={[styles.modalContent, style]}>
        
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>
        <View style={{alignItems:"center",width:'100%'}}>
        <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) ,alignSelf:"center"}}>取消出价</Text>
          </View>
          <Pressable style={styles.arrow} onPress={cancle_press}>
            <Image
              style={styles.arrow}
              source={require("@/resources/closure.png")}
            />
          </Pressable>
        </View>
        <Text style={{ fontSize: pxToDp(28), color: '#333333', marginTop: pxToDp(76),marginBottom:pxToDp(60) }}>
          取消出价需要消耗一定的手续费，在区块链上会把出价
          标记为无效。永久不会再匹配成交。
        </Text>
        <NtfButton width={'100%'} heigh={pxToDp(100)} text="确定" backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} textColor={'white'} style={{ marginHorizontal: pxToDp(100), }}></NtfButton>

      </View>
    )
  }


  const renderCancleOrder = () => {
    return (

      <View style={[styles.modalContent, style]}>
        
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>
        <View style={{alignItems:"center",width:'100%'}}>
        <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) ,alignSelf:"center"}}>下架挂单</Text>
          </View>
          <Pressable style={styles.arrow} onPress={cancle_press}>
            <Image
              style={styles.arrow}
              source={require("@/resources/closure.png")}
            />
          </Pressable>
        </View>
        <Text style={{ fontSize: pxToDp(28), color: '#333333', marginTop: pxToDp(76),marginBottom:pxToDp(60) }}>
        确定取消出售吗？取消后您的订单将从平台下架，并且需要支付一定的手续费使其在链上失效。
        </Text>
        <NtfButton width={'100%'} heigh={pxToDp(100)} text="确定" backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} textColor={'white'} style={{ marginHorizontal: pxToDp(100), }}></NtfButton>

      </View>
    )
  }
  return (
    popStyle==OrderPopStyle.CANCEL_OFFER_STYLE?renderCancleOffer():renderCancleOrder()
  );
};

export default OrderPop;
