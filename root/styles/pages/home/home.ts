import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:UIELEMENTS.PADDING_TOP,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
    },
    ripple: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    spacing1: {
        margin: 12 
    },
    spacing2: {
        marginBottom: 12 
    },
    tab_right2:{
            width:pxToDp(44),
            height:pxToDp(44),
            marginHorizontal:pxToDp(32)
    },

    tab_right:{
        width:pxToDp(44),
        height:pxToDp(44),
},
    IGO_Warps:{ flexDirection: "row", alignItems: "center",marginTop: pxToDp(25), marginBottom: pxToDp(7),justifyContent:"space-between"},
    IGO_Warps_Text:{ fontSize: UIELEMENTS.HEADER_SIZE, color: UIELEMENTS.DEFAULT_HEADER_COLOR,fontWeight:"bold"},
    IGO_Warps_Image:{ width: pxToDp(34), height: pxToDp(34),marginLeft:pxToDp(20) },
    IGO_Warps_arrow:{ width: pxToDp(22), height: pxToDp(22),marginLeft:pxToDp(20) },
  
    search_wraps:{ borderColor: UIELEMENTS.DEFAULT_SUB_COLOR, borderWidth: pxToDp(0.5), borderRadius: pxToDp(10000), height: pxToDp(72), shadowOpacity: 0 },
    search_input:{ marginLeft: -10, fontSize: pxToSp(26), color: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, textAlignVertical: "center", flex: 1, height: pxToDp(100), alignSelf: "center" }
})

export default styles;
