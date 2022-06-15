import React, { FunctionComponent, ReactNode, useState } from "react";
import {
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import { walletActions } from "@/action/walletActions";
import { useDispatch } from "react-redux";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Navigate } from "@/utils/index";
import BaseCard from "@/components/BaseCard/BaseCard";
import { Text } from "react-native-animatable";
type AssetBtnWrapsProps = {
  onPress_1?: () => void;
  onPress_2?: () => void;
  onPress_3?: () => void;
  data?: any;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};
const TopInfo: FunctionComponent<AssetBtnWrapsProps> = (props) => {
  const { style, data, borderRadius } = props;
  return (
    <View style={[styles.container, style]}>
      <BaseCard style={[style, { borderRadius: pxToDp(28) ,padding:pxToDp(22),width:pxToDp(686)}]}
      >
        <View style={{ flexDirection: 'row' ,justifyContent:"space-between"}}>
          <View style={{alignItems:"center"}}>

            <Text style={styles.text1}>{data?.count}</Text>
            <Text style={styles.text2}>商品总量</Text>
          </View>

          <View style={{alignItems:"center"}}>

            <Text style={styles.text1}>{data?.num_owners}</Text>
            <Text style={styles.text2}>持有人数</Text>
          </View>

          <View style={{alignItems:"center"}}>
            <Text style={styles.text1}>{data?.floor_price}</Text>
            <Text style={styles.text2}>最近成交价</Text>
          </View>

          <View style={{alignItems:"center"}}>
            <Text style={styles.text1}>{data?.floor_price}</Text>
            <Text style={styles.text2}>地板价</Text>
          </View>
        </View>
      </BaseCard>

    </View>
  );
};

export default TopInfo;
