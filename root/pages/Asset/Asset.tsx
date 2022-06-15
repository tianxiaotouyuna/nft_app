import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert } from "react-native";
import Modal from "react-native-modal";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Image } from "react-native-animatable";
import styles from "@/styles/pages/asset/asset";
import AssetBtnWraps from "@/pageranges/AssetBtnWraps/AssetBtnWraps";
import AssetTopBg from "@/components/AssetTopBg/AssetTopBg";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { walletActions } from "@/action/walletActions";
import PopBtn from "@/components/LoginOutBtn/PopBtn";
import { useNavigation } from "@react-navigation/native";
import { Navigate, Storage } from "@/utils/index";
import { connected } from "process";
import { MarketService } from "@/services/index";
import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys } from "@/constants/";
import WalletPop, { WalletPopStyle } from "@/components/WalletPop/WalletPop";

const Asset: FunctionComponent = () => {
  const connector = useWalletConnect(); // valid
  const [showLoginout, setshowLoginout] = useState(false);
  const [showMnemonic, setshowMnemonic] = useState(false);
  const [ntfData, setntfData] = useState([]);
  const [data, setdata] = useState();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(walletActions.disconnect(connector));
    setshowLoginout(false)
  };
  const rightBtnClick = () => {setshowLoginout(true)};

  const nav=useNavigation()
  const navigation = useNavigation();
  useEffect(() => {
   if(connector.connected) getData()

  }, [connector])

  const getData = async () => {

    const res = await MarketService.getMarketList_my();
    console.log('getMarketList_my'+res)
    setntfData(res?.data[0])  
  }
  const refreshHeaderData= ()=>{

    if(connector.connected){
        nav.setOptions(
          {
            title: "资产",
            headerTitleAlign: "left",
            headerRight: () => (
                <Pressable
                  onPress={() => {
                    rightBtnClick();
                  }}
                >
                  <Image
                    style={styles.tab_right}
                    source={require("@/resources/exit.png")}
                  />
                </Pressable>
              ),
          }
        )
      }
      else {
        nav.setOptions(
          {
            title: "资产",
            headerTitleAlign: "left",
            headerRight:null
          }
        )
      }

  }
  
  useEffect(() => {
    refreshHeaderData();
}, [connector])
  


const renderBottom=()=>{
  return (
    <BannerCard
      data={ntfData}
      cardStyle={CardStyle.HOTNTF_STYLE}
      isFromMy={true}
    ></BannerCard>
  );
}
  const showButton = () => {
    if (connector.connected==false) {
      return (
        <View style={{flex:1,justifyContent:"space-between",alignItems:"center"}}>
        <View style={{alignItems:"center"}}>
          <Image
            style={styles.btn_icon}
            source={require("@/resources/nolinkedwallet.png")}
          />
          <Text style={styles.btn_text}>您还没有链接钱包</Text>
          </View>
        
          <AssetBtnWraps style={{marginBottom:pxToDp(84)}} onPress_3={()=>{setshowMnemonic(true)}}/>
        </View>
      );
    } else {
      return (
        <>
          <AssetTopBg />
          <View
            style={{
              justifyContent: "center",
              alignSelf: "flex-start",
              marginLeft: pxToDp(66),
            }}
          >
            <View
              style={{
                alignItems: "center",
                height: pxToDp(70),
                justifyContent: "space-between",
                marginTop: pxToDp(46),
              }}
            >
              <Text>NFT</Text>
              <View style={styles.img_active} />
            </View>
          </View>
          <View style={styles.separator} />

          {ntfData.length == 0 ? (
            <NtfButton
      width={pxToDp(456)}
              heigh={pxToDp(100)}
              text="“暂无NFT”去市场看看"
      onPress={() => { Navigate.navigate('市场', {}) }}
      font={pxToDp(28)}
              style={{
                backgroundColor: "#EEF1FF",
                borderWidth: 0,
                margin: pxToDp(200),
              }}
            />
          ) : renderBottom()}
        </>
      );
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom }]}>
      {showButton()}

      <Modal isVisible={showLoginout} style={styles.bottomModal} 
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={1000}
      >
        <PopBtn cancle_press={()=>setshowLoginout(false)} sure_press={logout}></PopBtn>
      </Modal>

      <Modal isVisible={showMnemonic} style={styles.bottomModal} 
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={1000}
      >
        <WalletPop cancle_press={()=>setshowMnemonic(false)} sure_press={()=>{
            setshowMnemonic(false)
            Navigate.navigate("CreactCWallet", {})
            }} popStyle={WalletPopStyle.MNEMONICPOP}></WalletPop>
      </Modal>
    </View>
  );
};

