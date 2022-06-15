import { HomeService } from "@/services";
import { pxToDp } from "@/utils/system";
import React, { FunctionComponent, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from "rn-placeholder";
import { Navigate } from "../../utils";
import BannerCard, { CardStyle } from "../BannerCard/BannerCard";
import styles from "./nftauto-style";
import AutoScroll from "@homielab/react-native-auto-scroll";
type BannerProps = {
  data: any;
  width?: number;
  height?: number;
  onDataFinish?: () => void;
  bannerCard?: CardStyle;
  duration?:number
};

const NftAutoScroll: FunctionComponent<BannerProps> = (props) => {
  const {
    data = [],
    duration=5000,
    width = pxToDp(702),
    height = pxToDp(296),
    onDataFinish,
    bannerCard,
  } = props;
  return (
    <AutoScroll endPaddingWidth={0} duration={duration}>
      <View style={styles.swiper} >
      {data?.map((item: any, index: number) => (
        <Pressable
          key={`${index}`}
          onPress={() => Navigate.navigate("Search")}
        >
          <BannerCard
            data={item}
            cardStyle={bannerCard}
            onTap={() => {}}
            borderRadius={pxToDp(28)}
          />
        </Pressable>
      ))}
      </View>
    </AutoScroll>
  );
};

export default NftAutoScroll;
