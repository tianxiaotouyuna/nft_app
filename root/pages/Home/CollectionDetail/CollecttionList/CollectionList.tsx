import React, { FunctionComponent, useState } from "react";
import { View, Button, Platform, Alert, ImageStore, Pressable, Image, Text } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "@/action/walletActions";
import { wallet } from "@/reducers/walletReducer";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import useNavigationOptions from "@/hooks/useNavigationOptions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIELEMENTS } from "@/constants/index";
import GDataList, { WHERELIST } from "@/components/GDataList";
import { HomeService, OrderService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import OrderCard from "@/components/OrderCard/OrderCard";
import { Navigate } from "@/utils/index";
import Modal from "react-native-modal";
import OrderPop, { OrderPopStyle } from "@/components/OrderPop/OrderPop";
import styles from "./styles";
type OrderListProps = {
  type?: number
  [key: string]: any
}

const CollectionList: FunctionComponent<OrderListProps> = (props) => {
  const dispatch = useDispatch();
  const connector = useWalletConnect(); // valid
  const [showCancleOffer, setshowCancleOffer] = useState(false);
  const [showCancleOrder, setshowCancleOrder] = useState(false);
  const [showDownPrice, setshowDownPrice] = useState(false);
  const [showAccept, setshowAccept] = useState(false);
  const {type}=props;
  const login = () => {
    dispatch(walletActions.connect(connector));
  };

  const emptyView = () => {
    return (
      <View style={{  flex: 1,justifyContent:"center" }}>
        <View style={{alignItems: "center"}}>
          <Image
            style={styles.btn_icon}
            source={require("@/resources/nolinkedwallet.png")}
          />
          <Text style={styles.btn_text}>您还没有相应订单</Text>
        </View>
      </View>
    )
  }
  const renderItem = ({ item, index }: any) => {
    return (
      <BannerCard
        data={item}
        cardStyle={CardStyle.HOTCOLLECTION_DOUBLE_USENTF_STYLE}
      ></BannerCard>
      
    );
  };
  const renderList = () => {
    return (
      <GDataList
      style={{paddingHorizontal:pxToDp(30)}}
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
  return (
    <View style={[styles.container ]}>
        {renderList()}
    </View>
  );
};

export default CollectionList;

