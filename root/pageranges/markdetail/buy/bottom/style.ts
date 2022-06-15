import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:pxToDp(28),
        borderTopRightRadius:pxToDp(28),
        marginTop:pxToDp(50)
    },
    sub_container:{
        flex:1,
    },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
        marginTop:pxToDp(6)
    }
})

export default styles;
