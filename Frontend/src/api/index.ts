import axios, {AxiosRequestConfig} from 'axios';
import {isProduction} from "src/utils";

const defaultAxiosSettings: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

const axiosInstance = axios.create({
    baseURL: isProduction
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL,
    ...defaultAxiosSettings,
});

export default axiosInstance;