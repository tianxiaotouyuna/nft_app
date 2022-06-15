import { UIELEMENTS } from "@/constants/";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(120),
        height: pxToDp(120),
        backgroundColor: "#f7f7f7",
        borderRadius:pxToDp(20)
    },

    btnBg: {
        width: pxToDp(44),
        height: pxToDp(44),
    },
    modalContent: {
      backgroundColor: 'white',
      paddingHorizontal:pxToDp(40),
      paddingVertical: pxToDp(40),
      borderTopRightRadius:pxToDp(28),
      borderTopLeftRadius:pxToDp(28),
    },
    modalContent_scroll: {
      backgroundColor: 'white',
      marginHorizontal:pxToDp(140),
      marginVertical: pxToDp(340),
      paddingHorizontal:pxToDp(20),
      paddingVertical: pxToDp(20),
      borderTopRightRadius:pxToDp(28),
      borderTopLeftRadius:pxToDp(28),
    },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
        position:"absolute",
        right:0
        
    },
    arrow2:{
        width:pxToDp(34),
        height:pxToDp(34),
        position:"absolute",
        right:0
        
    },
    image_p:{
        width: pxToDp(120),
        height: pxToDp(120),
        backgroundColor: "#D8D8D8",
        borderRadius:pxToDp(20)
    },
    text: {
      fontSize: 15,
      color: "#666",
      textAlign: "center",
      width: 140,
      marginTop:pxToDp(28) ,fontWeight:"bold"
    },
    publish_image:{
        width:pxToDp(206),
        height:pxToDp(206),
        borderRadius:pxToDp(20),
        backgroundColor:UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
    image_icon:{
        width: pxToDp(72),
        height: pxToDp(72),
        backgroundColor: "#D8D8D8",
        borderRadius:pxToDp(210)
    },

  stepIndicator: {
      height:pxToDp(200),
      width:'100%',
    marginVertical: 10,
  },
})

export default styles;
