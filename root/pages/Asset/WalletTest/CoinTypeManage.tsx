import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert, Switch, FlatList } from "react-native";
import Modal from "react-native-modal";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Image } from "react-native-animatable";
import AssetBtnWraps from "@/pageranges/AssetBtnWraps/AssetBtnWraps";
import AssetTopBg from "@/components/AssetTopBg/AssetTopBg";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { walletActions } from "@/action/walletActions";
import PopBtn from "@/components/LoginOutBtn/PopBtn";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Navigate, Storage } from "@/utils/index";
import { connected } from "process";
import { MarketService, OrderService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import GDataList from "@/components/GDataList";
import styles from "./styles";
import storage from './pstorage';

const CoinTypeManage: FunctionComponent = () => {
  const connector = useWalletConnect(); // valid
  const [data, setdata] = useState();
  const nav = useNavigation()
  nav.setOptions(
    {
      title: "币种管理",
      headerTitleAlign: "center",
      headerRight: null
    }
  )
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {

    const m_wallet_addr = await Storage.load(CacheKeys.OURWALLETINFO);
    const m_w_assets = await storage.assets_for_wallet(m_wallet_addr);
    let assets = await storage.assets();
    for (var i = assets.length - 1; i >= 0; i--) {
      assets[i].isIn = m_w_assets.includes(assets[i].address);
    }
    setdata(assets);
  };

  const getItem = (item) => {

    //Function for click on an item

    // Alert.alert('Id : ' + item.id + ' Title : ' + item.title);

  };

  const renderItem = ({ item, index }: any) => {
    return (

      // Flat List Item
      <View

        style={{
          flexDirection: 'row',
          alignItems: 'center',

          height: 40.5,

          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR,
          padding: pxToDp(20)
        }}

      >

        <View

          style={{
            flexDirection: 'row',
            alignItems: 'center',

            height: 40.5,

            width: 200,

          }}

        >
          <Image

            source={{ uri: item.icon }}

            style={{ width: 30, height: 30 }}

          />
          <Text

            style={styles.itemStyle}

            onPress={() => getItem(item)}>

            {item.name}
          </Text>
        </View>

        <Switch

          style={{}}


          value={item.isIn}

          onValueChange={async (value) => {
            // if(value == item.isIn)
            //   return;
            console.log("onValueChange  " + value + " " + item.name);
            if (item.address.length > 20) {
              const m_wallet_addr = await Storage.load(CacheKeys.OURWALLETINFO);
              if (value == false) {
                await storage.del_asset_from_wallet(item.address, m_wallet_addr);
              }
              else {
                const m_wallet_addr = await Storage.load(CacheKeys.OURWALLETINFO);
                await storage.new_asset_to_wallet(item.address, m_wallet_addr);

              }
              getData();
            }






          }}
        />

      </View>
    );
  };

  const ItemSeparatorView = () => {

    return (

      // Flat List Item Separator

      <View

        style={{

          height: 0.5,

          width: '100%',

          backgroundColor: '#C8C8C8'
        }}

      />

    );

  };

  const addCoinType=()=>{

  }
  const renderView = () => {
    return (

    <View style={[styles.container]}>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
        />
        <NtfButton text="添加币种" width={'80%'} heigh={pxToDp(88)} style={{ marginTop: pxToDp(80) ,alignSelf:"center"}} onPress={addCoinType}></NtfButton>
      </View>

      // <GDataList
      //   style={{
      //     width:
      //       '100%'
      //   }}
      //   requestMethod={OrderService.queryCoinType}
      //   requestParams={{ }}
      //   defaultPageSize={10}
      //   isOpenseaStructure={false}
      //   renderItem={renderItem}
      //   ItemSeparatorComponent={() => <View style={{ height: pxToDp(20) }}></View>}
      //   ListEmptyComponent={() => (
      //     <></>
      //   )}
      // />
    )
  };

  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom }]}>
      {renderView()}

    </View>
  );
};

export default CoinTypeManage;
