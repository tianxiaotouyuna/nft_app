import Bottom from "@/pageranges/markdetail/bottom/Bottom";
import Center from "@/pageranges/markdetail/center/Center";
import { MarketService } from "@/services/index";
import { pxToDp, windowHeight, windowWidth } from "@/utils/system";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Button, Platform, Alert, Image, Pressable, Animated, StyleSheet, Text, Clipboard } from "react-native";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Navigate } from "@/utils/index";
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from "rn-placeholder";
import Offer from "@/components/Selleroffer/Offer";
import { PriceCardStyle } from "@/components/Selleroffer/SellerofferCard/OfferCard";
import SellPop, { PopStyle } from "@/components/SellPop/SellPop";
import Centerheader from "@/pageranges/markdetail/centerheader/Centerheader";

const NftCollectionDetail: FunctionComponent = () => {
  const params: any = useRoute().params?.item ?? {};
  const isMyDetail: boolean = useRoute().params?.isMyDetail ??false;

  const [data, setdata] = useState({});
  const [buyData, setbuyData] = useState(null);
  const [sellData, setsellData] = useState(null);
  const [hisData, sethisData] = useState(null);
  const bottomRef = useRef<any>();
  const [imageEnd, setimageEnd] = useState(false);
  const yOffset = useRef(new Animated.Value(0)).current;
  const [sellerShow, setsellerShow] = useState(false);
  const [buyshow, setbuyshow] = useState(false);
      const [transfer, settransfer] = useState(false);
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
    getData()
    queryBidOffersList()
    querySellerList()
    queryEventList()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      // headerStyle: {
      //   opacity: headerOpacity,
      // },
      title: data?.assetName,
      headerTitleStyle: { opacity: headerOpacity3 },
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

  const getData = async () => {

    const order = await MarketService.getAssetsOneInfo({ 'AssetContractAddress': params?.assetAddress, 'tokenId': params?.tokenId }, {});
    setdata(order?.data)
  }
  // const queryBidOffersList = async () => {

  //   const order = await MarketService.queryBidOffersList({ 'AssetContractAddress': params?.assetAddress, 'tokenId': params?.tokenId }, {'limit':20});
  //   setbuyData(order?.data)
  // }

  // const querySellerList = async () => {
  //   const order = await MarketService.querySellerList({ 'AssetContractAddress': params?.assetAddress, 'tokenId': params?.tokenId }, {'limit':20});
  //   setsellData(order?.data)
  // }

  // const queryEventList = async () => {
  //   const order = await MarketService.queryEventList({ 'AssetContractAddress': params?.assetAddress, 'tokenId': params?.tokenId }, {'limit':20});
  //   setsellData(order?.data)
  // }
  
  const queryBidOffersList = async () => {

    const order = await MarketService.queryBidOffersList({ 'AssetContractAddress': '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', 'tokenId': 8520}, {'limit':20});
    setbuyData(order?.data?.offers)
}

  const querySellerList = async () => {
    const order = await MarketService.querySellerList({ 'AssetContractAddress': '0x5ba27d17821f9ac041b648fe9f90ec40abb8c3c2', 'tokenId': 7 }, {'limit':20});
    setsellData(order?.data?.listings)
}

  const queryEventList = async () => {
    const order = await MarketService.queryEventList({},{'token_id': 7,'asset_contract_address': '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'});
    console.log('asdasd==='+JSON.stringify(order))
    sethisData(order?.data)
  }



  const gotoBuy = () => {
    setsellerShow(false)
    setTimeout(() => {
      Navigate.navigate('Buy', { data: data })
    }, 1);
  }
const pushToNext=()=>{
  if(isMyDetail)Navigate.navigate('Sell', { data: data })
  else Navigate.navigate('Buy', { data: data })
}
  const closeSeller = () => {
    setsellerShow(false)
  }
  const closeBuy = () => {
    setbuyshow(false)
  }
  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        style={{ marginBottom: pxToDp(165) + useSafeAreaInsets().bottom }}
        contentContainerStyle={{ paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >

        <FastImage
          style={imageEnd ? styles.image : { width: 0, height: 0 }}
          resizeMode="cover"
          source={{ uri: data?.imageThumbnailUrl }}
          onLoadEnd={() => {
            setimageEnd(true)
          }}
          fallback={true}
        />
        {imageEnd == false ?
          (
            <Placeholder Animation={ShineOverlay} >
              <PlaceholderMedia style={[styles.image]} />
            </Placeholder>
          ) : null}
      
        <Center data={data} onpress_1={() => setsellerShow(true)} onpress_2={() => setbuyshow(true)} isFromMyDetail={isMyDetail} data_buy={buyData} data_sell={sellData} data_history={hisData}  />
      </Animated.ScrollView>


      <Modal isVisible={sellerShow} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <Offer data={sellData} onBuy={() => gotoBuy()} cancle_press={closeSeller} priceCardStyle={PriceCardStyle.SELLER_STYLE}></Offer>
      </Modal>


      <Modal isVisible={buyshow} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <Offer data={buyData} cancle_press={closeBuy} priceCardStyle={PriceCardStyle.BUY_STYLE}></Offer>
      </Modal>



      <Modal isVisible={transfer} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <SellPop cancle_press={() => settransfer(false)} sure_press={() => { }} data={hisData} popStyle={PopStyle.TRANSFER_STYLE}></SellPop>
      </Modal>
      <Bottom onPress_2={pushToNext} isFromMyDetail={isMyDetail} onPress_1={()=>{settransfer(true)}}/>
    </View>
  );
};


const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: windowWidth,
    height: windowWidth, backgroundColor: '#EEEEEE'
  },
});


export default NftCollectionDetail;

