import { UIELEMENTS } from "@/constants/index";
import React ,{ FunctionComponent } from "react";
import { Animated, Pressable, StyleProp, StyleSheet, Text, TextPropTypes, TextStyle, ViewPropTypes, ViewStyle } from "react-native";
import { View } from "react-native-animatable";
import Ripple from "react-native-material-ripple";
import { Button } from "react-native-paper";
import { TabBarProps } from "react-native-scrollable-tab-view";
type this_props={
  textStyle?: StyleProp<TextStyle>,
    activeTextColor?:string,
    inactiveTextColor?:string,
    tabBarUnderlineStyle?: StyleProp<ViewStyle>,
    tabUnderlineWidth?:number
    oneBarstyle?: StyleProp<TextStyle>,
    allBarStyle?: StyleProp<TextStyle>,
    tabUnderlineScaleX?:number,
    jiafen?:number
  
}
// type propTypes= {
//   goToPage?: () => void;
//   activeTab?:number,
//   tabs?:[],
//   backgroundColor?:string,
//   activeTextColor?:string,
//   inactiveTextColor?:string,
//   textStyle?: StyleProp<ViewStyle>,
//   tabStyle?: StyleProp<ViewStyle>,
//   renderTab?: () => void,
//   underlineStyle?: StyleProp<ViewStyle>,
//   name?:any,
//   page?:any,
//   isTabActive?:any,
//   onPressHandler?:any,
// };
const NFTDefaultTabBar: FunctionComponent<this_props> = (props:TabBarProps) => {
// const {goToPage,activeTab,tabs=[],backgroundColor,activeTextColor='navy',inactiveTextColor='black',textStyle
// ,tabStyle,renderTab,underlineStyle,name,page,isTabActive,onPressHandler}=props

const {goToPage , scrollValue=0, activeTab,tabs=[],containerWidth=0,textStyle,activeTextColor, inactiveTextColor
,oneBarstyle,tabBarUnderlineStyle,tabUnderlineWidth,allBarStyle,tabUnderlineScaleX,jiafen
} = props;
    const numberOfTabs = jiafen||tabs.length;

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  containerWidth / numberOfTabs],
    });

    const _renderTab=(name, page, isTabActive, onPressHandler)=> {
      const textColor = isTabActive ? activeTextColor : inactiveTextColor;
      const fontWeight = isTabActive ? 'bold' : 'normal';
      return <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
        style={{flex: 1,}}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        onPress={() => onPressHandler(page)}
      >
        <View style={styles.tab}>
          <Text style={[{color: textColor, fontWeight,textAlign:"center" }, textStyle, ]}>
            {name}
          </Text>
        </View>
      </Ripple>;
    }


   const _renderUnderline=()=> {
    const numberOfTabs = jiafen||tabs.length;
    const underlineWidth = tabUnderlineWidth ? tabUnderlineWidth : containerWidth / (numberOfTabs * 2);
      const scale = tabUnderlineScaleX ? tabUnderlineScaleX : 3;
      const deLen = (containerWidth / numberOfTabs - underlineWidth ) / 2;
      const tabUnderlineStyle = {
          position: 'absolute',
          width: underlineWidth,
          height: 2,
          borderRadius: 2,
          backgroundColor: activeTextColor,
          bottom: 0,
          left: deLen
      };

      const scaleValue = (defaultScale: number) => {
        let arr = new Array(numberOfTabs * 2);
        return arr.fill(0).reduce(function(pre, cur, idx){
            idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx-1] + 0.5);
            idx%2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
            return pre
            }, {inputRange: [], outputRange: []})
    }
      const scaleX = scrollValue.interpolate(scaleValue(scale));

      return(
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
                transform: [
                    { translateX },
                    { scaleX }
                ],
            },
            tabBarUnderlineStyle,
          ]}
        />
    )
  }
    return (
      <View style={[styles.tabs, {backgroundColor: 'white', }]}>
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page;
          const renderTab = renderTab || _renderTab;
          return renderTab(name, page, isTabActive, goToPage);
        })}
        {_renderUnderline()}
      </View>
    );
};
export default NFTDefaultTabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 10
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
    
  },
});
