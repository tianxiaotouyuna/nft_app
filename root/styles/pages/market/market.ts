import { UIELEMENTS } from "@/constants/index";
import { paddingBottom_, pxToDp, pxToSp } from "@/utils/system";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:UIELEMENTS.PADDING_TOP,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
    },
    tab_right:{
        width:pxToDp(44),
        height:pxToDp(44),
        marginHorizontal:pxToDp(32)
    },
    list: {
      flex: 1,
      zIndex:-1,
      backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
  },
    iconStyle:{width:pxToDp(40),height:pxToDp(40)},
    arrowStyle:{width:pxToDp(32),height:pxToDp(32)},
    chooseStyle:{width:pxToDp(32),height:pxToDp(32)},
    search_wraps:{ borderColor: UIELEMENTS.DEFAULT_SUB_COLOR, borderWidth: pxToDp(0.5), borderRadius: pxToDp(10000), height: pxToDp(72), width: pxToDp(686), shadowOpacity: 0,shadowOffset:{width:0,height:0} },
    search_input:{ marginLeft: -10, fontSize: pxToSp(26), color: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, textAlignVertical: "center", flex: 1, height: pxToDp(100), alignSelf: "center" },
    header_wraps: {
      marginHorizontal: -pxToDp(40),
      alignItems:"center",
  },search_wraps2: {
      alignItems:"center",
      paddingTop:pxToDp(26),
      paddingBottom:pxToDp(20),
      backgroundColor:'white',
  width:'100%'
}, section: {
        flex: 1,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center"
      },
      row: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      line: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: "#EEE"
      },
      empty_box:{
              justifyContent:"center",
              alignItems:"center",
              flex:1
      },
      icon: {
          width:pxToDp(526),
          height:pxToDp(284),
      },
      empty_text1: {
          fontSize:pxToDp(32),
          color:'#222222',
          marginTop:pxToDp(40)
      },
})

export default styles;
