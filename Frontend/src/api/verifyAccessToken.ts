import axiosInstance from "src/api/index";
import {LoginResponse} from "src/pages/Login/api/response.dto";

const verifyAccessToken = async () => {
    const url = "/auth/verifyAccessToken";
    return axiosInstance.get<LoginResponse>(url).then(res => res.data);
};

export default verifyAccessToken;