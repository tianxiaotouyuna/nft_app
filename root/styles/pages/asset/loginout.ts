import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
        paddingTop:pxToDp(26),
        flex: 1,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
        alignItems:"center",
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
    },
    btn_icon: {
        marginTop:pxToDp(84),
        width:pxToDp(300),
        height:pxToDp(300)
    },
    img_active: {
        width:pxToDp(24),
        height:pxToDp(8),
        marginTop:pxToDp(16),
        backgroundColor:UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE
    },
    separator: {
        width:'100%',
        height:pxToDp(1),
        backgroundColor:UIELEMENTS.DEFAULT_SEPARATOR_COLOR
    },
    btn_text: {
        marginTop:pxToDp(28),
        marginBottom:pxToDp(84),
        fontSize:pxToSp(24),
        color:'#999999'
    },
    tab_right:{
        width:pxToDp(44),
        height:pxToDp(44),
        marginHorizontal:pxToDp(32)
    },
})

export default styles;
