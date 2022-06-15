import styles from "./styles";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import FastImage from "react-native-fast-image";
import BaseCard from "../BaseCard/BaseCard";
import { pxToDp, pxToSp } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from "rn-placeholder";
import NtfButton from "../NtfButton/NtfButton";
import Order from "@/pages/Order/Order";
export enum OrderCardStyle {
  MY_OFFER_STYLE = 1, //我的出价
  RECEIVE_OFFER_STYLE = 2, //我的出价
  PADENDINE_ORDER_STYLE = 3, //我的出价
  COLSED_ORDER_STYLE = 4, //我的出价

}
type BannerCardProps = {
  style?: StyleProp<ViewStyle>;
  data: any;
  cardStyle?: OrderCardStyle;
  onTap?: () => void;
  onCancleOffer?: () => void;//关闭type1里的，取消弹框
  onAcceptOffer?: () => void;//关闭type2里的，接受弹框
  onDownPriceOrder?: () => void;//关闭type3里的，降价弹框
  onCancleOrder?: () => void;//关闭type2里的，下架弹框
  isFromMy?: boolean;
  borderRadius?: number;
};
const OrderCard: FunctionComponent<BannerCardProps> = (props) => {
  const { data, style, cardStyle, onTap, borderRadius = pxToDp(10), isFromMy = false ,onCancleOffer,onCancleOrder,onDownPriceOrder,onAcceptOffer} = props;

  const renderMyOffer = () => {
    return (
      <Ripple pointerEvents={'box-none'} onPress={onTap} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} rippleContainerBorderRadius={pxToDp(28)}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 20, width: '100%', borderRadius: pxToDp(28) }]}>
          <View style={{ alignItems: "center", flexDirection: 'row' }}>
            <FastImage
              style={[styles.orderlist_image, { borderRadius: borderRadius }]}
              resizeMode="cover"
              source={{ uri: data?.imageUrl }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginLeft: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetName}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              marginTop: pxToDp(20),
              height: pxToDp(2),
              width: "100%",
            }}
          />
          <View style={{ alignItems: "center", flexDirection: 'row', marginTop: pxToDp(20), justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>出价</Text>
              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.offerAmount}</Text>

            </View>

            <View style={{ marginLeft: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>失效时间</Text>

              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.createDate}</Text>
            </View>


            <NtfButton  text="取消" onPress={onCancleOffer} backgroundColor="#EEF1FF" width={pxToDp(120)} heigh={pxToDp(52)} style={{ borderWidth: 0 }} textColor='#383838'></NtfButton>
          </View>

        </BaseCard>
      </Ripple>
    );
  }
  const renderPadendingOrder = () => {
    return (
      <Ripple pointerEvents={'box-none'} onPress={onTap} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} rippleContainerBorderRadius={pxToDp(28)}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 20, width: '100%', borderRadius: pxToDp(28) }]}>
          <View style={{ alignItems: "center", flexDirection: 'row' }}>
            <FastImage
              style={[styles.orderlist_image, { borderRadius: borderRadius }]}
              resizeMode="cover"
              source={{ uri: data?.imageUrl }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginLeft: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetName}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              marginTop: pxToDp(20),
              height: pxToDp(2),
              width: "100%",
            }}
          />
          <View style={{ alignItems: "center", flexDirection: 'row', marginTop: pxToDp(20), justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>出价</Text>
              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.bidAmount}</Text>

            </View>

            <View style={{ marginLeft: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>失效时间</Text>

              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.closingDate}</Text>
            </View>
            <NtfButton text="取消" backgroundColor="#EEF1FF" width={pxToDp(120)} heigh={pxToDp(52)} style={{ borderWidth: 0, opacity: 0 }} textColor='#383838'></NtfButton>

          </View>
          <View>
            <View style={{ alignItems: "center", flexDirection: 'row-reverse', marginTop: pxToDp(20) }}>
              <NtfButton onPress={onCancleOrder} text="下架" width={pxToDp(120)} heigh={pxToDp(52)} borderRadius={pxToDp(12)}></NtfButton>
              <NtfButton onPress={onDownPriceOrder} text="降价" width={pxToDp(120)} heigh={pxToDp(52)} style={{ marginRight: pxToDp(36) }} borderRadius={pxToDp(12)}></NtfButton>
            </View>

          </View>
        </BaseCard>
      </Ripple>
    );
  }


  const renderReceiveOffer = () => {
    return (
      <Ripple pointerEvents={'box-none'} onPress={onTap} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} rippleContainerBorderRadius={pxToDp(28)}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 20, width: '100%', borderRadius: pxToDp(28) }]}>
          <View style={{ alignItems: "center", flexDirection: 'row' }}>
            <FastImage
              style={[styles.orderlist_image, { borderRadius: borderRadius }]}
              resizeMode="cover"
              source={{ uri: data?.imageUrl }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginLeft: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetName}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              marginTop: pxToDp(20),
              height: pxToDp(2),
              width: "100%",
            }}
          />
          <View style={{ alignItems: "center", flexDirection: 'row', marginTop: pxToDp(20), justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>出价</Text>
              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.bidAmount}</Text>

            </View>

            <View style={{ marginLeft: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>失效时间</Text>

              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.closingDate}</Text>
            </View>

            <View style={{ marginLeft: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>地址</Text>

              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(160) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetAddress}</Text>
            </View>
          </View>
          <View>
            <View style={{ alignItems: "center", flexDirection: 'row-reverse', marginTop: pxToDp(20) }}>
              <NtfButton onPress={onCancleOrder} text="接受" width={pxToDp(160)} heigh={pxToDp(64)} borderRadius={pxToDp(12)} textColor={'white'} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} style={{ borderWidth: 0 }}></NtfButton>
            </View>

          </View>
        </BaseCard>
      </Ripple>
    );
  }

  const renderClosed = () => {
    return (
      <Ripple onPress={onTap} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} rippleContainerBorderRadius={pxToDp(28)}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 20, width: '100%', borderRadius: pxToDp(28) }]}>
          <View style={{ alignItems: "center", flexDirection: 'row' }}>
            <FastImage
              style={[styles.orderlist_image, { borderRadius: borderRadius }]}
              resizeMode="cover"
              source={{ uri: data?.imageUrl }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginLeft: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetName}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              marginTop: pxToDp(20),
              height: pxToDp(2),
              width: "100%",
            }}
          />
          <View style={{ alignItems: "center", flexDirection: 'row', marginTop: pxToDp(20), justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>购买时间</Text>
              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.createdDate}</Text>

            </View>

            <View style={{ marginLeft: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>从</Text>

              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(200) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetAddress}</Text>
            </View>

            <View style={{ marginLeft: pxToDp(20), opacity: 0 }}>
              <Text style={{ fontSize: pxToSp(24), color: '#707A83' }} ellipsizeMode='middle' numberOfLines={1}>地址</Text>

              <Text style={{ fontSize: pxToSp(24), color: '#383838', fontWeight: 'bold', marginTop: pxToDp(20), width: pxToDp(160) }} ellipsizeMode='middle' numberOfLines={1}>{data?.assetAddress}</Text>
            </View>
          </View>
          <View>
            <View style={{ alignItems: "center", flexDirection: 'row-reverse', marginTop: pxToDp(20) }}>
              <NtfButton text="查看" width={pxToDp(160)} heigh={pxToDp(64)} borderRadius={pxToDp(12)} textColor={'white'} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} style={{ borderWidth: 0 }}></NtfButton>
            </View>

          </View>
        </BaseCard>
      </Ripple>
    );
  }
  return cardStyle == OrderCardStyle.MY_OFFER_STYLE ? renderMyOffer() : (cardStyle == OrderCardStyle.RECEIVE_OFFER_STYLE ? renderReceiveOffer() : (cardStyle == OrderCardStyle.PADENDINE_ORDER_STYLE ? renderPadendingOrder() : renderClosed()))
};
export default OrderCard;
