
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding:pxToDp(20),
        backgroundColor: "#ffffff",
        borderColor:'#E8E8E8',
        borderWidth:pxToDp(1),
        width:pxToDp(686),
        height:pxToDp(72),
        borderRadius:200,
        flexDirection:"row",
        alignItems:"center",
    },
    textInput:{
        height:pxToDp(72),
        width:'100%'
    },
    text:{
        height:pxToDp(72),
        textAlignVertical:"center",
        marginLeft:pxToDp(14),
        color:'#AAAAAA',
        fontSize:pxToSp(28)
    },
    image:{
        height:pxToDp(72),
        textAlignVertical:"center"
    },



    container2: {
        width:'100%',
        height:pxToDp(72),
        flexDirection:'row-reverse',
        alignItems:"center",
    },

    leftBg: {
        padding:pxToDp(20),
        borderColor:'#383838',
        borderWidth:pxToDp(2),
        height:pxToDp(72),
        flex:1,
        borderRadius:200,
        flexDirection:"row",
        alignItems:"center",
        marginRight:pxToDp(20),
    },

    text_cancle:{
        textAlignVertical:"center",
        color:'#383838',
        fontSize:pxToSp(28),
        height:'100%',
        fontWeight:'bold'
    },
    textInput2:{
        height:pxToDp(72),
        width:'100%'
    },
})

export default styles;
