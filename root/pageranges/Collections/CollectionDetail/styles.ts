import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent:"space-between",
        alignItems:"center",
        
    },
    text1:{
        fontSize:pxToDp(28),
        color:'#383838',
        fontWeight:'bold'
    },
    text2:{
        fontSize:pxToDp(24),
        color:'#707A83',
    }
})

export default styles;
