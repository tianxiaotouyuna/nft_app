import { HomeService } from "@/services";
import { pxToDp } from "@/utils/system";
import React, { FunctionComponent, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from "rn-placeholder";
import { Navigate } from "../../utils";
import BannerCard, { CardStyle } from "../BannerCard/BannerCard";
import styles from "./banner-style";

type BannerProps = {
  data: any;
  width?: number;
  height?: number;
  onDataFinish?: () => void;
  bannerCard?: CardStyle;
};

const Banner: FunctionComponent<BannerProps> = (props) => {
  const {
    data =[],
    width = pxToDp(702),
    height = pxToDp(296),
    onDataFinish,
    bannerCard,
  } = props;
  const [dataList, setDataList] = useState<any[]>([]);
  // useEffect(() => {
  //   initData();
  // }, [data]);

  // const initData = useCallback(async () => {
  //   try {
  //     const { data: list } = await HomeService.composingData({
  //       type: data?.type,
  //     });
  //     setDataList(list);
  //   } catch (error) {}
  //   onDataFinish?.();
  // }, [data]);

  // if (!(dataList?.length > 0)) {
  //   return null;
  // }

  return (
    <View style={styles.swiper}>
      <Swiper
        style={{backgroundColor:'red'}}
        width={686}
        height={height}
        dotStyle={styles.dot}
        activeDotStyle={styles.active_dot}
        autoplay={true}
        autoplayTimeout={3}
        bounces={true}
        loadMinimalLoader={
          <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia} style={styles.spacing1}>
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>}
        showsPagination={data?.length > 1}
        loop={true}
        paginationStyle={styles.pagination}
        // 添加这个属性解决第二个循环抖动问题
        removeClippedSubviews={false}
        disableIntervalMomentum={true}
        // automaticallyAdjustContentInsets={true}
      >
        {data?.map((item:any, index:number) => (
          <Pressable
            key={`${index}`}
            style={[styles.image_wrap, { width, height }]}
            onPress={() => Navigate.navigate('Search')}
          >
            <View>

            <BannerCard
              data={item}
              cardStyle={bannerCard}
              onTap={() => {}}
              borderRadius={pxToDp(28)}
            />
            
            </View>
          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default Banner;
