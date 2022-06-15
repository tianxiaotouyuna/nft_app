import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
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
    },
    headImage:{
        width:windowWidth,
        height:windowWidth,
        backgroundColor:'blue'
    },
})

export default styles;
