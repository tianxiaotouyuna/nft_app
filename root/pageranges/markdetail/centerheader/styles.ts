import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingTop:pxToDp(88),
        paddingBottom:0,
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:pxToDp(32)
    },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
        marginTop:pxToDp(6)
    },
    head:{
        width:pxToDp(80),
        height:pxToDp(80),
        borderRadius:pxToDp(200),
        borderColor:'#D6D6D6',
        borderWidth:pxToDp(4)
    },
    viewBg:{backgroundColor:'white',width:pxToDp(686),height:pxToDp(108),alignItems:"center",flexDirection:"row",borderRadius:pxToDp(56),paddingHorizontal:pxToDp(16),
justifyContent:"space-between"},
    collect:{
        width:pxToDp(44),
        height:pxToDp(44),
        borderRadius:pxToDp(200)
    },
    collect_bg:{
        width:pxToDp(128),
        height:pxToDp(68),
        borderRadius:pxToDp(200)
    },
})

export default styles;
