import React, { FunctionComponent } from "react";
import { Pressable, Image,View } from "react-native";
import {  Card, Title } from "react-native-paper";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from "rn-placeholder";
import styles from '@/styles/pages/home/search/search'
import useInitScreen from "@/hooks/useInitScreen";
import NFTSearchBar, { SearchStyle } from "@/components/NFTSearchBar/NFTSearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { pxToDp } from "@/utils/system";

 const Search: FunctionComponent = () => { 
   useInitScreen({
    navigationOptions: {
      title:'搜索',
      headerShown:false
  },
  statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content"
  }
})
  return (
    <View
      style={[styles.container,{marginTop:useSafeAreaInsets().top}]}
    >
      <NFTSearchBar searchStyle={SearchStyle.HOME2_STYLE} ></NFTSearchBar>
    </View>
  );
};
export default Search
