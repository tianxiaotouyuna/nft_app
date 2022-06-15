
import Axios, { AxiosRequestConfig, Method } from "axios";
import dayjs from "dayjs";
import { Storage } from "@/utils/index";
import Constants, { CacheKeys } from "@/constants/index";
import jquery from "@/utils/jquery";
import { assign } from "lodash";
import { Alert, Platform } from "react-native";

const DEFAULT_TIMEOUT = 50000;

const instance = Axios.create({
    baseURL: Constants.BASE_IMITATE_HOST,
    timeout: DEFAULT_TIMEOUT,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'os': Platform.OS,
    }
});

export const getUrl = (api: string, data?: any) => {
    return `${Constants.BASE_IMITATE_HOST}/${api}?${!!data ? `${jquery.param(data)}` : ""}`;
}

const json = async (api: string, data: any = {}, config?: AxiosRequestConfig) => {
    console.log('url======'+JSON.stringify(getUrl(api,data)))
    const resp: any = await instance.get(getUrl(api,{}), config);
    if (resp?.status === 200) {
        // Alert.alert(JSON.stringify(resp?.data))
        return Promise.resolve(resp?.data);
    } else {
        Alert.alert(JSON.stringify(resp?.data))
        return Promise.reject(resp);
    }
}


export const get = (api: string, data?: any, config?: AxiosRequestConfig) => {
  return json(api, data, config);
}
export const post = (api: string, data?: any, config?: AxiosRequestConfig) => {
    return json(api, data, config);
}