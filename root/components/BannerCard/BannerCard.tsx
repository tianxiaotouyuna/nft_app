import styles from "./banner-card";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  Pressable,
  Alert,
} from "react-native";
import FastImage from "react-native-fast-image";
import BaseCard from "../BaseCard/BaseCard";
import { pxToDp, pxToSp } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from "rn-placeholder";
import NtfButton from "../NtfButton/NtfButton";
export enum CardStyle {
  PUBLISH_STYLE = 1, //发行
  HOTCOLLECTION_STYLE = 2, //热门合集
  HOTNTF_STYLE = 3, //热门NFT
  HOTCOLLECTION_DOUBLE_STYLE = 4, //热门合集2列
  HOTCOLLECTION_DOUBLE_USENTF_STYLE = 5, //热门合集2列

}
type BannerCardProps = {
  style?: StyleProp<ViewStyle>;
  data: any;
  cardStyle?: CardStyle;
  onTap?: () => void;
  isFromMy?: boolean;
  borderRadius?: number;
};
const BannerCard: FunctionComponent<BannerCardProps> = (props) => {
  const { data, style, cardStyle, onTap, borderRadius = pxToDp(10), isFromMy = false } = props;
  const [imageEnd, setimageEnd] = useState(true);
  const [imageError, setimageError] = useState(false);
  const renderHotNtf = () => {
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
        {data?.map((item: any, index: number) => (
          item_one(item, index)
        ))}
      </View>
    );
  }
  const pushCard = (item: any) => {
    if (isFromMy) Navigate.navigate('NtfDetail', { item: item, isMyDetail: true })
    else Navigate.navigate('NtfDetail', { item: item })
  }
  const item_one = (item: any, index: number) => (

    <Ripple onPress={() => pushCard(item)} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} rippleContainerBorderRadius={borderRadius} key={`${index}`}>
      <BaseCard style={[{ borderRadius: borderRadius }, { width: pxToDp(326), paddingHorizontal: pxToDp(8) }]}>
        <FastImage
          style={imageEnd ? [styles.publish_image, { borderRadius: borderRadius, backgroundColor: '#EEEEEE' }] : [{ width: 0, height: 0 }]}
          resizeMode="cover"
          source={{ uri: item?.imageUrl }}
          onLoad={() => {
            setimageEnd(true);
          }}
          // onError={()=>{
          //   setimageError(true);

          // }}
          fallback={true}
        />
        {imageEnd ?
          (
            <>
              {/* <FastImage
                style={[styles.publish_image, { borderRadius: borderRadius ,backgroundColor:'#EEEEEE'}]}
                resizeMode="cover"
                source={{ uri: item?.imageUrl }}
              /> */}
              <View style={{ paddingTop: pxToDp(28), paddingBottom: pxToDp(22), paddingLeft: pxToDp(20), justifyContent: "space-between" }}>
                <Text style={{ color: '#707A83', fontSize: pxToDp(20) }}>{item?.assetName}</Text>
                <Text style={{ color: '#383838', fontSize: pxToDp(24), marginTop: pxToDp(8), fontWeight: 'bold', width: pxToDp(194) }} numberOfLines={2}>{item?.collectionName}</Text>
                <Text style={{ color: '#707A83', fontSize: pxToDp(20), marginTop: pxToDp(18) }}>价格</Text>
                <Text style={{ color: '#383838', fontSize: pxToDp(24), marginTop: pxToDp(8), fontWeight: 'bold' }}>{item?.salePrice}</Text>
              </View>
            </>
          ) :
          (
            <>
              <Placeholder Animation={ShineOverlay} >
                <PlaceholderMedia style={[styles.publish_image, { borderRadius: borderRadius }]} />
                <View style={{ paddingTop: pxToDp(28), paddingBottom: pxToDp(22), paddingLeft: pxToDp(12), justifyContent: "space-between" }}>
                  <PlaceholderLine style={{ width: pxToDp(50) }} />
                  <PlaceholderLine style={{ marginTop: pxToDp(8), width: pxToDp(194) }} />
                  <PlaceholderLine style={{ marginTop: pxToDp(18), width: pxToDp(194) }} />
                  <PlaceholderLine style={{ marginTop: pxToDp(8), width: pxToDp(194) }} />
                </View>
              </Placeholder>
            </>
          )
        }



      </BaseCard>
    </Ripple>
  )


  const renderPublish = () => (
    <BaseCard style={{ borderRadius: borderRadius }}>
      <FastImage
        style={[styles.publish_image, { borderRadius: borderRadius }]}
        resizeMode="cover"
        source={{ uri: data?.imageUrl }}
      />
      <Text style={{ fontSize: pxToSp(44), color: '#383838', fontWeight: 'bold' }}>{data?.assetName}</Text>
    </BaseCard>
  );

  const renderHot = () => {
    return (
      <Ripple onPress={onTap} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 0, width: pxToDp(280) }]}>
          <View style={{ alignItems: "center" }}>
            <FastImage
              style={[styles.hot_image, { borderRadius: borderRadius }]}
              resizeMode="cover"
              source={{ uri: data?.image_url }}
            />
            <FastImage
              style={[styles.hot_head, ]}
              resizeMode="cover"
              source={{ uri: data?.image_url }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold' }} ellipsizeMode='middle' numberOfLines={1}>{data?.name}</Text>
          </View>
        </BaseCard>
      </Ripple>
    );
  }
  const renderCollectsDouble = () => {
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
        {data?.map((item: any, index: number) => (
          item_one_collections(item, index)
        ))}
      </View>
    );
  }
  const item_one_collections=(item:any, index:number)=>{
    return(
      <Ripple onPress={() => { Navigate.navigate('CollectionDetail', {item:item}) } } rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 0, width: pxToDp(320) }]}>
          <View style={{ alignItems: "center" }}>
            <FastImage
              style={[styles.hot_image_double, { borderRadius: borderRadius }]}
              resizeMode="cover"
              source={{ uri: item?.image_url }}
            />
            <FastImage
              style={[styles.hot_head, ]}
              resizeMode="cover"
              source={{ uri: item?.image_url }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold' ,marginTop:pxToDp(32)}} ellipsizeMode='middle' numberOfLines={1}>{item?.name}</Text>
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold'  ,marginTop:pxToDp(16), marginBottom:pxToDp(20)}} ellipsizeMode='middle' numberOfLines={1}>{item?.created_date}</Text>
          </View>
        </BaseCard>
      </Ripple>
    )
  }


  const renderCollectsDouble_USENftStyle = () => {
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
        {data?.map((item: any, index: number) => (
          item_one_USENftStyle(item, index)
        ))}
      </View>
    );
  }
  const item_one_USENftStyle = (item: any, index: number) => (

    <Ripple onPress={() => pushCard(item)} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} rippleContainerBorderRadius={borderRadius} key={`${index}`}>
      <BaseCard style={[{ borderRadius: borderRadius }, { width: pxToDp(326), paddingHorizontal: pxToDp(8) }]}>
        <FastImage
          style={imageEnd ? [styles.publish_image, { borderRadius: borderRadius, backgroundColor: '#EEEEEE' }] : [{ width: 0, height: 0 }]}
          resizeMode="cover"
          source={{ uri: item?.image_url }}
          onLoad={() => {
            setimageEnd(true);
          }}
          // onError={()=>{
          //   setimageError(true);

          // }}
          fallback={true}
        />
        {imageEnd ?
          (
            <>
              {/* <FastImage
                style={[styles.publish_image, { borderRadius: borderRadius ,backgroundColor:'#EEEEEE'}]}
                resizeMode="cover"
                source={{ uri: item?.imageUrl }}
              /> */}
              <View style={{ paddingTop: pxToDp(28), paddingBottom: pxToDp(22), paddingLeft: pxToDp(20), justifyContent: "space-between" }}>
                <Text style={{ color: '#707A83', fontSize: pxToDp(20) }}>{item?.assetName}</Text>
                <Text style={{ color: '#383838', fontSize: pxToDp(24), marginTop: pxToDp(8), fontWeight: 'bold', width: pxToDp(194) }} numberOfLines={2}>{item?.name}</Text>
                <Text style={{ color: '#707A83', fontSize: pxToDp(20), marginTop: pxToDp(18) }}>价格</Text>
                <Text style={{ color: '#383838', fontSize: pxToDp(24), marginTop: pxToDp(8), fontWeight: 'bold' }}>{item?.opensea_seller_fee_basis_points}</Text>
              </View>
            </>
          ) :
          (
            <>
              <Placeholder Animation={ShineOverlay} >
                <PlaceholderMedia style={[styles.publish_image, { borderRadius: borderRadius }]} />
                <View style={{ paddingTop: pxToDp(28), paddingBottom: pxToDp(22), paddingLeft: pxToDp(12), justifyContent: "space-between" }}>
                  <PlaceholderLine style={{ width: pxToDp(50) }} />
                  <PlaceholderLine style={{ marginTop: pxToDp(8), width: pxToDp(194) }} />
                  <PlaceholderLine style={{ marginTop: pxToDp(18), width: pxToDp(194) }} />
                  <PlaceholderLine style={{ marginTop: pxToDp(8), width: pxToDp(194) }} />
                </View>
              </Placeholder>
            </>
          )
        }



      </BaseCard>
    </Ripple>
  )
  
  return cardStyle == CardStyle.PUBLISH_STYLE ? renderPublish() : (cardStyle == CardStyle.HOTCOLLECTION_STYLE ? renderHot() : (cardStyle==CardStyle.HOTNTF_STYLE?renderHotNtf():(cardStyle==CardStyle.HOTCOLLECTION_DOUBLE_STYLE?renderCollectsDouble():renderCollectsDouble_USENftStyle())))
};
export default BannerCard;
