import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(30),
        height: pxToDp(30),
        backgroundColor: "#f7f7f7",
    },

    btnBg: {
        width: pxToDp(44),
        height: pxToDp(44),
    },
})

export default styles;
