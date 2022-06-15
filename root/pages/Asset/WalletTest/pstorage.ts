//jeffyan

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export default{

//创建钱包
async new_wallet (address:string,keyStore:string,name:string,icon:string){
	//AsyncStorage.setItem("wallets",)
	let new_wallet = {address:address,keyStore:keyStore,name:name,icon:icon};
	

	let ret_wallets =await AsyncStorage.getItem("wallets");

	let arr_wallets = [];

	if(ret_wallets){

		arr_wallets = JSON.parse(ret_wallets);

	}


	for (var i = arr_wallets.length - 1; i >= 0; i--) {
		if(arr_wallets[i].address == address){
			return;
		}
	}

	arr_wallets.push(new_wallet);
	
	await AsyncStorage.setItem("wallets",JSON.stringify(arr_wallets));

	await this.new_asset_to_wallet('ETH',new_wallet.address);
	//await this.new_asset_to_wallet('0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',new_wallet.address);
	
	
},

//所有钱包
async wallets () {
	let ret_wallets =await AsyncStorage.getItem("wallets");

	let arr_wallets = [];

	if(ret_wallets){

		arr_wallets = JSON.parse(ret_wallets);

	}
	
	return arr_wallets;
}
,

//钱包
async wallet (address:any) {
	let ret_wallets =await AsyncStorage.getItem("wallets");

	let arr_wallets = [];
	// Alert.alert(JSON.stringify(ret_wallets))

	if(ret_wallets){

		arr_wallets = JSON.parse(ret_wallets);

	}

	for (var i = arr_wallets.length - 1; i >= 0; i--) {
		if( arr_wallets[i].address == address){
			return arr_wallets[i];
		}
	}

	
	return null;
}
,

//所有代币
async assets () {
	let ret_assets = await AsyncStorage.getItem("assets");

	let arr_assets = [];

	if(ret_assets){

		arr_assets = JSON.parse(ret_assets);

	}
	
	return arr_assets;
},

//新代币
async new_asset (address:string,abi:string,name:string,icon:string){
	//AsyncStorage.setItem("wallets",)
	let new_asset = {address:address,abi:abi,name:name,icon:icon};
	

	let ret_assets =await AsyncStorage.getItem("assets");

	let arr_assets = [];

	if(ret_assets){

		arr_assets = JSON.parse(ret_assets);

	}
	arr_assets.push(new_asset);

	await AsyncStorage.setItem("assets",JSON.stringify(arr_assets));
	
},

//初始化测试用代币
async init_default_assets(){

	//await this.clear_wallets();

	let ret_assets =await AsyncStorage.getItem("assets");
	// if(ret_assets)
	// 	return ;
	let arr_assets = [];
	arr_assets.push({address:"ETH",abi:"",decimal:18,name:"ETH",icon:"https://cn.etherscan.com/images/main/empty-token.png"});
	arr_assets.push({address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",abi:"",decimal:18,name:"USDT(ERC-20)",icon:"https://cn.etherscan.com/token/images/tether_32.png"});
	arr_assets.push({address:"0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",abi:"",decimal:18,name:"HEX",icon:"https://cn.etherscan.com/token/images/hex_32.png"});
	arr_assets.push({address:"0x3845badAde8e6dFF049820680d1F14bD3903a5d0",abi:"",decimal:18,name:"SAND",icon:"https://cn.etherscan.com/token/images/sand_32.png"});
	arr_assets.push({address:"0x3506424F91fD33084466F402d5D97f05F8e3b4AF",abi:"",decimal:18,name:"chiliZ",icon:"https://cn.etherscan.com/token/images/chiliz_28.png"});
	arr_assets.push({address:"0x45804880De22913dAFE09f4980848ECE6EcbAf78",abi:"",decimal:18,name:"Paxos Gold",icon:"https://cn.etherscan.com/token/images/paxosgold_32.png"});
	//arr_assets.push({address:"xxx2",abi:"aaaa",name:"ETH",icon:""});
	await AsyncStorage.setItem("assets",JSON.stringify(arr_assets));
},

//添加代币到钱包
async new_asset_to_wallet(address:string,wallet_addr:string){

	let ret_assets = await AsyncStorage.getItem(wallet_addr);
	
	let arr_assets = [];

	if(ret_assets){

		arr_assets = JSON.parse(ret_assets);

	}

	if(!arr_assets.includes(address)){
		arr_assets.push(address);
	}
	

	await AsyncStorage.setItem(wallet_addr,JSON.stringify(arr_assets));
},

//从钱包删除代币
async del_asset_from_wallet(address:string,wallet_addr:string){

	let ret_assets = await AsyncStorage.getItem(wallet_addr);
	
	let arr_assets = [];

	if(ret_assets){

		arr_assets = JSON.parse(ret_assets);

	}

	for (var i = arr_assets.length - 1; i >= 0; i--) {
		if( arr_assets[i] == address){
			arr_assets.splice(i,1);
			break;
		}
	}
	

	await AsyncStorage.setItem(wallet_addr,JSON.stringify(arr_assets));
},

//取得代币
async asset(address:string){
	let ret_assets =await AsyncStorage.getItem("assets");
	let arr_assets = [];

	if(ret_assets){

		arr_assets = JSON.parse(ret_assets);

	}
	for (var i = arr_assets.length - 1; i >= 0; i--) {
		if(arr_assets[i].address == address){
			return arr_assets[i];
		}
	}

	return null;
},

//取得钱包里的所有代币
async assets_for_wallet(wallet_addr:string){

	let ret_assets = await AsyncStorage.getItem(wallet_addr);
	
	let arr_assets = [];

	if(ret_assets){

		arr_assets = JSON.parse(ret_assets);

	}

	return arr_assets;
},

//删除钱包
async del_walllet(address:string){

	if(address==null||address.length==0) return;

	let ret_wallets =await AsyncStorage.getItem("wallets");

	let arr_wallets = [];

	if(ret_wallets){

		arr_wallets = JSON.parse(ret_wallets);

	}

	for (var i = arr_wallets.length - 1; i >= 0; i--) {
		if(arr_wallets[i].address==address){
			arr_wallets.splice(i,1);
			break;
		}
	}

	await AsyncStorage.setItem("wallets",JSON.stringify(arr_wallets));
},

//清除所有钱包
async clear_wallets(){

	await AsyncStorage.setItem("wallets",JSON.stringify([]));

}


}