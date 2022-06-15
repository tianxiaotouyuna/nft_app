import React, { FunctionComponent, LegacyRef, ReactNode, Ref, useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import styles from "./styles";
import { generateBoxShadowStyle, pxToDp, windowWidth } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native-animatable";
import FastImage from "react-native-fast-image";
type AssetBtnWrapsProps = {
  onPress_1?: () => void;
  onPress_2?: () => void;
  ref?: Ref<any>;
  bottom?: number;
  isFromMyDetail?: boolean;
  style?: StyleProp<ViewStyle>;
  data?: any
};
const Centerheader: FunctionComponent<AssetBtnWrapsProps> = (props) => {
  const { onPress_1, onPress_2, bottom = useSafeAreaInsets().bottom, ref, isFromMyDetail = false, data, style } = props;
  return (
    <View style={{ width: windowWidth,height:pxToDp(108),backgroundColor: 'rgba(0,0,0,0)'}}>
      <View
        style={[generateBoxShadowStyle(0, 2, 'rgba(0,0,0,0.08)', 1, 12, 4, 'rgba(0,0,0,0.08)', styles.viewBg), style]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FastImage
            style={[styles.head]}
            resizeMode="cover"
            source={{ uri: data?.profileImgUrl }}
            // shangheji xia项目
          />
          <Text style={{ color: "#000000", marginLeft: pxToDp(20) }}>{data?.collectionName}</Text> 
        </View>
        <View
          style={{ flexDirection: "row", borderColor: 'rgba(51, 82, 219, 0.1)', borderWidth: pxToDp(2), borderRadius: 100, paddingHorizontal: pxToDp(28), paddingVertical: pxToDp(14) }}>
          <Image
            style={styles.collect}
            source={require("@/resources/collect.png")}
          />
          <Text style={{ color: "#383838", marginLeft: pxToDp(20) }}>{data?.followNum}</Text>
        </View>
      </View>
    </View>

  );
};

export default Centerheader;
 // shangheji xia项目
