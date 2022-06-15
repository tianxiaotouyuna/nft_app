import { UIELEMENTS } from "@/constants/";
import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding:pxToDp(6),
        backgroundColor: "#ffffff",
        borderColor:'#EEEEEE',
        borderWidth:pxToDp(1)
    }, 
    publish_image: {
        height:pxToDp(310),
        width:'100%',
    },
    hot_image: {
        width:pxToDp(280),
        height:pxToDp(200),
        backgroundColor:UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
    hot_head: {
        width:pxToDp(88),
        height:pxToDp(88),
        borderRadius: 100,
        marginTop:-pxToDp(44)
    },
    spacing1: {
        margin: 12 
    },
    orderlist_image: {
        width:pxToDp(168),
        height:pxToDp(168),
        backgroundColor:UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
})

export default styles;
