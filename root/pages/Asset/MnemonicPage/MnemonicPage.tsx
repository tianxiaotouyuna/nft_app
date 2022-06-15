import React, { FunctionComponent, useState } from "react";
import { View, Button, Platform, Alert, ImageStore, Pressable } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/asset/chain_wallet/mnemonic";
import { walletActions } from "@/action/walletActions";
import { wallet } from "@/reducers/walletReducer";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import useNavigationOptions from "@/hooks/useNavigationOptions";
import { Image, Text } from "react-native-animatable";
import { UIELEMENTS } from "@/constants/";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Navigate } from "@/utils/";
import { useRoute } from "@react-navigation/native";
const MnemonicPage: FunctionComponent = () => {
  const mnemonic: any = useRoute().params?.mnemonic ?? {};
  
  useNavigationOptions(
    {
      headerTitle:'備份提示',
      headerTitleAlign: 'center'
    }
  )
    const renderStep1=()=>{
      return (
        <View>
        <View style={{flexDirection:'row',alignItems:"center"}}>
             <Image
                        style={styles.btn_icon}
                        source={require("@/resources/提示.png")}
                    />
          <Text style={styles.tips_text}>获得助記詞等于拥有錢包資產所有权</Text>
        </View>
        <View style={styles.tips_sepector}></View>

        <View style={{flexDirection:'row',alignItems:"center"}}>
        <Text style={styles.content_text}>1.助記詞由12个单词组成，请</Text>
        <Text style={styles.content_text_onlight}>抄写并妥善保管。</Text>
          
        </View>
        <Text style={[styles.content_text,{marginTop:pxToDp(30)}]}>2.助記詞丢失，无法找回，请务必备份记词</Text>
        </View>

      )
    }
    const goNext=()=>{
      Navigate.navigate('MnemonicPage2',{mnemonic:mnemonic})

    }
  return (
    <View style={styles.container}>
     {renderStep1()}
     <NtfButton
                width={'100%'}
                heigh={pxToDp(100)}
                onPress={()=>goNext()}
                text={"立即備份"}
                borderRadius={pxToDp(12)}
                textColor={'white'}
                backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
                style={{ bottom: pxToDp((40 + useSafeAreaInsets().bottom) * 2), position: "absolute", alignSelf: 'center' }}
            />
    </View>
  );
};

export default MnemonicPage;

