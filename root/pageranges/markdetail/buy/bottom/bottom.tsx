import React, { FunctionComponent, LegacyRef, ReactNode, Ref, useState } from "react";
import { Text, View } from "react-native";
import styles from "./style";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type AssetBtnWrapsProps = {
    onPress_1?: () => void;
    bottom?: number;
    data?:any;
    balance?:string;
    chainName?:string
};
const Bottom: FunctionComponent<AssetBtnWrapsProps> = (props) => {
  const { onPress_1,data ,balance,chainName} = props;
  console.log('asdasd123'+JSON.stringify(data))
  
  return (
        <View style={styles.container} >

            <View style={styles.sub_container}>
                <View style={{ flexDirection: "row" , justifyContent: "space-between",paddingVertical:pxToDp(46)}}>
                    <Text style={{ color: "#383838", fontSize: pxToDp(28) }}>
                        价格
                    </Text>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#383838", fontSize: pxToDp(28), fontWeight: 'bold' }}>0.235</Text>
                        {/* <Text style={{ color: "#707A83", fontSize: pxToDp(24), marginTop: pxToDp(10) }}>123</Text> */}
                        {/* <Text style={{ color: "#707A83", fontSize: pxToDp(24), marginTop: pxToDp(10) }}>123</Text> */}
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: "#F0F0F0",
                        height: pxToDp(2),
                        width: "100%",
                    }}
                />

                <View style={{ flexDirection: "row" , justifyContent: "space-between",paddingVertical:pxToDp(46)}}>
                    <Text style={{ color: "#383838", fontSize: pxToDp(28) }}>
                    钱包
                    </Text>
                    <View style={{ alignItems:  'flex-end'}}>
                        
                        <Text style={{ color: "#383838", fontSize: pxToDp(28), fontWeight: 'bold' }}>{chainName||'未知'}</Text>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24), marginTop: pxToDp(10) }}>余额 ：{balance||0}</Text>
                    </View>
                </View>

            </View>

            <NtfButton
                text="确定"
                width='100%'
                heigh={pxToDp(84)}
                textColor="white"
                borderRadius={pxToDp(12)}
                backgroundColor="#3352DB"
                style={{  position: "absolute", bottom: useSafeAreaInsets().bottom+pxToDp(50) }}
                borderColor="#3352DB"
                onPress={onPress_1}
            >
                {" "}
            </NtfButton>
        </View>
    );
};

export default Bottom;
