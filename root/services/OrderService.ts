import { NFTRequest } from "@/request/index";
import jquery from "@/utils/jquery";
import { Alert } from "react-native";
import { CacheKeys } from "../constants";
import { Storage } from "../utils";
import storage from '@/pages/Asset/WalletTest/pstorage';

/**
 * 获取NFT详情
 */
export const selectOfferList =  async ( data?:any ) => {
  // path?: any, params: any
  const path=data?.path
  const params=data?.params

  const api = `order/selectOfferList/${!!path ? `${jquery.path(path)}` : ""}`;
  const res = await NFTRequest.get(api, params);
  return res;
};
/**
 * 钱包币种
 */
 export const queryCoinType =  async ( data?:any ) => {
  // path?: any, params: any

    const m_wallet_addr = await Storage.load(CacheKeys.OURWALLETINFO);
   const m_w_assets = await storage.assets_for_wallet(m_wallet_addr);
    // Alert.alert('m_wallet_addr'+JSON.stringify(m_wallet_addr))
    let assets =await storage.assets();
        for (var i = assets.length - 1; i >= 0; i--) {
      assets[i].isIn = m_w_assets.includes(assets[i].address);
    }
    // Alert.alert('assets'+JSON.stringify(m_w_assets))

  return assets;
};