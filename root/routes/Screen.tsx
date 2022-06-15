import Asset from "@/pages/Asset/Asset";
import Market from "@/pages/Market/Market";
import Order from "@/pages/Order/Order";
import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../utils";
import { Tab } from "./Tab";
import React, { FunctionComponent } from 'react'
import LoginOut from "@/pages/Asset/LoginOut";
import Search from "@/pages/Home/Search";
import NtfDetail from "@/pages/Market/NtfDetail";
import Buy from "@/pages/Market/Buy/Buy";
import Sell from "@/pages/Asset/Sell/Sell";
import Category from "@/pages/Home/Category/Category";
import TestHome from "@/pages/Asset/WalletTest/TestHome";
import CoinTypeManage from "@/pages/Asset/WalletTest/CoinTypeManage";
import CreatWallet from "@/pages/Asset/WalletTest/CreatWallet";
import InsertWallet from "@/pages/Asset/WalletTest/InsertWallet";
import TransferCoin from "@/pages/Asset/WalletTest/TransferCoin";
import CenterWallet from "@/pages/Asset/CenterWallet/CenterWallet";
import CollectionDetail from "@/pages/Home/CollectionDetail/CollectionDetail";
import MnemonicPage from "@/pages/Asset/MnemonicPage/MnemonicPage";
import CreactCWallet from "@/pages/Asset/ChainWallet/CreactCWallet/CreactCWallet";
import MnemonicPage2 from "@/pages/Asset/MnemonicPage/MnemonicPage2";
import MnemonicPage3 from "@/pages/Asset/MnemonicPage/MnemonicPage3";
const ScreenStack = createStackNavigator();

const Screen: FunctionComponent = () => {
    return (
        <ScreenStack.Navigator>
            <ScreenStack.Screen name={Route.SCREEN.Tab} component={Tab} options={{ headerShown: false }} />
            <ScreenStack.Screen name={Route.SCREEN.LoginOut} component={LoginOut}/>
            <ScreenStack.Screen name={Route.SCREEN.Search} component={Search}/>
            <ScreenStack.Screen name={Route.SCREEN.Market} component={Market}/>
            <ScreenStack.Screen name={Route.SCREEN.NtfDetail} component={NtfDetail}  options={{ title: ' ' }}/>
            <ScreenStack.Screen name={Route.SCREEN.Buy} component={Buy}/>
            <ScreenStack.Screen name={Route.SCREEN.Sell} component={Sell}/>
            <ScreenStack.Screen name={Route.SCREEN.Category} component={Category}/>
            <ScreenStack.Screen name={Route.SCREEN.TestHome} component={TestHome}/>
            <ScreenStack.Screen name={Route.SCREEN.CoinTypeManage} component={CoinTypeManage}/>
            <ScreenStack.Screen name={Route.SCREEN.CreatWallet} component={CreatWallet}/>
            <ScreenStack.Screen name={Route.SCREEN.TransferCoin} component={TransferCoin}/>
            <ScreenStack.Screen name={Route.SCREEN.InsertWallet} component={InsertWallet}/>
            <ScreenStack.Screen name={Route.SCREEN.CenterWallet} component={CenterWallet}/>
            <ScreenStack.Screen name={Route.SCREEN.MnemonicPage} component={MnemonicPage}/>
            <ScreenStack.Screen name={Route.SCREEN.CreactCWallet} component={CreactCWallet}/>
            <ScreenStack.Screen name={Route.SCREEN.MnemonicPage2} component={MnemonicPage2}/>
            <ScreenStack.Screen name={Route.SCREEN.MnemonicPage3} component={MnemonicPage3}/>
            
        </ScreenStack.Navigator>
    )
}

export default Screen