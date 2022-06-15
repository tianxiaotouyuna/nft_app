import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert, Switch, FlatList, TextInput } from "react-native";
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
import styles from "@/styles/pages/asset/asset";

const CenterWallet: FunctionComponent = () => {
  const connector = useWalletConnect(); // valid
  const [data, setdata] = useState();
  const [tel, settel] = useState('');
  const [vertery, setvertery] = useState('');
  const nav = useNavigation()
  nav.setOptions(
    {
      title: "创建中心钱包",
      headerTitleAlign: "left",
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

  const onSure = () => {
    if(tel.length<11){Alert.alert('请输入正确手机号');return}
    if(vertery.length==0){Alert.alert('请输入验证码'); return}
  }
  const renderView = () => {
    return (

      <View style={[styles.container]}>
        <Text style={{ color: '#333333', fontSize: pxToDp(28) }}>手机验证注册钱包，若已注册则自动登录。</Text>
        <Text style={{ color: '#333333', fontSize: pxToDp(28) ,marginTop:pxToDp(56)}}>手机号码</Text>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '100%', height: pxToDp(80), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <View style={{ backgroundColor: '#D8D8D8', width: pxToDp(140), height: '100%', borderTopLeftRadius: pxToDp(16), borderBottomLeftRadius: pxToDp(16), alignItems: "center", justifyContent: "center" }}>
            <Text>+86</Text>
          </View>
          <TextInput placeholder="请输入手机号码" onChangeText={text => settel(text)} style={{ width: '100%', height: '100%', marginLeft: pxToDp(10) }}
            value={tel}></TextInput>
        </View>
        <Text style={{ color: '#333333', fontSize: pxToDp(28),marginTop:pxToDp(74) }}>验证码</Text>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems:"center",justifyContent:"space-between",width: '100%', height: pxToDp(80), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <TextInput placeholder="请输入" onChangeText={text => setvertery(text)} style={{ width: '70%', height: '100%', marginLeft: pxToDp(10) }}
            value={vertery}></TextInput>
            <Pressable><Text style={{color:'#3352DB'}}>发送验证码</Text></Pressable>
        </View>

        <NtfButton backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} borderRadius={pxToDp(12)} textColor='white' text="确定" width={'100%'} heigh={pxToDp(88)} style={{ marginTop: pxToDp(80), alignSelf: "center" }} onPress={onSure}></NtfButton>
      </View>

    )
  };

  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom }]}>
      {renderView()}
    </View>
  );
};

export default CenterWallet;
