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
    head: {
        width: "100%",
        height: "100%",
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
        flexDirection:"row",
        backgroundColor:'red'
    }
})

export default styles;
