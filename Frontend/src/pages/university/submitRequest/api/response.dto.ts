import {BaseResponse} from "src/types";

export interface AccessTokenData {
    studentId: string;
    type: string;
    companyId: string;
    location: string;
  }

  export interface SubmitRequestResponse extends BaseResponse {
    tokenData: AccessTokenData;
  }