export default Asset;



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { FunctionComponent, useEffect, useState } from "react";
// import { View, Pressable, Alert } from "react-native";
// import Modal from "react-native-modal";
// import { useWalletConnect } from "@walletconnect/react-native-dapp";
// import { Text } from "react-native-paper";
// import { useDispatch } from "react-redux";
// import { Image } from "react-native-animatable";
// import styles from "@/styles/pages/asset/asset";
// import AssetBtnWraps from "@/pageranges/AssetBtnWraps/AssetBtnWraps";
// import AssetTopBg from "@/components/AssetTopBg/AssetTopBg";
// import { pxToDp } from "@/utils/system";
// import NtfButton from "@/components/NtfButton/NtfButton";
// import { walletActions } from "@/action/walletActions";
// import PopBtn from "@/components/LoginOutBtn/PopBtn";
// import { useNavigation } from "@react-navigation/native";
// import { Navigate } from "@/utils/index";
// import { connected } from "process";
// import { MarketService } from "@/services/index";
// import BannerCard, { CardStyle } from "@/components/BannerCard/BannerCard";

// const Asset: FunctionComponent = () => {
//   const connector = useWalletConnect(); // valid
//   const [showLoginout, setshowLoginout] = useState(false);
//   const [ntfData, setntfData] = useState([]);
//   const [data, setdata] = useState();
//   const dispatch = useDispatch();
//   const logout = () => {
//     dispatch(walletActions.disconnect(connector));
//     setshowLoginout(false)
//   };
//   const rightBtnClick = () => {setshowLoginout(true)};

//   const nav=useNavigation()
//   const navigation = useNavigation();
//   useEffect(() => {
//    if(connector.connected==false) getData()

//   }, [connector])

//   const getData = async () => {

//     const res = await MarketService.getMarketList_my();
//     setntfData(res?.data[0])  
//   }
//   const refreshHeaderData= ()=>{

//     if(connector.connected==false){
//         nav.setOptions(
//           {
//             title: "资产",
//             headerTitleAlign: "left",
//             headerRight: () => (
//                 <Pressable
//                   onPress={() => {
//                     rightBtnClick();
//                   }}
//                 >
//                   <Image
//                     style={styles.tab_right}
//                     source={require("@/resources/exit.png")}
//                   />
//                 </Pressable>
//               ),
//           }
//         )
//       }
//       else {
//         nav.setOptions(
//           {
//             title: "资产",
//             headerTitleAlign: "left",
//             headerRight:null
//           }
//         )
//       }

//   }
  
//   useEffect(() => {
//     refreshHeaderData();
// }, [connector])
  


// const renderBottom=()=>{
//   return (
//     <BannerCard
//       data={ntfData}
//       cardStyle={CardStyle.HOTNTF_STYLE}
//       isFromMy={true}
//     ></BannerCard>
//   );
// }
//   const showButton = () => {
//     if (connector.connected == true) {
//       return (
//         <>
//           <Image
//             style={styles.btn_icon}
//             source={require("@/resources/nolinkedwallet.png")}
//           />
//           <Text style={styles.btn_text}>您还没有链接钱包</Text>
//           <AssetBtnWraps />
//         </>
//       );
//     } else {
//       return (
//         <>
//           <AssetTopBg />
//           <View
//             style={{
//               justifyContent: "center",
//               alignSelf: "flex-start",
//               marginLeft: pxToDp(66),
//             }}
//           >
//             <View
//               style={{
//                 alignItems: "center",
//                 height: pxToDp(70),
//                 justifyContent: "space-between",
//                 marginTop: pxToDp(46),
//               }}
//             >
//               <Text>NFT</Text>
//               <View style={styles.img_active} />
//             </View>
//           </View>
//           <View style={styles.separator} />

//           {ntfData.length == 0 ? (
//             <NtfButton
//       width={pxToDp(456)}
//               heigh={pxToDp(100)}
//               text="“暂无NFT”去市场看看"
//       onPress={() => { Navigate.navigate('市场', {}) }}
//       font={pxToDp(28)}
//               style={{
//                 backgroundColor: "#EEF1FF",
//                 borderWidth: 0,
//                 margin: pxToDp(200),
//               }}
//             />
//           ) : renderBottom()}
//         </>
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {showButton()}

//       <Modal isVisible={showLoginout} style={styles.bottomModal} 
//       hideModalContentWhileAnimating={true}
//       useNativeDriverForBackdrop={true}
//       animationOutTiming={1000}
//       >
//         <PopBtn cancle_press={()=>setshowLoginout(false)} sure_press={logout}></PopBtn>
//       </Modal>
//     </View>
//   );
// };

// export default Asset;
