// import { ReduxToken } from "@/constants";
import { ReduxToken } from "../constants";
import { clone, cloneDeep } from "lodash";
import { AnyAction } from "redux";
import { Alert } from "react-native";

const initState = {
  title:'首页',
  headerTitleAlign:String,
};

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ReduxToken.SET_TABNAVCHANGE: {
  const { options } = action?.payload;
  return cloneDeep({ ...state, options });
    }
    default: {
      return state;
    }
  }
};
