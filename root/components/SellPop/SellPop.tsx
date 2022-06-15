import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import { Navigate, Storage } from "@/utils/index";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp } from "@/utils/system";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch } from "react-redux";
import { walletActions } from "@/action/walletActions";
import StepIndicator from 'react-native-step-indicator';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Buy from "@/pages/Market/Buy/Buy";
export enum PopStyle {
  SELL_STYLE = 1, //退出登录
  TRANSFER_STYLE = 2, //退出登录
  CURRENCY_STYLE = 3, //退出登录
  Day_STYLE = 4, //退出登录
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  popStyle?: PopStyle;
  sure_press?: () => void;
  cancle_press?: () => void;
  selectBlock?: (name: string, index: number) => void;
  data?: any;
  selectIndex?: number;
  selectBlock_date?: (name: string, index: number) => void;
};

const SellPop: FunctionComponent<PopProps> = (props) => {
  const { style,  popStyle = 1, cancle_press, selectBlock, selectIndex,data,selectBlock_date } = props;
  const connector = useWalletConnect(); // valid
  const [wallet, setwallet] = useState();
  const dispatch = useDispatch();
  const labels = ["Cart", "Delivery Address"];
  const stepIndicatorStyles = {
    stepIndicatorSize: pxToDp(40),
    currentStepIndicatorSize: pxToDp(40),
    separatorStrokeWidth: pxToDp(1),
    currentStepStrokeWidth: pxToDp(1),
    stepStrokeCurrentColor: '#AAAAAA',
    separatorFinishedColor: '#AAAAAA',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE,
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#AAAAAA',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#AAAAAA',
  };

  useEffect(() => {
    get_storageInfo();
  }, [])
  const get_storageInfo = async () => {
    let info = await Storage.load(CacheKeys.WALLETINFO);
    setwallet(info)
    console.log('info==========' + JSON.stringify(info))
    console.log('data==========' + JSON.stringify(data))
  }
  const onApprove = () => {
    const param = {
      "chainId": wallet?.chainId,
      "accounts": wallet?.accounts,//20字节，发送方地址
    }
    console.log('param123==========' + JSON.stringify(param))

  dispatch(walletActions.approve(connector, param));

  }
  const onSell = () => {
    const param = {
      "chainId": wallet?.chainId,
      "accounts": wallet?.accounts,//20字节，发送方地址
    }
    console.log('param123==========' + JSON.stringify(param))

  dispatch(walletActions.approve(connector, param));

  }
  const currentPosition=connector.connected==true?2:1

  const renderPopView_sell = () => (

    <View style={[styles.modalContent, style]}>
      <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center" }}>

        <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>确认出售</Text>
        <Pressable style={[styles.arrow,{width:pxToDp(88),height:pxToDp(88),justifyContent:"center"}]} onPress={cancle_press}>
          <Image
            style={styles.arrow}
            source={require("@/resources/closure.png")}
          />
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", paddingVertical: pxToDp(36), width: '100%' }}>
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
      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={2}
          direction="vertical"
          labels={labels.map((item) => item)}
          currentPosition={currentPosition}
          renderLabel={({ position, stepStatus, label, currentPosition2 }) => {
            return (
              position == 1 ? <Text style={{
                fontSize: pxToSp(24), color: '#383838', textAlign: 'left', position: 'absolute', width:
                  '100%'
              }}>确认出售</Text>
                :
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: pxToSp(32), color: '#383838' }}>NFT授权</Text>
                  <Text style={{ fontSize: pxToSp(24), color: '#383838', marginTop: pxToDp(10) }}>第一次上架时，您需要对该NFT进行一次授</Text>
                </View>

            )
          }}
        />
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: pxToDp(40) }}>
        <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }}>
          <NtfButton text={currentPosition==1?"授权":'出售'} width='100%' heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={currentPosition==1?onApprove:onSell} loadingUse={true}>
            {" "}
          </NtfButton>
        </View>
      </View>

    </View>
  )

  const renderPopView_transfer = () => (

    <View style={[styles.modalContent, style]}>
      <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>转移商品</Text>
        <Pressable style={styles.arrow} onPress={cancle_press}>
          <Image
            style={styles.arrow}
            source={require("@/resources/closure.png")}
          />
        </Pressable>
      </View>
      <View style={{ marginTop: pxToDp(36), width: '100%', height: pxToDp(92), borderColor: 'rgba(56,56,56,0.5)', borderRadius: pxToDp(14), borderWidth: pxToDp(1) }}>
        <TextInput placeholder="输入地址" style={{ marginLeft: pxToDp(32), width: '100%', height: pxToDp(88) }}></TextInput>
      </View>

      <Text style={{ fontSize: pxToDp(28), color: 'rgba(56,56,56,0.5)', marginTop: pxToDp(16) }}>资产如果转入错误的地址无法追回，请谨慎。</Text>
      <NtfButton style={{ marginTop: pxToDp(40) }} text="确定" width='100%' heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={onApprove} loadingUse={true}>
        {" "}
      </NtfButton>
    </View>

  )

  const selectCurrency = (name: string, index: number) => {
    selectBlock(name, index)
  }
  const selectDate = (name: string, index: number) => {
    selectBlock_date(name, index)
  }
  const renderPopView_currency = () => (

    <View style={[styles.modalContent, style, { paddingBottom: pxToDp(300) }]}>
      <View style={{ flexDirection: "row", width: '100%' }}>
        <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>选择币种</Text>
        <Pressable style={styles.arrow} onPress={cancle_press}>
          <Image
            style={styles.arrow}
            source={require("@/resources/closure.png")}
          />
        </Pressable>
      </View>

      <Pressable style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingVertical: pxToDp(20) }} onPress={() => selectCurrency('USDT', 0)}>
        <Image style={styles.image_icon}
          source={require("@/resources/USDT.png")}
        />
        <View>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>USDT</Text>
          <Text style={{ fontSize: pxToSp(24), color: '#383838', marginLeft: pxToDp(10) }}>0.00</Text>
        </View>
        {selectIndex == 0 ? <Image
          style={styles.arrow2}
          source={require("@/resources/choose.png")}
        /> : null}
      </Pressable>

      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />

      <Pressable style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingVertical: pxToDp(20) }} onPress={() => selectCurrency('USDC', 1)}>
        <Image style={styles.image_icon}
          source={require("@/resources/USDC.png")}
        />
        <View>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>USDC</Text>
          <Text style={{ fontSize: pxToSp(24), color: '#383838', marginLeft: pxToDp(10) }}>0.00</Text>
        </View>
        {selectIndex == 1 ? <Image
          style={styles.arrow2}
          source={require("@/resources/choose.png")}
        /> : null}
      </Pressable>

      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />

      <Pressable style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingVertical: pxToDp(20) }} onPress={() => selectCurrency('BUSD', 2)}>
        <Image style={styles.image_icon}
          source={require("@/resources/BUSD.png")}
        />
        <View>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>BUSD</Text>
          <Text style={{ fontSize: pxToSp(24), color: '#383838', marginLeft: pxToDp(10) }}>0.00</Text>
        </View>
        {selectIndex == 2 ? <Image
          style={styles.arrow2}
          source={require("@/resources/choose.png")}
        /> : null}
      </Pressable>

      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />

      <Pressable style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingVertical: pxToDp(20) }} onPress={() => selectCurrency('WBNB', 3)}>
        <Image style={styles.image_icon}
          source={require("@/resources/WBNB.png")}
        />
        <View>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>WBNB</Text>
          <Text style={{ fontSize: pxToSp(24), color: '#383838', marginLeft: pxToDp(10) }}>0.00</Text>
        </View>

        {selectIndex == 3 ? <Image
          style={styles.arrow2}
          source={require("@/resources/choose.png")}
        /> : null}
      </Pressable>
    </View>

  )

  const renderPopView_data = () => {

    return (

      <ScrollView style={[styles.modalContent_scroll, style, ]}>
        <View style={{ flexDirection: "row", width: '100%',alignItems:"center" }}>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>选择天数</Text>
          <Pressable style={styles.arrow} onPress={cancle_press}>
            <Image
              style={styles.arrow}
              source={require("@/resources/closure.png")}
            />
          </Pressable>
        </View>
        {data?.map((item:any, index:number) => (
          <>
        <Pressable style={{ flexDirection: "row", width: '100%', alignItems: "center", paddingVertical: pxToDp(20)}} onPress={() => selectDate(item, index)} key={`${index}`}>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>{item}</Text>
          {index == selectIndex ? <Image
            style={styles.arrow2}
            source={require("@/resources/choose.png")}
          /> : null}
        </Pressable>
        <View
          style={{
            backgroundColor: "#F0F0F0",
            height: pxToDp(2),
            width: "100%",
          }}
        />
          </>
         ))}


      </ScrollView>

    )
  }

  return (
    popStyle == PopStyle.SELL_STYLE ? renderPopView_sell() : (popStyle == PopStyle.TRANSFER_STYLE ? renderPopView_transfer() : (popStyle == PopStyle.CURRENCY_STYLE ? renderPopView_currency() : renderPopView_data()))
  );
};

export default SellPop;
