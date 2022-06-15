import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Button, Platform, Alert, Image, Pressable, TabBarIOSItem } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ActivityIndicator, Colors, Searchbar, Text } from "react-native-paper";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import styles from "@/styles/pages/market/market";
import useInitScreen from "@/hooks/useInitScreen";
import { pxToDp, pxToSp, tabBarHeight } from "@/utils/system";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MarketService } from "@/services/index";
import GDataList, { WHERELIST } from "@/components/GDataList";
const Market: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "价格从高到低",
      value: "价格从高到低",
      labelStyle: {
        color: UIELEMENTS.DEFAULT_HEADER_COLOR,
        paddingHorizontal: pxToDp(40),
        fontSize: pxToSp(28),
      },
    },
    {
      label: "价格从低到高",
      value: "价格从低到高",
      labelStyle: {
        color: UIELEMENTS.DEFAULT_HEADER_COLOR,
        paddingHorizontal: pxToDp(40),
        fontSize: pxToSp(28),
      },
    },
  ]);


  const [inputValue, setinputValue] = useState("");
  const onChangeSearch = (query: string) => {
    setinputValue(query);
  };

  const connector = useWalletConnect(); // valid

  useInitScreen({
    navigationOptions: {
      title: '市场',
      headerRight: () => (
        <Pressable
          onPress={() => {
            // Navigate.navigate("LoginOut", {});
          }}
        >
          <Image
            style={styles.tab_right}
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
  const renderItem = ({ item, index }: any) => {
    return (
      <BannerCard
        data={item}
        cardStyle={CardStyle.HOTNTF_STYLE}
      ></BannerCard>
    );
  };
  const bottomPadding = useSafeAreaInsets().bottom
  return (
    /* render something */
    <View style={[styles.container, { paddingBottom: 100 + bottomPadding }]}>
      {/* <Text style={{fontSize:40,fontWeight:'bold'}}>测试环境</Text> */}
      <GDataList
        requestMethod={MarketService.getMarketList}
        requestParams={{path:'',params:{include_orders:true}}}
        defaultPageSize={20}
        whereList={WHERELIST.MARKET_LIST}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: pxToDp(20) }}></View>}
        ListEmptyComponent={() => (
          <View style={styles.empty_box}>
            <Text style={styles.empty_text1}>暂无相关数据～</Text>

          </View>
        )}
      />
    </View>
  )
};

export default Market;

{/* <View style={styles.header_wraps}>
        <View style={styles.search_wraps2}>
          <Searchbar
            placeholder="搜索"
            onChangeText={(query) => {
              onChangeSearch(query);
            }}
            onEndEditing={() => {
              Navigate.navigate("Search", {});
            }}
            value={inputValue}
            icon={require("@/resources/home/Search.png")}
            style={styles.search_wraps}
            inputStyle={styles.search_input}
            selectionColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
          />
        </View>
        <View style={Platform.OS === 'ios' ? {zIndex: 100} : {}}>
          <DropDownPicker
            style={{
              borderWidth: 0,
              borderBottomWidth: pxToDp(1),
              borderBottomColor: UIELEMENTS.DEFAULT_SEPARATOR_COLOR,
            }}
            modalProps={{
              animationType: "fade",
            }}
            labelStyle={{
              color: UIELEMENTS.DEFAULT_HEADER_COLOR,
              fontSize: pxToSp(28),
              paddingHorizontal: pxToDp(40),
            }}
            placeholder="排序规则"
            placeholderStyle={{
              paddingHorizontal: pxToDp(40),
              fontSize: pxToSp(28),
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{ borderColor: "white" }}
            modalTitleStyle={{ borderColor: "white" }}
            ArrowUpIconComponent={({ style }) => (
              <Image
                style={styles.arrowStyle}
                source={require("@/resources/home/return_up.png")}
              />
            )}
            ArrowDownIconComponent={({ style }) => (
              <Image
                style={styles.arrowStyle}
                source={require("@/resources/home/return.png")}
              />
            )}
            TickIconComponent={({ style }) => (
              <Image
                style={styles.chooseStyle}
                source={require("@/resources/home/choose.png")}
              />
            )}
          />
      </View>
      </View> */}