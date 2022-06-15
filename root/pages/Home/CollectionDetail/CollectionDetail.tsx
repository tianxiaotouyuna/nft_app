import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Pressable, Image, View, Text, ScrollView, Animated, StyleSheet, Alert } from "react-native";
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
import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
import LinearGradient from 'react-native-linear-gradient';
import GDataList, { WHERELIST } from "@/components/GDataList";
import { HomeService, MarketService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { Navigate } from "@/utils/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import TopInfo from "@/pageranges/Collections/CollectionDetail/TopInfo";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { UIELEMENTS } from "@/constants/";
import NFTDefaultTabBar from "@/pages/Order/NFTDefaultTabBar";
import CollectionList from "./CollecttionList/CollectionList";

const CollectionDetail: FunctionComponent = () => {
  const item: any = useRoute().params?.item ?? {};
  const [tipsInfo, settipsInfo] = useState({});
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
      title: 'title',
      headerTitleStyle: { opacity: headerOpacity3 },
      headerTitleAlign: "center",
      headerLeft: () => (
        <Pressable onPress={() => Navigate.goBack()}>
          <Animated.View
            style={{
              borderRadius: 500,
              padding: 5,
              marginLeft: 10,
              opacity: headerOpacity2, backgroundColor: 'white'
            }}>
            <Animated.Image source={require('@/resources/home/return_2.png')}
            ></Animated.Image>
          </Animated.View>
        </Pressable>
      ),
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

    useEffect(() => {
      getData()
    }, [])
    const getData = async () => {
      const order = await HomeService.getCollectionStats({ path:{a:item?.slug},params:{}});
      // console.log('orderorder==='+JSON.stringify(order))
      settipsInfo(order?.data)
    }
 
  const [tabsInfo] = useState([
    { name: "全部商品", type: 1 },
    { name: "交易历史", type: 2 },
])
  const handleChangeTab=()=>{

  }
const showScrollBar=()=>{
  return(
    <ScrollableTabView
      style={styles.container}
      onChangeTab={handleChangeTab}
      renderTabBar={() => <NFTDefaultTabBar activeTextColor={'#383838'} inactiveTextColor={'#383838'} textStyle={{fontSize:pxToSp(28)}}/>}
    >
      {tabsInfo?.map((item: any, index: number) => (
                <CollectionList key={`${item?.name}_${index}`} tabLabel={ item?.name } type={item?.type} />
            ))}
      </ScrollableTabView>
  )
}
  return (
    <View
      style={[styles.container, { marginTop: -useSafeAreaInsets().top }]}
    >
        <FastImage
          style={{height:pxToDp(370),width:'100%', backgroundColor: '#EEEEEE' } }
          resizeMode="cover"
          source={{ uri: item?.image_url }}
          onLoad={() => {
          }}
        />
         <FastImage
          style={{height:pxToDp(120),width:pxToDp(120), borderRadius:200,marginTop:-pxToDp(50),alignSelf:"center",borderColor:'white',borderWidth:pxToDp(4),backgroundColor: '#EEEEEE' } }
          resizeMode="cover"
          source={{ uri: item?.image_url }}
          onLoad={() => {
          }}
        />
        <Text style={styles.title_text1} numberOfLines={1} ellipsizeMode={'middle'}>{item?.name}</Text>
        <TopInfo data={tipsInfo}/>
      
        {showScrollBar()}

    </View>
  );
};
export default CollectionDetail
