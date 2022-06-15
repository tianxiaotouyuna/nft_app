import { UIELEMENTS } from "@/constants/index";
import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:UIELEMENTS.PADDING_TOP,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
    },
    publish_image:{
        width:pxToDp(206),
        height:pxToDp(206),
        borderRadius:pxToDp(20),
        backgroundColor:UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    centerModal: {
      justifyContent: 'center',
      alignItems:'center',
    },
})

export default styles;
