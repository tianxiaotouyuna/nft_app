import { UIELEMENTS } from "@/constants/index";
  import { pxToDp, pxToSp } from "@/utils/system";
  import { StyleSheet } from "react-native";
  import { color } from 'react-native-reanimated';
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
      },
      tab_right:{
          width:pxToDp(44),
          height:pxToDp(44),
          marginHorizontal:pxToDp(32)
      },bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },   btn_icon: {
        marginTop:pxToDp(84),
        width:pxToDp(300),
        height:pxToDp(300)
    },
    btn_text: {
        marginTop:pxToDp(28),
        marginBottom:pxToDp(84),
        fontSize:pxToSp(24),
        color:'#999999'
    },
    
  })
  
  export default styles;
  