import React, { FunctionComponent, useState } from "react";
import styles from "./styles";
import { View, StyleProp, ViewStyle, Pressable, Text } from 'react-native'
import { Button } from "react-native-paper";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import BaseCard from "@/components/BaseCard/BaseCard";
export enum PriceCardStyle {
    SELLER_STYLE = 1, //卖
    BUY_STYLE = 2, //买
    HIS_STYLE = 3, //历史
}
type priceprops = {
    data?: any;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    borderRadius?: number
    priceCardStyle?: PriceCardStyle
};

const OfferCard: FunctionComponent<priceprops> = (props) => {
    const {
        data = [], style, onPress, priceCardStyle
    } = props;

    const renderSeller = () => {
        return (
            <BaseCard style={[{ paddingVertical: pxToDp(24), paddingHorizontal: pxToDp(26), backgroundColor: '#FEFCF5', width: '100%', borderRadius: pxToDp(28) }, style]}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{}}>
                        <Text style={styles.text1}>{data?.current_price} WETH/件</Text>
                        <Text style={styles.text2}>$1,888.21</Text>
                    </View>
                    <NtfButton text="购买" width={pxToDp(164)} heigh={pxToDp(68)} textColor='white' backgroundColor="#3352DB" borderRadius={pxToDp(12)} onPress={onPress}></NtfButton>
                </View>

                <View
                    style={{
                        paddingTop: pxToDp(26),
                        paddingBottom: pxToDp(44),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{}}>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>挂单数量</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>2</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>
                            拥有者
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={{
                                    color: "#383838",
                                    fontSize: pxToDp(28),
                                    width: pxToDp(199)
                                    , marginTop: pxToDp(6)
                                }}
                                numberOfLines={1}
                            >
                                0x7ad9…9e51
                            </Text>
                        </View>
                    </View>
                </View>


                <View
                    style={{
                        paddingTop: pxToDp(26),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{}}>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>失效时间</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>12小时30分</Text>
                        </View>
                    </View>

                    <View>
                    </View>
                </View>
            </BaseCard>
        )
    }

    const renderBuy = () => {
        return (
            <BaseCard style={[{ paddingVertical: pxToDp(24), paddingHorizontal: pxToDp(26), backgroundColor: '#FEFCF5', width: '100%', borderRadius: pxToDp(28) }, style]}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{}}>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>0.6217 WETH</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>$1,888.21</Text>
                        </View>
                    </View>

                    <View>
                    </View>
                </View>


                <View
                    style={{
                        paddingTop: pxToDp(26),
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{}}>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>失效时间</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>12小时30分</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>
                            拥有者
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={{
                                    color: "#383838",
                                    fontSize: pxToDp(28),
                                    width: pxToDp(199)
                                    , marginTop: pxToDp(6)
                                }}
                                numberOfLines={1}
                            >
                                0x7ad9…9e51
                            </Text>
                        </View>
                    </View>
                </View>
            </BaseCard>



        )
    }


    const renderHis = () => {
        return (
            <View style={[{ paddingVertical: pxToDp(24), paddingHorizontal: pxToDp(26), width: '100%', borderRadius: pxToDp(28),borderBottomColor:'#F0F0F0',borderBottomWidth:pxToDp(2) }, style]}>
                <View
                    style={{
                    }}
                >
                    <View style={{ flexDirection: 'row',justifyContent:"space-between",width:'100%' }}>
                        <View style={{}}>
                            <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>类型</Text>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>出价</Text>
                        </View>

                        <View style={{}}>
                            <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>价格</Text>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>0.221 WETH</Text>
                        </View>

                        <View style={{}}>
                            <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>时间</Text>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>2022-4-21 22:22:00</Text>
                        </View>
                    </View> 

                    <View style={{marginTop:pxToDp(30)}}>
                            <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>从</Text>
                            <Text style={{ color: "#383838", marginTop: pxToDp(6) }}>0x7ad9…9e51</Text>
                        </View>
                </View>
            </View>


        )
    }
    return (
        priceCardStyle == PriceCardStyle.SELLER_STYLE ? renderSeller() : (priceCardStyle == PriceCardStyle.BUY_STYLE ? renderBuy() : renderHis())

    );
};

export default OfferCard;
