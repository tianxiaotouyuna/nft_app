import { UIELEMENTS } from "@/constants/";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    swiper: {
        marginVertical: pxToDp(12),
        borderRadius: pxToDp(16),
        overflow: "hidden",
        flexDirection:"row"
    },
    image: {
        width: pxToDp(310),
        height: pxToDp(310),
        backgroundColor: "#f7f7f7",
    },
    text1: {
        fontSize:pxToSp(28),
        color:UIELEMENTS.DEFAULT_SUB_COLOR
    },
    text2: {
        fontSize:pxToSp(24),
        color:'#EB5757'
    },
    base: {
        width: pxToDp(326),
        backgroundColor:'white'
    },
    last: {
        backgroundColor:'white',
        flexDirection:"row",
        width:'100%',
        justifyContent:"space-between",
        alignItems:"center"
    },
    button: {
        width: pxToDp(44),
        height: pxToDp(44),
    },
})

export default styles;
