import * as ReduxToken from './redux-token';
import * as CacheKeys from './cache-keys';
import * as UIELEMENTS from './ui-elements';
import { Platform } from 'react-native';

const isReleaseEnvironment = true; // 是否发布环境
// const isReleaseEnvironment = false; // 是否发布环境

const envParams = isReleaseEnvironment ? ({
  /** 微信小程序原始ID */
  WX_ORIFINAL_ID: 'gh_a37574691154', // 昆仑能量站
  /** 微信小程序类型 0:正式版 1:开发版 2:体验版 */
  WX_MINIPROGRAM_TYPE: 0, // 昆仑能量站
  /** PHP HOST */
  PHP_HOST: 'https://renren.didi315.com', // 正式环境
}) : ({
  /** 微信小程序原始ID */
  WX_ORIFINAL_ID: "gh_3f0e1a2f1cfd", // 咕咕鸟能量站
  /** 微信小程序类型 0:正式版 1:开发版 2:体验版 */
  WX_MINIPROGRAM_TYPE: 2, // 咕咕鸟能量站
  /** JAVA HOST */
  BASE_JAVA_HOST: 'https://dev.nengliangzhan.com', // 测试环境
  // BASE_JAVA_HOST: 'http://192.168.10.103:8080', // 测试环境
  // BASE_JAVA_HOST: 'http://192.168.1.5:8080', // 测试环境
  /** PHP HOST */
  PHP_HOST: 'https://php.nengliangzhan.com', // 测试环境
})

/** 微信appid */
const WX_APPID = 'wx2426c6a5992aa44f'; // 开放平台APPID
/** 微信universalLink */
const WX_UNIVERSAL_LINK = 'https://renren.didi315.com/app/link/';
/** 网易七鱼appkey */
const QIYU_APP_KEY = '868e3d5a361f99908251ff80758e252d';
/** 网易七鱼appname */
const QIYU_APP_NAME = '能量站';
/** saas 唯一标识 */
const UNIACID = '108';
/** 商家标识 */
const MERCHANT = 'energy';
/** 好大夫合作KEY */
const doctorPartnerKey = "08f50000a22b00a6";



const BASE_HOST='http://43.155.94.122:8080/api/nftMarket'// 线上测试环境
const BASE_IMITATE_HOST='http://192.168.1.104:3000/nftapi'// 线上测试环境
// const BASE_HOST='http://192.168.1.103:8080/api/nftMarket'// 测试环境
/** 商家标识 */
/**
 * 隐私
 */
const PROTOCOL = {
  ABOUT: 'energy_001', // 关于
  USER: 'energy_002', // 用户协议
  PRIVACY: 'energy_003', // 隐私政策
};
/**
 * 导航配
 */


export { ReduxToken ,CacheKeys,UIELEMENTS  };

export default {
  ...envParams,
  WX_APPID,
  WX_UNIVERSAL_LINK,
  QIYU_APP_KEY,
  QIYU_APP_NAME,
  UNIACID,
  MERCHANT,
  PROTOCOL,
  BASE_HOST,
  isReleaseEnvironment,
  doctorPartnerKey,
  BASE_IMITATE_HOST
};
