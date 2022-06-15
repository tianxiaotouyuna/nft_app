import React, { FunctionComponent, useState } from "react";
import { Alert, TouchableHighlight, View } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Ripple from "react-native-material-ripple";
import { Text } from "react-native-paper";
import {UIELEMENTS } from "@/constants/index";
import styles from "@/styles/pages/order/order";
import useInitScreen from "@/hooks/useInitScreen";
import { useDispatch } from "react-redux";
import { walletActions } from "@/action/walletActions";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Market from "../Market/Market";
import NFTDefaultTabBar from "./NFTDefaultTabBar";
import { pxToDp, pxToSp } from "@/utils/system";
import OrderList from "./OrderList/OrderList";
const Order: FunctionComponent = () => {
  useInitScreen({
    navigationOptions: {
      title:'订单',
      headerTitleAlign: "left",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  const [tabsInfo] = useState([
    { name: "我的出价", type: 1 },
    { name: "收到的出价", type: 2 },
    { name: "挂单", type: 3 },
    { name: "成交", type: 4 },
])
  const handleChangeTab=()=>{

  }
const showScrollBar=()=>{
  return(
    <ScrollableTabView
      style={styles.container}
      onChangeTab={handleChangeTab}
      renderTabBar={() => <NFTDefaultTabBar  activeTextColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} inactiveTextColor={'#383838'} textStyle={{fontSize:pxToSp(28)}}/>}
    >
      {tabsInfo?.map((item: any, index: number) => (
                <OrderList key={`${item?.name}_${index}`} tabLabel={ item?.name } type={item?.type} />
            ))}
      </ScrollableTabView>
  )
}
  return (
    showScrollBar()

      
  );
};

export default Order;