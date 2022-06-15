import { walletConstants } from "@/constants/walletConstants";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { CacheKeys } from "../constants";
import { Storage } from "../utils";

/*
 The export statement is used to export the only function in the file so that the function can be called using `walletsActions.connect()`
 */
export const walletActions = {
  connect,
  disconnect,
  buy,
  resetResult,
  approve
};

function resetResult(data:any) {
  return (dispatch: any) => {
      dispatch(resetBuy(data));
    };
  }

function buy(connector:any,data:any) {
return (dispatch: any) => {
connector.sendTransaction(data).then(async function (result: any) {
    console.log("成功：" + JSON.stringify(result));
    Alert.alert(JSON.stringify(result))
    dispatch(buyResult(result));
  })
  .catch(function (error: any) {
    dispatch(buyResult(error));
    console.log("失败：" + JSON.stringify(error));
    dispatch(buyResult(JSON.stringify(error)));
  });
};
}

//授权
function approve(connector:any,data:any) {
  return (dispatch: any) => {
  connector.approveSession(data).then(async function (result: any) {
      console.log("成功：" + JSON.stringify(result));
      Alert.alert(JSON.stringify(result))
      dispatch(approveNtf(result));
    })
    .catch(function (error: any) {
      dispatch(approveNtf(error));
      console.log("失败：" + JSON.stringify(error));
      // dispatch(approveNtf(JSON.stringify(error)));
    });
  };
  }

function connect(connector) {
  return (dispatch: any) => {
    let asyncConnect = () =>
      connector
        .connect()
        .then(async function (result: any) {
          console.log("成功：" + JSON.stringify(result));
          dispatch(success(result));
          await Storage.save(CacheKeys.WALLETINFO, result);

        })
        .catch(function (error: any) {
          console.log("失败：" + error);
          dispatch(failure(error));
        });

    dispatch(request("Connecting to wallet"));
    asyncConnect();
  };
}


//These are the function calls which are dispatched when the user makes a request. The state of the app changes with the status of the request response.
function request(message: string) {
  return { type: walletConstants.CONNECT_REQUEST, message };
}
function success(res: object) {
  return { type: walletConstants.CONNECT_SUCCESS, res };
}
function failure(error: any) {
  return { type: walletConstants.CONNECT_FAILURE, error };
}
function buyResult(res: string) {
  return { type: walletConstants.BUY_RESULT, res };
}

function resetBuy(res: object) {
  return { type: walletConstants.CLEAR_BUY_RESULT, res };
}
function approveNtf(res: object) {
  return { type: walletConstants.CLEAR_BUY_RESULT, res };
}
function disconnect(connector) {
  return async (dispatch: any) => {
    // This dispatch calls a function that is declared later on in the code.
    let asyncDisconnect = async () => {
      await connector.killSession();
    };
    await Storage.remove(CacheKeys.WALLETINFO);
    dispatch(requestDisconnect("Disconnecting from wallet"));
    asyncDisconnect();
  };
  function requestDisconnect(message: string) {
    return { type: walletConstants.DISCONNECT_REQUEST, message };
  }


}
