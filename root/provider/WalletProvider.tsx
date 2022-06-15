import "react-native-gesture-handler";
import WalletConnectProvider, { RenderQrcodeModalProps } from "@walletconnect/react-native-dapp";
import QRCodeModal from "@walletconnect/qrcode-modal";

import React, { FunctionComponent } from "react";
import { Alert, Platform, View } from "react-native";
import { Nav } from "@/routes/Nav";
const { default: AsyncStorage } = require('@react-native-async-storage/async-storage');

 const WalletProvider: any = (options:any) => {

  return(
    <WalletConnectProvider
    bridge="https://bridge.walletconnect.org"
    clientMeta={{
      description: "Connect with WalletConnect",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "Nft_APP",
    }}
    // qrcodeModal={{
    //   open:(uri:'metamask://wc?uri=wc:87dc2f44-42ff-4206-81bf-f2685730759d@1?bridge=https%3A%2F%2Fp.bridge.walletconnect.org&key=bbd16a77194580dc2c4b8caf02fd5d269bf9c0efdb7fbf91673bc3a7eadf0',cb:'',options:{})=>{},
    //   close:()=>{console.log('关闭')}
    // }}
    redirectUrl={
      Platform.OS == 'android' ? 'nftxm://nftxm/' : 'nftxm://'
    }
    storageOptions={{
      asyncStorage: AsyncStorage,
    }}
    // renderQrcodeModal={(props: RenderQrcodeModalProps): JSX.Element => (
    //   <CustomBottomSheet {...props} />
    // )}
  >
      <Nav/>
  </WalletConnectProvider>
  )

}

export default WalletProvider
