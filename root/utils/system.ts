import { Dimensions, PixelRatio, Platform, StyleProp, ViewStyle } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();
const uiWidth = 750;
const uiHeight = 1334;

// const scale = Math.min(windowHeight / uiHeight, windowWidth / uiWidth);
const windowWidthPx = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const windowHeightPx = PixelRatio.getPixelSizeForLayoutSize(windowHeight);
const scalePx = Math.min(windowHeightPx / uiHeight, windowWidthPx / uiWidth);

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
    
export const pxToSp = (value: number) => {
    const scaleWidth = windowWidth / uiWidth;
    const scaleHeight = windowHeight / uiHeight;
    const scale = Math.min(scaleWidth, scaleHeight);
    return Math.round(value * scale / fontScale + 0.5);
}
const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
export const  tabBarHeight=()=> {
    const majorVersion = parseInt(Platform.Version, 10);
    const isIos = Platform.OS === 'ios';
    const isIOS11 = majorVersion >= 11 && isIos;
    if(isIOS11 && !isLandscape()) return 49;
    return 29;
}

export const pxToDp = (value: number) => {
    if (!value) {
        return 0;
    }
    return Math.round((value * scalePx) / pixelRatio + 0.5);
}
export const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
    style?: StyleProp<ViewStyle>
 ) => {var style_
  if (Platform.OS === 'ios') {
    style_={
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    style_={
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
  return [style,style_]
};
/** 等待时长（秒） */
export const awaitTime = (duration: number) => {
    return new Promise((resolve) => {
        const time: any = setTimeout(() => resolve(time), duration * 1000);
    })
}

export const checkPhone=(phone: string)=>{ 
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
        // alert("手机号码有误，请重填");  
        return false; 
    } 
    else return true;
}