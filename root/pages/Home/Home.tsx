import React, { Component, FunctionComponent, useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Ripple from "react-native-material-ripple";
import { Button, Card, Searchbar, Title } from "react-native-paper";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder";
import styles from '@/styles/pages/home/home'
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate } from "@/utils/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { UIELEMENTS } from "@/constants/index";
import HomeGirdle from "@/components/HomeGirdle";
import { ScrollView } from "react-native-gesture-handler";
import BannerCard, { CardStyle } from "../../components/BannerCard/BannerCard";
import Carousel from 'react-native-snap-carousel'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import NFTSearchBar, { SearchStyle } from "@/components/NFTSearchBar/NFTSearchBar";
import { HomeService } from "@/services/index";

const Home: FunctionComponent = () => {

  const [collectionData, setCollectionData] = useState([]);

  const [inputValue, setinputValue] = useState('');
  const [publishData, setpublishData] = useState( [
   {
      "id": 440821083,
      "imageUrl": 'https://img0.baidu.com/it/u=940732863,1808085947&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500',
      "tokenId": "3882",
      "assetName": '悟空来了',
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821082,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1011%2Fbe8ac782j00r0s6ur000vc000hs00ckc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886615&t=92429f76e923e99c6056a5fee02ebfd6',
      "tokenId": "3876",
      "assetName": '油画',
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821080,
      "imageUrl": 'https://img0.baidu.com/it/u=590006338,1231462113&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      "tokenId": "3317",
      "assetName": '猴哥来玩了',
      "assetAddress": "0x46b95a569ef932adc1ebe0000727035ee1f2da75",
      "collectionName": "Eth.r Brews Generative Collection",
      "salePrice": 0
    },
    {
      "id": 440821079,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd20220225s%2F99%2Fw400h499%2F20220225%2F88e8-4189a62eb588fa8ef89c28e098807c3f.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886949&t=993b49b1b7609a6e20fbc1453fc8a5f0',
      "tokenId": "2814",
      "assetName": '战争之下',
      "assetAddress": "0x11ca9693156929ee2e7e1470c5e1a55b413e9007",
      "collectionName": "Psychedelics Anonymous Psilocybin",
      "salePrice": 0
    },
    {
      "id": 440821077,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd20220225s%2F99%2Fw400h499%2F20220225%2F88e8-4189a62eb588fa8ef89c28e098807c3f.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886949&t=993b49b1b7609a6e20fbc1453fc8a5f0',
      "tokenId": "3873",
      "assetName": null,
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821076,
      "imageUrl": 'https://img0.baidu.com/it/u=590006338,1231462113&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      "tokenId": "3879",
      "assetName": null,
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821073,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1011%2Fbe8ac782j00r0s6ur000vc000hs00ckc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886615&t=92429f76e923e99c6056a5fee02ebfd6',
      "tokenId": "3864",
      "assetName": null,
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821072,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd20220225s%2F99%2Fw400h499%2F20220225%2F88e8-4189a62eb588fa8ef89c28e098807c3f.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886949&t=993b49b1b7609a6e20fbc1453fc8a5f0',
      "tokenId": "3881",
      "assetName": null,
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821071,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1011%2Fbe8ac782j00r0s6ur000vc000hs00ckc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886615&t=92429f76e923e99c6056a5fee02ebfd6',
      "tokenId": "21269221605813514809481462890651808057441306200692816149898726332250211712452",
      "assetName": null,
      "assetAddress": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
      "collectionName": "ENS: Ethereum Name Service",
      "salePrice": 0
    },
    {
      "id": 440821070,
      "imageUrl": 'https://img0.baidu.com/it/u=940732863,1808085947&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500',
      "tokenId": "3875",
      "assetName": null,
      "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
      "collectionName": "THE TATTOO ARTIST",
      "salePrice": 0
    },
    {
      "id": 440821067,
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd20220225s%2F99%2Fw400h499%2F20220225%2F88e8-4189a62eb588fa8ef89c28e098807c3f.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655886949&t=993b49b1b7609a6e20fbc1453fc8a5f0',
      "tokenId": "105796204734605626712023685081731545537107694952405135557134397778624654289028",
      "assetName": null,
      "assetAddress": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
      "collectionName": "ENS: Ethereum Name Service",
      "salePrice": 0
    },
  

  ]);

  const [hotNft, sethotNft] = useState(  [{"tokenId":"0",
  "tokenAddress":"0xe2e3253105ccc59121b96e3864cce1fdf86ebc36",
  "name":"Sample token",
  "description":"This is my first token",
  "owner":{"user":null,"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/15.png",
  "address":"0xe2cd5e6831d08a1b134d3aee9e0f974ad832dd41","config":""},
  "assetContract":{"name":"MyToken","description":null,"type":"non-fungible","schemaName":"ERC721","address":"0xe2e3253105ccc59121b96e3864cce1fdf86ebc36","tokenSymbol":"MTK","buyerFeeBasisPoints":0,"sellerFeeBasisPoints":250,"openseaBuyerFeeBasisPoints":0,"openseaSellerFeeBasisPoints":250,"devBuyerFeeBasisPoints":0,"devSellerFeeBasisPoints":0,"imageUrl":null,"externalLink":null},"collection":{"createdDate":"2022-06-12T13:49:49.027Z","name":"MyToken - l1ilv5kgdt","description":null,"slug":"mytoken-l1ilv5kgdt","hidden":false,"featured":false,"featuredImageUrl":null,"displayData":{"card_display_style":"contain","images":[]},"paymentTokens":[{"name":null,"symbol":"ETH","decimals":18,
  "address":"0x0000000000000000000000000000000000000000",
  "imageUrl":"https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg",
  "ethPrice":1,"usdPrice":405.65},{"name":"","symbol":"WETH","decimals":18,"address":"0xc778417e063141139fce010982780140aa0cd5ab","imageUrl":"https://openseauserdata.com/files/accae6b6fb3888cbff27a013729c22dc.svg","ethPrice":1,"usdPrice":1452.58}],"openseaBuyerFeeBasisPoints":0,"openseaSellerFeeBasisPoints":250,"devBuyerFeeBasisPoints":0,"devSellerFeeBasisPoints":0,"payoutAddress":null,"imageUrl":null,"largeImageUrl":null,"stats":{"one_day_volume":0,"one_day_change":0,"one_day_sales":0,"one_day_average_price":0,"seven_day_volume":0,"seven_day_change":0,"seven_day_sales":0,"seven_day_average_price":0,"thirty_day_volume":0,"thirty_day_change":0,"thirty_day_sales":0,"thirty_day_average_price":0,"total_volume":0,"total_sales":0,"total_supply":1,"count":1,"num_owners":1,"average_price":0,"num_reports":0,"market_cap":0,"floor_price":0},"traitStats":{},"externalLink":null,"wikiLink":null},"orders":null,"sellOrders":null,"buyOrders":null,"isPresale":false,"imageUrl":"https://lh3.googleusercontent.com/xgYVoyFp1zFZQyXi3uGpAyMMtkDvwahiK1FWEbNuObmjixWOY1eXkdoqhsRahOgueivhZNs6XxRGFTp8LR84PuU99g68Z23C4nIQAQ=s250","imagePreviewUrl":"https://lh3.googleusercontent.com/xgYVoyFp1zFZQyXi3uGpAyMMtkDvwahiK1FWEbNuObmjixWOY1eXkdoqhsRahOgueivhZNs6XxRGFTp8LR84PuU99g68Z23C4nIQAQ=s250","imageUrlOriginal":"https://opensea.mypinata.cloud/ipfs/QmSzg2cKcwX8zoNX8WMVAbMbhCt8dtKZkNKKM8G4ek7YHw","imageUrlThumbnail":"https://lh3.googleusercontent.com/xgYVoyFp1zFZQyXi3uGpAyMMtkDvwahiK1FWEbNuObmjixWOY1eXkdoqhsRahOgueivhZNs6XxRGFTp8LR84PuU99g68Z23C4nIQAQ=s128","externalLink":null,"openseaLink":"https://testnets.opensea.io/assets/rinkeby/0xe2e3253105ccc59121b96e3864cce1fdf86ebc36/0","traits":[],"numSales":0,"lastSale":null,"backgroundColor":null,"transferFee":null,"transferFeePaymentToken":null},
  {
    "id": 440821076,
    "imageUrl": 'https://img0.baidu.com/it/u=590006338,1231462113&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    "tokenId": "3879",
    "assetName": null,
    "assetAddress": "0xc784b6b8c8f8b7263689138ab9d5f400440f02cc",
    "collectionName": "THE TATTOO ARTIST",
    "salePrice": '0.0021 ETH'
  }],);
  const onChangeSearch = (query: string) => {
    setinputValue(query)
  }
  const renderPublish = (item, index) => (
    <BannerCard
      data={item['item']}
      cardStyle={CardStyle.PUBLISH_STYLE}
      onTap={() => { Navigate.navigate('Search', {}) }}
      borderRadius={pxToDp(28)}
    />
  )
  FastImage.clearMemoryCache();
  const renderHot = (item, index) => (
    <BannerCard
      data={item['item']}
      cardStyle={CardStyle.HOTCOLLECTION_STYLE}
      onTap={() => { Navigate.navigate('CollectionDetail', {item:item['item']}) }}
        borderRadius={pxToDp(28)}
    />
  )

  useInitScreen({
    navigationOptions: {
      title:'首页',
      headerRight: () => (
        <Pressable
          onPress={() => {
            Navigate.navigate("LoginOut", {});
          }}
        >
          <Image
            style={styles.tab_right2}
            source={require("@/resources/home/more.png")}
          />
        </Pressable>
      ),
      headerTitleAlign: "left",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {

    const order = await HomeService.queryCollectionList({ }, {});
    console.log('orderorder==='+JSON.stringify(order))
    setCollectionData(order?.data?.collections)
  }
  return (
    <ScrollView style={[styles.container, { marginBottom: 100 + useSafeAreaInsets().bottom }]}>
      {/* <Searchbar
        placeholder="搜索"
        onChangeText={(query) => { onChangeSearch(query) }}
        onEndEditing={() => { Navigate.navigate('Search', {}) }}
        value={inputValue}
        icon={require('@/resources/home/Search.png')}
        style={styles.search_wraps}
        inputStyle={styles.search_input}
        selectionColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
      /> */}
  <NFTSearchBar searchStyle={SearchStyle.HOME1_STYLE}></NFTSearchBar>
      <View style={styles.IGO_Warps}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.IGO_Warps_Text}>分类</Text>
        </View>
      </View>
      <HomeGirdle items={[{ 'source': require('@/resources/home/art.png'), 'text': '艺术' },
      { 'source': require('@/resources/home/music.png'), 'text': '音乐' },
      { 'source': require('@/resources/home/star.png'), 'text': '明星' },
      { 'source': require('@/resources/home/movie.png'), 'text': '电影' }]} paddingHorizontal={25} style={{ marginTop: pxToDp(14) }}></HomeGirdle>

      <View style={styles.IGO_Warps}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.IGO_Warps_Text}>发行/IGO</Text>
          <Image style={styles.IGO_Warps_Image} source={require('@/resources/home/Rocket.png')} />
        </View>
        <Image style={styles.IGO_Warps_arrow} source={require('@/resources/home/return.png')} />
      </View>
      <Carousel
        data={publishData}
        activeSlideAlignment={'start'}
        renderItem={(item, index) => renderPublish(item, index)}
        initialNumToRender={1}
        sliderWidth={pxToDp(670)}
        itemWidth={pxToDp(560)}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        firstItem={0}
      />



      <View style={styles.IGO_Warps}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.IGO_Warps_Text}>热门合集</Text>
          <Image style={styles.IGO_Warps_Image} source={require('@/resources/home/popular.png')} />
        </View>
      </View>
      {/* <NftAutoScroll duration={100000} bannerCard={CardStyle.HOTCOLLECTION_STYLE} data={ hotData} ></NftAutoScroll> */}
      <Carousel
        data={collectionData}
        activeSlideAlignment={'start'}
        renderItem={(item, index) => renderHot(item, index)}
        sliderWidth={pxToDp(670)}
        itemWidth={pxToDp(300)}
        inactiveSlideScale={1}
        initialNumToRender={1}
        inactiveSlideOpacity={1}
        firstItem={0}
        scrollEndDragDebounceValue={40}
      />



      {/* <View style={styles.IGO_Warps}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.IGO_Warps_Text}>市场排行</Text>
          <Image style={styles.IGO_Warps_Image} source={require('@/resources/home/ranking.png')} />
        </View>

      </View> */}
      {/* <RankCard style={{ width: pxToDp(100), height: pxToDp(100) }} data={{ 'head': 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fen.pimg.jp%2F014%2F428%2F054%2F1%2F14428054.jpg&refer=http%3A%2F%2Fen.pimg.jp&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655434302&t=6fb858fcb2690dd20f893f7a21894f74', 'name': 'NFT藏品', 'plus': '-80%' }}></RankCard> */}
      {/* <Card>
        <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia} style={styles.spacing1}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </Card>
      <Card>
        <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia} style={styles.spacing1}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </Card> */}


      <View style={styles.IGO_Warps}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.IGO_Warps_Text}>热门NFT</Text>
          <Image style={styles.IGO_Warps_Image} source={require('@/resources/home/popular.png')} />
        </View>
        <Image style={styles.IGO_Warps_arrow} source={require('@/resources/home/return.png')} />
      </View>
      <BannerCard
        onTap={() => { Navigate.navigate('NtfDetail', {}) }}
        data={hotNft}
        cardStyle={CardStyle.HOTNTF_STYLE}
      />
      {/* <Card>
        <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia} style={styles.spacing1}>
          <PlaceholderLine width={90} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={30} />
        </Placeholder>
      </Card>
      <Card>
        <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia} style={styles.spacing1}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </Card> */}
      
    </ScrollView>
  );
};
export default Home
