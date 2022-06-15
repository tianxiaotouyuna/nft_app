import React, { FunctionComponent, useState } from "react";
import { View, Button, Platform, Alert, ImageStore, Pressable } from "react-native";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/asset/chain_wallet/creact_wallet";
import { walletActions } from "@/action/walletActions";
import { wallet } from "@/reducers/walletReducer";
import NtfButton from "@/components/NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
import useNavigationOptions from "@/hooks/useNavigationOptions";
import { Image, Text } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import Center from "@/pageranges/markdetail/center/Center";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIELEMENTS } from "@/constants/index";
import EyeBtn from "@/components/EyeBtn/EyeBtn";
import "@ethersproject/shims"
import { ethers, providers } from "ethers";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Navigate } from "@/utils/index";
const CreactCWallet: FunctionComponent = () => {

    const [pwd1Secu, setpwd1Secu] = useState(true);
    const [pwd2Secu, setpwd2Secu] = useState(true);
    const [name, setname] = useState('');
    const [pwd1, setpwd1] = useState('');
    const [pwd2, setpwd2] = useState('');
    const [spinner, setspinner] = useState(false);
    useNavigationOptions(
        {
            headerTitle: '创建钱包',
            headerTitleAlign: 'center'
        }
    )
    const creatWalletClick = async () => {
        setspinner(true)
        if (name.length == 0) {
          Alert.alert(JSON.stringify('请输入钱包名称'))
          return
        }
       else if (pwd1.length == 0) {
          Alert.alert(JSON.stringify('请输入密码'))
    
          return
        }
        else if (pwd2.length == 0) {
          Alert.alert(JSON.stringify('请确认密码'))
    
          return
        }
        const entropy = ethers.utils.randomBytes(16);//生成随机字符串

        const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词
    
        const e_wallet = ethers.Wallet.fromMnemonic(mnemonicTemp);//根据助记词生成钱包
        console.log('asdasd====' + JSON.stringify(mnemonicTemp))
        Navigate.navigate('MnemonicPage',{mnemonic:mnemonicTemp.split(' ')})
        // Alert.alert(JSON.stringify('钱包创建成功，'))
      }
    return (
        <View style={[styles.container]}>
            <Spinner
          visible={spinner}
          cancelable={false}
          textContent={'Loading...'}
          textStyle={{color:'black'}}
          indicatorStyle={{zIndex:1000,backgroundColor:'red'}}
          animation={'fade'}
        />
            <Text>您將會擁有錢包下的資產，比如ETH、BT</Text>
            <View style={{ marginTop: pxToDp(70) }}>
                <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', height: pxToDp(88) }}>
                    <Image
                        style={styles.btn_icon}
                        source={require("@/resources/wallet.png")}
                    />
                    <TextInput value={name} onChangeText={(text:string)=>{setname(text)}} placeholder="请输入钱包名称" style={{ marginLeft: pxToDp(38) }}></TextInput>
                </View>
                <View
                    style={{
                        backgroundColor: "#F0F0F0",
                        height: pxToDp(2),
                        width: "100%",
                    }}
                />

            </View>

            <View >
                <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', height: pxToDp(88), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Image
                            style={styles.btn_icon}
                            source={require("@/resources/password.png")}
                        />
                        <TextInput value={pwd1} secureTextEntry={pwd1Secu} onChangeText={(text:string)=>{setpwd1(text)}}  placeholder="請輸入密碼（8-20位）" style={{ marginLeft: pxToDp(38) }}></TextInput>
                    </View>
                    <EyeBtn onPress={(isOpen:boolean) => {
                        setpwd1Secu(isOpen)
                    }} />
                </View>
                <View
                    style={{
                        backgroundColor: "#F0F0F0",
                        height: pxToDp(2),
                        width: "100%",
                    }}
                />

            </View>


            <View >
                <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', height: pxToDp(88), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Image
                            style={styles.btn_icon}
                            source={require("@/resources/password.png")}
                        />
                        <TextInput value={pwd2} onChangeText={(text:string)=>{setpwd2(text)}} secureTextEntry={pwd2Secu} placeholder="請確認密碼" style={{ marginLeft: pxToDp(38) }}></TextInput>
                    </View>

                    <EyeBtn onPress={(isOpen:boolean) => {
                        setpwd2Secu(isOpen)
                    }} />
                </View>
                <View
                    style={{
                        backgroundColor: "#F0F0F0",
                        height: pxToDp(2),
                        width: "100%",
                    }}
                />

            </View>
            <NtfButton
                width={'100%'}
                heigh={pxToDp(100)}
                onPress={()=>creatWalletClick()}
                text={"同意并创建"}
                borderRadius={pxToDp(12)}
                textColor={'white'}
                backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
                style={{ bottom: pxToDp((40 + useSafeAreaInsets().bottom) * 2), position: "absolute", alignSelf: 'center' }}
            />
        </View>
    );
};

export default CreactCWallet;

