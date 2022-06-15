// import { ReduxToken } from "@/constants";
import { ReduxToken } from "../constants";
import { clone, cloneDeep } from "lodash";
import { AnyAction } from "redux";
import { Alert } from "react-native";

const initState = {
  walletInfo: { address: "qq" },
  userInfo: {},
  isInitNewUser: false,
};

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ReduxToken.SET_WalletINFO: {
  const { walletInfo } = action?.payload;
  return cloneDeep({ ...state, walletInfo });
    }
    case ReduxToken.SET_ISINITNEWUSER: {
      const { isInitNewUser } = action?.payload;
      return cloneDeep({ ...state, isInitNewUser });
    }
    default: {
      return state;
    }
  }
};
