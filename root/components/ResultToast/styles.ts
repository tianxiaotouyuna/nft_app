import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   
  container: {
      alignItems:"center",
      borderRadius:pxToDp(28),
      backgroundColor:'white',
      justifyContent:"space-between",
      padding:pxToDp(20),
      paddingBottom:0,
      width:pxToDp(540)
  },
  });
  export default styles;