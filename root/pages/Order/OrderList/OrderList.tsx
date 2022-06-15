import React, { FunctionComponent, useState } from "react";
import { View, Button, Platform, Alert, ImageStore, Pressable, Image, Text } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/order/order-list";
import { walletActions } from "@/action/walletActions";
import { wallet } from "@/reducers/walletReducer";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import useNavigationOptions from "@/hooks/useNavigationOptions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIELEMENTS } from "@/constants/index";
import GDataList, { WHERELIST } from "@/components/GDataList";
import { OrderService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import OrderCard from "@/components/OrderCard/OrderCard";
import { Navigate } from "@/utils/index";
import Modal from "react-native-modal";
import OrderPop, { OrderPopStyle } from "@/components/OrderPop/OrderPop";
type OrderListProps = {
  type?: number
  [key: string]: any
}

const OrderList: FunctionComponent<OrderListProps> = (props) => {
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
      <OrderCard
        data={item}
        cardStyle={type}
        onTap={ ()=>Navigate.navigate('NtfDetail', { item: item, isMyDetail: (type==1||type==4)?false:true})}
        onCancleOffer={()=>setshowCancleOffer(true)}
        onDownPriceOrder={()=>setshowDownPrice(true)}
        onCancleOrder={()=>setshowCancleOrder(true)}
        ></OrderCard>
    );
  };

  const closeCancleOfferModal=()=>{
    setshowCancleOffer(false)
  }
  const closeCancleOrderModal=()=>{
    setshowCancleOrder(false)
  }
  const closeDownPriceModal=()=>{
    setshowDownPrice(false)
  }
  const renderView = () => {
    return (
      <GDataList
      style={{width:
  '100%'}}
        requestMethod={OrderService.selectOfferList}
        requestParams={{path:'',params:{type:1,accountAddress:'0x71190f09775a2af79c1ce08fc9d3a58352f89155'}}}
        defaultPageSize={10}
        whereList={WHERELIST.ORDER_LIST}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: pxToDp(20) }}></View>}
        ListEmptyComponent={() => (
          emptyView()
        )}
      />
    )
  }
  return (
    <View style={[styles.container, { marginBottom: 100 + useSafeAreaInsets().bottom }, { alignItems: "center", justifyContent: "center" }]}>
        {renderView()}
      <Modal isVisible={showCancleOffer} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <OrderPop cancle_press={closeCancleOfferModal} popStyle={OrderPopStyle.CANCEL_OFFER_STYLE}></OrderPop>
      </Modal>


      <Modal isVisible={showDownPrice} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <OrderPop cancle_press={closeDownPriceModal} popStyle={OrderPopStyle.DOWNPRICE_ORDER_STYLE}></OrderPop>
      </Modal>

      <Modal isVisible={showCancleOrder} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <OrderPop cancle_press={closeCancleOrderModal} popStyle={OrderPopStyle.CANCEL_ORDER_STYLE}></OrderPop>
      </Modal>

      
      {/* {connector.connected ?
        renderView() :
        <View style={{ justifyContent: "center", alignItems: "center" }}>

          <Image
            style={styles.btn_icon}
            source={require("@/resources/nolinkedwallet.png")}
          />

          <NtfButton
            heigh={pxToDp(100)}
            width={pxToDp(400)}
            onPress={login}
            backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
            textColor='white'
            text={"链接钱包"}
            borderRadius={pxToDp(12)}
            style={{ marginTop: pxToDp(160), marginHorizontal: pxToDp(160) }}
          />
        </View>
      } */}
    </View>
  );
};

export default OrderList;

