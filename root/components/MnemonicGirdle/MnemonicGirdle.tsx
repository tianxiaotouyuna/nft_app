import { UIELEMENTS } from '@/constants/';
import styles from '@/styles/components/homeGridle';
import { Navigate } from '@/utils/';
import { pxToDp, windowWidth } from '@/utils/system';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import Ripple from 'react-native-material-ripple';
import MnemonicRipple from '../MnemonicRipple/MnemonicRipple';
export enum MonicGridleStyle {
    OUTPUTSTYLE = 1,//生成助记词
    INPUTSTYLE = 2,//选择助记词,上面的输入框
    INPUTSTYLE_TIPS = 3,//选择助记词,下面的提示
}
type MonicGirdleProps = {
    style?: StyleProp<ViewStyle>
    data?: any
    paddingHorizontal?: number
    onTap?: () => void
    columnCount?: number
    rowCount?: number
    selfMargin?: number
    monicGridleStyle?: MonicGridleStyle
    selectHasChange?: (text: string) => void
    needRefresh?: boolean
}

const MnemonicGirdle: FunctionComponent<MonicGirdleProps> = (props) => {
    const rippleRef = useRef<Ripple>(null);
    const [new_data, setnew_data] = useState([]);
    const { selectHasChange, selfMargin = pxToDp(10), style, onTap, data, paddingHorizontal = pxToDp(30), columnCount = 1, rowCount = 1, monicGridleStyle = MonicGridleStyle.OUTPUTSTYLE, needRefresh = false } = props;
    useEffect(() => {
        getData()

    }, [needRefresh])

    const getData = () => {
        var new_data_ = new Array()
        for (var i = 0; i < rowCount; i++) {
            var new_data_sub2 = new Array()
            for (var j = 0; j < columnCount; j++) {
                if (monicGridleStyle == MonicGridleStyle.INPUTSTYLE) {
                    new_data_sub2.push(data[i * columnCount + j])
                }
                else
                    new_data_sub2.push(data[i * columnCount + j])
            }
            new_data_.push(new_data_sub2)
        }
        setnew_data(new_data_)
        console.log('new_data===' + JSON.stringify(new_data))
        console.log('new_data_===' + JSON.stringify(new_data_))

    }
    const itemWidth = (windowWidth - paddingHorizontal * 2 - (columnCount - 1) * selfMargin) / columnCount
    const renderView = () => {
        console.log('new_data===' + JSON.stringify(2))

        return (
            <View style={[style, { justifyContent: 'space-between' }]}>

                {new_data?.map((item: any, index_row: number) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {
                            item?.map((item2: any, index_column: number) => (
                                renderItem(item2, index_row, index_column)
                            ))
                        }
                    </View>

                ))}
            </View>
        )
    }
    const selectOne = (item: string) => {
        if (monicGridleStyle != MonicGridleStyle.INPUTSTYLE_TIPS) return
        selectHasChange(item)
    }
    const renderItem = (item: string, index_row: number, index_column: number) => (
        <View>

            {monicGridleStyle == MonicGridleStyle.INPUTSTYLE_TIPS ?
                <MnemonicRipple onPress={() => selectOne(item)} style={{ backgroundColor: '#F4F6FF', width: itemWidth, height: itemWidth / 2, alignItems: 'center', justifyContent: 'center', marginTop: selfMargin, borderRadius: pxToDp(16) }} rippleContainerBorderRadius={pxToDp(16)}>
                    <Text style={styles.text_mnioc}>{item}</Text>
                </MnemonicRipple>
                :
                <>
                    <Ripple onPress={() => selectOne(item)} style={{ backgroundColor: '#F4F6FF', width: itemWidth, height: itemWidth / 2, alignItems: 'center', justifyContent: 'center', marginTop: selfMargin, borderRadius: pxToDp(16) }} rippleContainerBorderRadius={pxToDp(16)}>
                        <Text style={styles.text_mnioc}>{item}</Text>
                    </Ripple>
                    <Text style={styles.text_index}>{index_row * columnCount + index_column + 1}</Text>
                </>
            }

        </View >
    )
    return (
        renderView()
    )
}
export default MnemonicGirdle
