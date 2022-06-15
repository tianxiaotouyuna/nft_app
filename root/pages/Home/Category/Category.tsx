import React, { FunctionComponent, useEffect, useRef } from "react";
import { Pressable, Image, View, Text, ScrollView, Animated, StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder";
import styles from './styles'
import useInitScreen from "@/hooks/useInitScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { pxToDp, windowWidth } from "@/utils/system";
import LinearGradient from 'react-native-linear-gradient';
import GDataList, { WHERELIST } from "@/components/GDataList";
import { HomeService, MarketService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { Navigate } from "@/utils/index";
import { useNavigation, useRoute } from "@react-navigation/native";

const Category: FunctionComponent = () => {
  const title: any = useRoute().params?.title ?? {};
  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const headerOpacity2 = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 1],
    extrapolate: "clamp",
  });
  const headerOpacity3 = yOffset.interpolate({
    inputRange: [windowWidth - (44 + useSafeAreaInsets().top) + 40, windowWidth - (44 + useSafeAreaInsets().top) + 80],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const backButtonBackgroundColorAnimation = yOffset.interpolate({
    inputRange: [0, 130],
    outputRange: ['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)'], // gray transparent to transparent
    extrapolate: 'clamp',
  });

  const backArrowColorAnimation = yOffset.interpolate({
    inputRange: [0, 130],
    outputRange: ['rgb(255,255,255)', 'rgb(0,0,0)'], // white to black
    extrapolate: 'clamp',
  });
  
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: title,
      // headerTitleStyle: { opacity: headerOpacity3 },
      headerTitleAlign: "center",
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: "white",
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
          }}
        />
      ),
      headerTransparent: true,
    });
  }, [
    headerOpacity,
    navigation,
    backArrowColorAnimation,
    backButtonBackgroundColorAnimation,]);

  const renderItem = ({ item, index }: any) => {
    return (
      <BannerCard
        data={item}
        cardStyle={CardStyle.HOTCOLLECTION_DOUBLE_STYLE}
      ></BannerCard>
      
    );
  };
  const renderList = () => {
    return (
      <GDataList
      style={{marginTop:pxToDp(30)}}
        requestMethod={HomeService.queryCollectionList2}
        requestParams={{ path: '', params: { } }}
        defaultPageSize={20}
        whereList={WHERELIST.COLLECTION_CATEGORY_STYLE}
        isOpenseaStructure={true}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: pxToDp(20) }}></View>}
        ListEmptyComponent={() => (
          <View style={styles.empty_box}>
            <Text style={styles.empty_text1}>暂无相关数据～</Text>

          </View>
        )}
      />
    )
  }
  const renderBottom = () => {
    return (

      <View style={styles.bottomBg}>
        <View style={styles.bottomBg_content}>
          <View style={styles.bottomBg_content_title}>
            <Text style={styles.title_text1}>27个合集</Text>
            <Text style={styles.title_text1}>近7日交易额排序</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              height: pxToDp(2),
              width: "100%",
            }}
          />
        </View>
      </View>
    )
  }
  return (
    // <Animated.ScrollView
    //   style={[styles.container, { marginTop: -useSafeAreaInsets().top }]}
    //   onScroll={Animated.event(
    //     [
    //       {
    //         nativeEvent: {
    //           contentOffset: {
    //             y: yOffset,
    //           },
    //         },
    //       },
    //     ],
    //     { useNativeDriver: true }
    //   )}
    // >
    // </Animated.ScrollView>
    <View
      style={[styles.container, { marginTop: -useSafeAreaInsets().top }]}
    >
      <LinearGradient
        style={styles.linear}
        colors={["#CCDBFC", "#839CEB"]}
        start={{ x: .5, y: 1 }}
        end={{ x: .5, y: 0 }}
      >
        <Text style={{ marginTop: pxToDp(88 + 44 + useSafeAreaInsets().top) }}>
        这是一段NFT 分类的描述 这是一段NFT 分类的描述，这是一段NFT 分类的描述 这是一段NFT 分类的描述 这是一段NFT 分类的描述 这是一段NFT 分类的描述</Text>
      </LinearGradient>
      {renderBottom()}
        {renderList()}
          
      </View>

  );
};
export default Category
