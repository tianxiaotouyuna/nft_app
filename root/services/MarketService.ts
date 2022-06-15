import { NFTRequest } from "@/request/index";
import jquery from "@/utils/jquery";
import { Alert } from "react-native";

/**
 * 获取NFT资产列表
 */
// export const getMarketList = async () => {
//   const res = await NFTRequest.get("getMarketList/");
//   console.log(JSON.stringify("getMarketList===" + JSON.stringify(res)));
//   var new_res = new Array();
//   for (var i = 0; i < 10; i++) {
//     var sub_arr = new Array();
//     for (var j = 0; j < 2; j++) {
//       sub_arr.push(res.data.assets[i * 2 + j]);
//     }
//     new_res.push(sub_arr);
//   }
//   res.data = new_res;
//   console.log(JSON.stringify("res===" + JSON.stringify(new_res)));
//   return res;
// };
export const getMarketList =  async ( data?:any ) => {
  // path?: any, params: any
  
  const path=data?.path
  const params=data?.params
  const api = `getMarketList/${!!path ? `${jquery.path(path)}` : ""}`;
  console.log(JSON.stringify("===" + JSON.stringify(params)));
  const res = await NFTRequest.get(api,params);
  var new_res = new Array();
  for (var i = 0; i < 10; i++) {
    var sub_arr = new Array();
    for (var j = 0; j < 2; j++) {
      sub_arr.push(res.data.assets[i * 2 + j]);
    }
    new_res.push(sub_arr);
  }
  res.cursor=res.data.next
  res.data = new_res;
  return res;
};


/**
 * 测试链NFT列表
 */

 export const getMarketList_test =  async (data?:any ) => {
  const res = await NFTRequest.test_hotNft('https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&include_orders=false', data);
  var new_res = new Array();
  for (var i = 0; i < 10; i++) {
    var sub_arr = new Array();
    for (var j = 0; j < 2; j++) {
      var new_dic= res.data.assets[i * 2 + j];
      new_dic.imageUrl=new_dic.image_url;
      sub_arr.push(new_dic);
    }
    new_res.push(sub_arr);
  }
  res.cursor=res.data.next
  res.data = new_res;
console.log('data1234'+res)
  return res;
};

/**
 * 获取NFT详情
 */
export const getAssetsOneInfo = (path?: any, data: any) => {
  const api = `getAssetsOneInfo/${!!path ? `${jquery.path(path)}` : ""}`;
  return NFTRequest.get(api, data);
};

/**
 * 获取个人NFT资产列表
 */
export const getMarketList_my = async () => {
  const res = await NFTRequest.get("getMarketList/");
  var new_res = new Array();
  for (var i = 0; i < 10; i++) {
    var sub_arr = new Array();
    for (var j = 0; j < 2; j++) {
      sub_arr.push(res.data.assets[i * 2 + j]);
    }
    new_res.push(sub_arr);
  }
  res.data = new_res;

  return res;
};

export const queryBidOffersList = (path?: any, data: any) => {
  const api = `queryBidOffersList/${!!path ? `${jquery.path(path)}` : ""}`;
    return NFTRequest.get(api, data);
};

export const querySellerList = (path?: any, data: any) => {
  const api = `querySellerList/${!!path ? `${jquery.path(path)}` : ""}`;
  return NFTRequest.get(api, data);
};

export const queryEventList = (path?: any, data: any) => {
    const api = `queryEventList/${!!path ? `${jquery.path(path)}` : ""}`;
    return NFTRequest.get(api, data);
};
