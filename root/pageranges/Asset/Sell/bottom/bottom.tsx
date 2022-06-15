import React, { FunctionComponent, LegacyRef, ReactNode, Ref, useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./style";
import { pxToDp, pxToSp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
type AssetBtnWrapsProps = {
    onPress_1?: () => void;
    onPress_2?: () => void;
    onPress_3?: () => void;//选择币种
    onPress_4?: () => void;//选择天数
    bottom?: number;
    currency?:string;
    day?:string
};
const Bottom: FunctionComponent<AssetBtnWrapsProps> = (props) => {
    const { onPress_1,  onPress_3,onPress_4 ,currency,day} = props;
    return (
        <View style={styles.container} >

            <View style={styles.sub_container}>
            <Pressable  onPress={onPress_4}  style={{ justifyContent: "space-between", paddingVertical: pxToDp(46) }}>
                    <Text style={{ color: "#707A83", fontSize: pxToDp(28) }}>
                        出价过期时间
                    </Text>
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>

                        <Text style={{ color: "#383838", fontSize: pxToDp(32), fontWeight: 'bold', marginTop: pxToDp(10) }}>
                            {day}
                        </Text>
                        <Image style={{ width: pxToDp(24), height: pxToDp(24) }} source={require('@/resources/return_333.png')} />
                    </View>
                </Pressable>

                <View
                    style={{
                        backgroundColor: "#F0F0F0",
                        height: pxToDp(2),
                        width: "100%",
                    }}
                />

                <View style={{ justifyContent: "space-between", paddingVertical: pxToDp(46) }}>
                    <Text style={{ color: "#707A83", fontSize: pxToDp(28) }}>
                        设置价格
                    </Text>
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <TextInput style={{width:pxToDp(400)}} placeholder='请输入价格' keyboardType='number-pad'>

                        </TextInput>
                   
                        <Pressable onPress={onPress_3} style={{ alignItems: "center", flexDirection: "row", justifyContent: 'center'}}>

                            <Text style={{ color: "#383838", fontSize: pxToDp(32), fontWeight: 'bold' }}>
                                {currency}
                            </Text>
                            <Image style={{ width: pxToDp(24), height: pxToDp(24),marginLeft:pxToDp(16) }} source={require('@/resources/return_333.png')} />
                        </Pressable>
                    </View>
                </View>


                <View
                    style={{
                        backgroundColor: "#F0F0F0",
                        height: pxToDp(2),
                        width: "100%",
                    }}
                />
                <View style={{ justifyContent: "space-between", paddingVertical: pxToDp(46) }}>

                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(28) }}>
                            ≈ $0
                        </Text>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(28), marginTop: pxToDp(10) }}>
                            WETH余额：0
                        </Text>
                    </View>
                </View>

                <View style={{ width: '100%', backgroundColor: '#FFF4CA', borderRadius: pxToDp(24), padding: pxToDp(32) }}>
                    <Text style={{ fontSize: pxToSp(28), color: '#383838' }}>费用说明</Text>
                    <View style={{ flexDirection: "row", marginTop: pxToDp(20) }}>
                        <Text style={{ fontSize: pxToSp(28), color: '#707A83' }}>平台服务费</Text>
                        <Text style={{ fontSize: pxToSp(28), color: '#707A83' }}>平台服务费</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: pxToDp(20) }}>
                        <Text style={{ fontSize: pxToSp(28), color: '#707A83' }}>作者版税</Text>
                        <Text style={{ fontSize: pxToSp(28), color: '#707A83' }}>平台服务费</Text>

                    </View>
                </View>
            </View>

            <NtfButton
                text="出售"
                width='100%'
                heigh={pxToDp(84)}
                textColor="white"
                borderRadius={pxToDp(12)}
                backgroundColor="#3352DB"
                style={{ position: "absolute", bottom: useSafeAreaInsets().bottom + pxToDp(50) }}
                borderColor="#3352DB"
                onPress={onPress_1}
            >
                {" "}
            </NtfButton>
        </View>
    );
};

export default Bottom;
