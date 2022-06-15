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
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      height:pxToDp(400),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    btn_icon: {
        width:pxToDp(36),
        height:pxToDp(36)
    },
    tips_text: {
        fontSize:pxToDp(32),
        fontWeight:"bold",
        color:'#383838',
        marginLeft:pxToDp(20),
    },
    tips_text_beifen: {
        fontSize:pxToDp(28),
        color:'#383838',
    },
    content_text: {
        fontSize:pxToDp(28),
        color:'#383838',
        
    },
    content_text_onlight: {
        fontSize:pxToDp(28),
        color:'#3352DB',
    },
    tips_sepector: {
        height:pxToDp(8),
        width:'100%',
        backgroundColor:'rgba(1,1,1,0)',
        borderColor:'rgba(51,82,219,0.35)',
        marginTop:pxToDp(16),
        marginBottom:pxToDp(20),
        borderWidth:pxToDp(1),
        borderRadius:pxToDp(16)
    },
    img_active: {
        width:pxToDp(24),
        height:pxToDp(8),
        marginTop:pxToDp(16),
        backgroundColor:UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE
    },
    separator: {
        width:'100%',
        height:pxToDp(1),
        backgroundColor:UIELEMENTS.DEFAULT_SEPARATOR_COLOR
    },
    btn_text: {
        marginTop:pxToDp(28),
        marginBottom:pxToDp(84),
        fontSize:pxToSp(24),
        color:'#999999'
    },
    tab_right:{
        width:pxToDp(44),
        height:pxToDp(44),
        marginHorizontal:pxToDp(32)
    },
})

export default styles;
