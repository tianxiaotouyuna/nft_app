import { CacheKeys } from "@/constants/";
import { Storage } from "@/utils/";
import { pxToDp, pxToSp } from "@/utils/system";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import styles from "./asset-style";
const AssetTopBg: FunctionComponent = (props) => {
  const [wallet, setwallet] = useState();
  // const getWalletInfo = useSelector((state: any) => state);
  const connector = useWalletConnect(); // valid
  
  const get_storageInfo =async ()=>{
   const info = await Storage.load(CacheKeys.WALLETINFO);
   setwallet(info)
  }
  useEffect(() => {
    get_storageInfo()
  }, [connector])
  

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.headImage}
        source={require("@/resources/bg.png")}
      >
        <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between"}}>
          <Text style={{ color: "white" ,fontSize:pxToSp(28)}}>钱包</Text>
          <Image
            style={styles.arrow}
            source={require("@/resources/return_3.png")}
          />
        </View>
        {/* <Text style={{ color: "white" ,fontSize:pxToSp(52)}}>{wallet?.peerMeta?.name}</Text> */}
        <Text style={{ color: "white" ,fontSize:pxToSp(52)}}>MetaMask</Text>
        <Text style={{ color: "white",fontSize:pxToSp(28) }} numberOfLines={1} ellipsizeMode={'middle'}>地址：{wallet?.accounts?.[0]}</Text>
        {/* <Text style={{ color: "white",fontSize:pxToSp(28) }} numberOfLines={1} ellipsizeMode={'middle'}>地址：0xbb5cadb413be5db6cfc6011eae9764497883d152</Text> */}

      </ImageBackground>
    </View>
  );
};

export default AssetTopBg;






// import { CacheKeys } from "@/constants/";
// import { Storage } from "@/utils/";
// import { pxToDp, pxToSp } from "@/utils/system";
// import { useWalletConnect } from "@walletconnect/react-native-dapp";
// import React, { FunctionComponent, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   Alert,
//   ImageBackground,
// } from "react-native";
// import { white } from "react-native-paper/lib/typescript/styles/colors";
// import { useSelector } from "react-redux";
// import styles from "./asset-style";
// const AssetTopBg: FunctionComponent = (props) => {
//   const [wallet, setwallet] = useState();
//   // const getWalletInfo = useSelector((state: any) => state);
//   const connector = useWalletConnect(); // valid
  
//   const get_storageInfo =async ()=>{
//    let info = await Storage.load(CacheKeys.WALLETINFO);
//    setwallet(info)
//   }
//   useEffect(() => {
//     get_storageInfo()
//   }, [connector])
  

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         style={styles.headImage}
//         source={require("@/resources/bg.png")}
//       >
//         <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between"}}>
//           <Text style={{ color: "white" ,fontSize:pxToSp(28)}}>钱包</Text>
//           <Image
//             style={styles.arrow}
//             source={require("@/resources/return_3.png")}
//           />
//         </View>
//         <Text style={{ color: "white" ,fontSize:pxToSp(52)}}>MetaMask</Text>

//         <Text style={{ color: "white",fontSize:pxToSp(28) }} numberOfLines={1} ellipsizeMode={'middle'}>地址：0xbb5cadb413be5db6cfc6011eae9764497883d152</Text>

//       </ImageBackground>
//     </View>
//   );
// };

// export default AssetTopBg;
