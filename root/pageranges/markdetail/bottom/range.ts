import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        bottom:0,
        position:"absolute",
        width:'100%',
        backgroundColor:'white',
    },
    sub_container:{
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:pxToDp(40),
        flexDirection:"row"
    },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
        marginTop:pxToDp(6)
    }
})

export default styles;
