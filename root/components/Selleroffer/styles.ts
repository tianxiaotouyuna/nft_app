import { UIELEMENTS } from "@/constants/";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal:pxToDp(32),
  },  
  pageContent: {
    backgroundColor: 'white',
    paddingHorizontal:pxToDp(32),
    paddingVertical: pxToDp(40),
    borderTopRightRadius:pxToDp(28),
    borderTopLeftRadius:pxToDp(28),
  },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
    },
    arrowStyle:{width:pxToDp(32),height:pxToDp(32)}
})

export default styles;
