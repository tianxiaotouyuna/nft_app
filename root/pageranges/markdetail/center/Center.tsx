import React, { FunctionComponent, ReactNode, useState } from "react";
import { Alert, Clipboard, Pressable, View } from "react-native";
import styles from "./range";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import { walletActions } from "@/action/walletActions";
import { useDispatch } from "react-redux";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Image, Text } from "react-native-animatable";
import Centerheader from "../centerheader/Centerheader";
type AssetBtnWrapsProps = {
  data?: any;
  data_buy?: any;
  data_sell?: any;
  data_history?: any;
  onpress_1?: () => void;
  onpress_2?: () => void;
  onpress_3?: () => void;
  isFromMyDetail?: boolean;

};
const Center: FunctionComponent<AssetBtnWrapsProps> = (props) => {
  const { data, onpress_1, onpress_2, onpress_3, isFromMyDetail = false, data_buy, data_sell, data_history } = props;
  const dispatch = useDispatch();
  const connector = useWalletConnect(); // valid
  const login = () => {
    dispatch(walletActions.connect(connector));
  };
  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    Alert.alert(data?.creatorAddress + '复制成功')
    console.log('复制的内容', str)
  }

  return (
    <View style={styles.container}>
      <Centerheader data={data} style={{ position: "absolute", top: pxToDp(-54) }} />
      <Text
        style={{ color: "#383838", fontSize: pxToDp(32), fontWeight: "bold" }}
      >
        {data?.assetName}
      </Text>
      <Text numberOfLines={3} style={{ width: '100%' }}>
        {data?.description}
      </Text>
      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(4),
          width: "100%",
          marginTop: pxToDp(40),
        }}
      />
      <View
        style={{
          paddingTop: pxToDp(26),
          paddingBottom: pxToDp(44),
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>拥有者</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(6) }}>
            <Text style={{ color: "#3352DB" }}>{data?.topOwnerships?.[0]?.quantity}人</Text>
            <Image
              style={styles.arrow}
              source={require("@/resources/return.png")}
            />
          </View>
        </View>

        <View>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>发行方</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(6) }}>
            <Text
              style={{
                color: "#383838",
                fontSize: pxToDp(28),
                width: pxToDp(199),
              }}
              numberOfLines={1}
            >
              {data?.creatorAddress}
            </Text>
            <Pressable onPress={() => copyAdress(data?.creatorAddress)}>

              <Image
                style={styles.arrow}
                source={require("@/resources/copy.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <Text
        style={{ color: "#383838", fontSize: pxToDp(32), fontWeight: "bold" }}
      >
        基础信息
      </Text>

      <View style={{ marginTop: pxToDp(32) }}>
        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>合约地址</Text>
        <Text
          style={{ color: "#383838", fontSize: pxToDp(28), marginTop: pxToDp(6) }}
          numberOfLines={1}
        >
          {data?.creatorAddress}
        </Text>
      </View>

      <View
        style={{
          paddingTop: pxToDp(26),
          paddingBottom: pxToDp(44),
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>网络</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>无数据</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>
            代币编号
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#383838",
                fontSize: pxToDp(28),
                width: pxToDp(199)
                , marginTop: pxToDp(6)
              }}
              numberOfLines={1}
            >
              {data?.creatorAddress}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingTop: pxToDp(26),
          paddingBottom: pxToDp(44),
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>
            发行数量
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(6) }}>
            <Text style={{ color: "#383838" }}>{data?.totalSupply || '无数据'}</Text>
          </View>
        </View>

        <View>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>
            代币标准
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(6) }}>
            <Text
              style={{
                color: "#383838",
                fontSize: pxToDp(28),
                width: pxToDp(199),
              }}
              numberOfLines={1}
            >
              {data?.schemaName}
            </Text>
          </View>
        </View>
      </View>


      {isFromMyDetail == false && data_sell ?
        <>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              height: pxToDp(8),
              width: "100%",
            }}
          />
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pxToDp(34),
            }}
            onPress={onpress_1}
          >
            <Text
              style={{
                color: "#383838",
                fontSize: pxToDp(28),
                width: pxToDp(199),
              }}
              numberOfLines={1}
            >
              卖家定价
            </Text>
            <Image
              style={styles.arrow}
              source={require("@/resources/return_4.png")}
            />

          </Pressable></> :
        null}


      {data_buy ?
        <>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              height: pxToDp(4),
              width: "100%",
            }}
          />
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pxToDp(34),
            }}
            onPress={onpress_2}
          >
            <Text
              style={{
                color: "#383838",
                fontSize: pxToDp(28),
                width: pxToDp(199),
              }}
              numberOfLines={1}
            >
              买家出价
            </Text>
            <Image
              style={styles.arrow}
              source={require("@/resources/return_4.png")}
            />
          </Pressable></> : null}


      {data_history ?
        <>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              height: pxToDp(4),
              width: "100%",
            }}
          />
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: pxToDp(34),
            }}
            onPress={onpress_3}
          >
            <Text
              style={{
                color: "#383838",
                fontSize: pxToDp(28),
                width: pxToDp(199),
              }}
              numberOfLines={1}
            >
              交易历史
            </Text>
            <Image
              style={styles.arrow}
              source={require("@/resources/return_4.png")}
            />
          </Pressable>
        </>
        : null}
      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(4),
          width: "100%",
        }}
      />

    </View>
  );
};
//https://www.apifox.cn/apidoc/shared-82b71f6c-7299-46df-ac3b-41f48031a9ed/api-20735620
export default Center;
