import { NFTRequest, ImitateRequest } from "@/request/index";
import jquery from "@/utils/jquery";
import { Alert } from "react-native";

/**
 * 获取NFT详情
 */
export const createBuyOrder =  async ( data?:any ) => {
  // path?: any, params: any
  const path=data?.path
  const params=data?.params
  Alert.alert('33'+JSON.stringify(params))

  const api = `createBuyOrder/${!!path ? `${jquery.path(path)}` : ""}`;
  const res = await ImitateRequest.get(api, params);
  return res;
};
