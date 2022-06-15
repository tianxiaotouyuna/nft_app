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
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import OfferCard, { PriceCardStyle } from "./SellerofferCard/OfferCard";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
type PopProps = {
  style?: StyleProp<ViewStyle>;
  priceCardStyle?: PriceCardStyle;
  onBuy?: () => void;
  cancle_press?: () => void;
  data?: any
};

const Offer: FunctionComponent<PopProps> = (props) => {
  const { style, data, onBuy, cancle_press, priceCardStyle } = props;
  const connector = useWalletConnect(); // valid
  const [wallet, setwallet] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const [items, setItems] = useState([
    {
      label: "价格从高到低",
      value: "价格从高到低",
      labelStyle: {
        color: UIELEMENTS.DEFAULT_HEADER_COLOR,
        paddingHorizontal: pxToDp(40),
        fontSize: pxToSp(28),
      },
    },
    {
      label: "价格从低到高",
      value: "价格从低到高",
      labelStyle: {
        color: UIELEMENTS.DEFAULT_HEADER_COLOR,
        paddingHorizontal: pxToDp(40),
        fontSize: pxToSp(28),
      },
    },
  ]);


  const item_one = (item: any, index: number) => {
    return (
      <View style={[styles.modalContent, style]}  >
        <OfferCard style={{ marginTop: pxToDp(30) }} onPress={onBuy} priceCardStyle={priceCardStyle} data={{ item }} />
      </View>
    )
  }
  const renderLoginOut = () => {
    return (
      <ScrollView style={[styles.pageContent, style]}  >
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingLeft: -pxToDp(24), justifyContent: "space-between" }}>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>{priceCardStyle == PriceCardStyle.SELLER_STYLE ? '卖家定价' : (priceCardStyle == PriceCardStyle.BUY_STYLE ? '买家出价' : '历史记录')}</Text>
          <Pressable onPress={cancle_press} style={{ width: pxToDp(88), height: pxToDp(88), alignItems: "center", justifyContent: "center" }}>
            <Image
              style={styles.arrow}
              source={require("@/resources/closure.png")}
            />
          </Pressable>
        </View>
        {data?.map((item: any, index: number) => (
          item_one(item, index)
        ))}

      </ScrollView>
    )
  }
  const renderHis = () => {
    return (
      <ScrollView style={[styles.pageContent, style]}  >
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingLeft: -pxToDp(24), justifyContent: "space-between" }}>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>{priceCardStyle == PriceCardStyle.SELLER_STYLE ? '卖家定价' : (priceCardStyle == PriceCardStyle.BUY_STYLE ? '买家出价' : '历史记录')}</Text>
          <Pressable onPress={cancle_press} style={{ width: pxToDp(88), height: pxToDp(88), alignItems: "center", justifyContent: "center" }}>
            <Image
              style={styles.arrow}
              source={require("@/resources/closure.png")}
            />
          </Pressable>


        </View>

        {/* <DropDownPicker
            style={{
              borderWidth: 1,
              borderColor: '#979797',
              width:pxToDp(148),
              height:pxToDp(52),  
              marginRight:pxToDp(30),
              alignSelf:"flex-end",
              backgroundColor:'red'
            }}
            modalProps={{
              animationType: "fade",
            }}
            labelStyle={{
              color: UIELEMENTS.DEFAULT_HEADER_COLOR,
              fontSize: pxToSp(28),
            }}
            placeholder="全部"
            placeholderStyle={{
              fontSize: pxToSp(28),
              color:'#383838',
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{ borderColor: "white" }}
            modalTitleStyle={{ borderColor: "white" }}
            ArrowUpIconComponent={({ style }) => (
              <Image
                style={styles.arrowStyle}
                source={require("@/resources/home/return_up.png")}
              />
            )}
            ArrowDownIconComponent={({ style }) => (
              <Image
                style={styles.arrowStyle}
                source={require("@/resources/home/return.png")}
              />
            )}
            TickIconComponent={({ style }) => (
              <Image
                style={{width:pxToDp(44),height:pxToDp(44)}}
                source={require("@/resources/home/choose.png")}
              />
            )}
          /> */}

        {data?.map((item: any, index: number) => (
          item_one_his(item, index)
        ))}

      </ScrollView>
    )
  }
  const item_one_his = (item: any, index: number) => {
    return (
      <View style={[styles.modalContent, style]}  >
        <OfferCard style={{ marginTop: pxToDp(30) }} onPress={onBuy} priceCardStyle={priceCardStyle} data={{ item }} />
      </View>
    )
  }
  return (
    priceCardStyle == PriceCardStyle.HIS_STYLE ?  renderHis():renderLoginOut()
  );
};

export default Offer;
