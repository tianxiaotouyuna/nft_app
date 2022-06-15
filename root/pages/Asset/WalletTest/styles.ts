import { UIELEMENTS } from "@/constants/index";
import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingBottom:0,
        flex:1,
        backgroundColor:'white',
    },
    itemStyle: {

        fontSize: 10,
        padding: 10,

    },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
        marginTop:pxToDp(6),
    }
})
export default styles;
