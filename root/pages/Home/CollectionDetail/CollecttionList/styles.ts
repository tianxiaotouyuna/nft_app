import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
        paddingVertical: pxToDp(24),
    },
    linear:{ width: '100%', height: pxToDp(400), paddingHorizontal: pxToDp(40) },
    bottomBg: {
        paddingTop: pxToDp(24),
        marginTop:pxToDp(-30),
        borderTopLeftRadius:pxToDp(28),
        borderTopRightRadius:pxToDp(28),
        paddingHorizontal:pxToDp(30),
    },
    bottomBg_content: {
    },
    bottomBg_content_title: {
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        width:'100%',
        height:pxToDp(80),

    },
    title_text1:{
        color:'#383838',
        fontSize:pxToDp(32),
        alignSelf:"center",
        paddingVertical:pxToDp(28)
    },
    title_text2:{
        color:'#383838',
        fontSize:pxToDp(28)
    },
    empty_box:{
            justifyContent:"center",
            alignItems:"center",
            flex:1
    },
    empty_text1: {
        fontSize:pxToDp(32),
        color:'#222222',
        marginTop:pxToDp(40)
    },
})

export default styles;
