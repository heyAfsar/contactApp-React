import axios from "axios";
import { addQueryArg } from "./commons";
import { prepareFinalObject } from "../ui-redux/screen-configuration/actions";
import store from "../ui-redux/store";

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info")) || {};
  return userInfo.access_token;
};

let axiosInstances = {
  instanceOne: axios.create({
    baseURL: process.env.NODE_ENV !== 'production'?window.location.origin:" https://contactapp-mexn-crashtech.herokuapp.com",
    headers: {
      "Content-Type": "application/json"
    }
  }),
  instanceTwo: axios.create({
    baseURL: process.env.NODE_ENV !== 'production'?window.location.origin:"https://tollplus.agsindia.com:8443",
    headers: {
      "Content-Type": "application/json",
      "APIClient_ID":"90000039",
      "API_KEY":"19F172708A19C13EC1DEBD7225336DFD25D4B33EA5DA10F978292DB13E65ED531C3121",
      "Access-Control-Allow-Origin": "*"
    }
  }),
  
  instanceThree: axios.create({
    baseURL: process.env.NODE_ENV !== 'production'?window.location.origin:"https://api.msg91.com",
    headers: {
      "Content-Type": "application/json"
    }
  }),
  instanceFour: axios.create({
    baseURL: process.env.NODE_ENV !== 'production'?window.location.origin:"https://logistics.fastaggpay.com",
    headers: {
      "Content-Type": "application/json",
      "Client-Access-Token":"824jdfbhdsQRRHGDHYYnscnvvjfd133bfbjjj7823"
    }
  })
};

const wrapRequestBody = requestBody => {
  return requestBody;
};
export const httpRequest = async ({
  method = "post",
  endPoint,
  queryObject = [],
  requestBody = {},
  instance = "instanceOne",
  hasSpinner = true
}) => {
  if (hasSpinner) {
    store.dispatch(prepareFinalObject("spinner", true));
  }
  let apiError = "Api Error";
// let at="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJqdGkiOiIyOTdiZDdlZC1mOThiLTQwN2EtODI1Ny01MDQ1MTZmYjRiNGQiLCJuYmYiOjE1OTc1MTg3MzUsImV4cCI6MTU5NzUxOTYzNSwiaWF0IjoxNTk3NTE4NzM1LCJpZGVudGl0eSI6ImRtVnlhWE50WVhKMCJ9.7z8Rt_PghrFPHxoNxvKL1FShnbHQfqe2hEsanW0szqo"
  var headerConfig = {
   // headers: { Authorization: `Bearer ${at}` }
     headers: { Authorization: `Bearer ${getToken()}` }
  };

  endPoint = addQueryArg(endPoint, queryObject);
  var response;
  try {
    switch (method) {
      case "post":
        response = await axiosInstances[instance].post(
          endPoint,
          wrapRequestBody(requestBody),
          headerConfig
        );
        break;
      default:
        response = await axiosInstances[instance].get(endPoint);
    }
    const responseStatus = parseInt(response.status, 10);
    if (hasSpinner) {
      store.dispatch(prepareFinalObject("spinner", false));
    }
    if (responseStatus === 200 || responseStatus === 201) {
     return response.data;
    }
  } catch (error) {
    const { data, status } = error.response;
    if(status && status === 401){
      apiError = status
    }
   else if (status && status === 400 && data && data === "") {
      apiError = "INVALID_TOKEN";
    }
    else {
      apiError = data;
    }
    if (hasSpinner) {
      store.dispatch(prepareFinalObject("spinner", false));
    }
  }

  return apiError;
};
