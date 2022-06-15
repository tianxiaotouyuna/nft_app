import Bottom from "@/pageranges/Asset/Sell/bottom/bottom";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, AppState, View } from "react-native";
import useInitScreen from "@/hooks/useInitScreen";
import styles from "@/styles/pages/market/buy";
import { MarketService } from "@/services/index";
import FastImage from "react-native-fast-image";
import { Text } from "react-native-animatable";
import { pxToDp, pxToSp } from "@/utils/system";
import { useRoute } from "@react-navigation/native";
import SignPop from "@/components/SignPop/SignPop";
import Modal from "react-native-modal";
import ContractInteraction from "@/components/ContractInteraction/ContractInteraction";
import WalletInput from "@/components/WalletInput/WalletInput";
import Authorization from "@/components/Authorization/Authorization";
import ResultToast, { ResultToastStyle } from "@/components/ResultToast/ResultToast";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "@/action/walletActions";
import SellPop, { PopStyle } from "@/components/SellPop/SellPop";
const Sell: FunctionComponent = () => {
  // const [data, setdata] = useState({});
  const dayCounts=['1天','2天','3天','4天','5天','6天','7天']
  const data: any = useRoute().params?.data ?? {};
  const [showSign, setshowSign] = useState(false);
  const [heyue, setheyue] = useState(false);
  const [auth, setauth] = useState(false);
  const [showCurrency, setshowCurrency] = useState(false);
  const [showData, setshowData] = useState(false);
  const [currency, setcurrency] = useState('USDT');
  const [currency_index, setcurrency_index] = useState(0);
  const [dateStr, setdateStr] = useState('1天');
  const [dateIndex, setdateIndex] = useState(0);
  const [showInput, setshowInput] = useState(false);
  const [showResult, setshowResult] = useState(false);
  const [appState, setappState] = useState('active');
  console.log('data======' + JSON.stringify(useRoute().params))
  const wallet = useSelector((state: any) => state);
  useInitScreen({
    navigationOptions: {
      title: '出售',
      headerTitleAlign: "center",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });

  const showAuthPop = () => {
    setauth(true)
  }
  const showSginPop = () => {
    setshowSign(true)
  }
  const showHeyuePop = () => {
    setheyue(true)

  }
  const showInputPop = () => {
    setshowInput(true)

  }

  const showResultToast = () => {
    setshowResult(true)
  }
  const selectCurrencyFinish = (name: string, index: number) => {
    setshowCurrency(false)
    setcurrency(name)
    setcurrency_index(index)
  }
  const selectDateFinish = (name: string, index: number) => {
    setshowData(false)
    setdateStr(name)
    setdateIndex(index)
  }
  const dispatch = useDispatch()
  const closeResultToast = () => {
    setshowResult(false)
    dispatch(walletActions.resetResult(null));
  }
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "row" }}>
        <FastImage
          style={[styles.publish_image]}
          resizeMode="cover"
          source={{ uri: data?.imageThumbnailUrl }}
        />

        <View style={{ paddingVertical: pxToDp(10), paddingHorizontal: pxToDp(18) }}>
          <Text style={{ fontSize: pxToSp(32), color: '#383838' }}>{data?.collectionName}</Text>
          <Text style={{ fontSize: pxToSp(28), color: '#707A83', marginTop: pxToDp(20) }}>暂未定价</Text>
        </View>
      </View>
      <Bottom onPress_1={() => {
        showAuthPop()
      }} onPress_3={() => {
        setshowCurrency(true)
      }} onPress_4={()=>{
        setshowData(true)
      }} currency={currency} day={dateStr}/>



      <Modal isVisible={showData} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
        animationIn='bounceIn'
        animationOut='bounceOut'
      >
        <SellPop cancle_press={() => setshowData(false)}  data={dayCounts} popStyle={PopStyle.Day_STYLE} selectBlock_date={(name: string, index: number) => selectDateFinish(name, index)} selectIndex={dateIndex}></SellPop>
      </Modal>
      {/* animationIn: "bounce" | "flash" | "jello" | "pulse" | "rotate" | "rubberBand" | "shake" | "swing" | "tada" | "wobble" | "bounceIn" | "bounceInDown" | "bounceInUp" | "bounceInLeft" | "bounceInRight" | "bounceOut" | "bounceOutDown" | "bounceOutUp" | "bounceOutLeft" | "bounceOutRight" | "fadeIn" | "fadeInDown" | "fadeInDownBig" | "fadeInUp" | "fadeInUpBig" | "fadeInLeft" | "fadeInLeftBig" | "fadeInRight" | "fadeInRightBig" | "fadeOut" | "fadeOutDown" | "fadeOutDownBig" | "fadeOutUp" | "fadeOutUpBig" | "fadeOutLeft" | "fadeOutLeftBig" | "fadeOutRight" | "fadeOutRightBig" | "flipInX" | "flipInY" | "flipOutX" | "flipOutY" | "lightSpeedIn" | "lightSpeedOut" | "slideInDown" | "slideInUp" | "slideInLeft" | "slideInRight" | "slideOutDown" | "slideOutUp" | "slideOutLeft" | "slideOutRight" | "zoomIn" | "zoomInDown" | "zoomInUp" | "zoomInLeft" | "zoomInRight" | "zoomOut" | "zoomOutDown" | "zoomOutUp" | "zoomOutLeft" | "zoomOutRight" | animatable.CustomAnimation<import("react-native").TextStyle & ViewStyle & import("react-native").ImageStyle>; */}

      <Modal isVisible={showCurrency} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <SellPop cancle_press={() => setshowCurrency(false)} sure_press={() => { }} data={data} popStyle={PopStyle.CURRENCY_STYLE} selectBlock={(name: string, index: number) => selectCurrencyFinish(name, index)} selectIndex={currency_index}></SellPop>
      </Modal>

      <Modal isVisible={auth} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={600}
      >
        <SellPop cancle_press={() => setauth(false)} sure_press={() => { }} data={data}></SellPop>
      </Modal>

    </View>
  );
};

export default Sell;

