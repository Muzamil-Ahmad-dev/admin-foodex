import axios from "axios";
import store from "../app/store"; // make sure the path matches your project

const BASE_URL = "https://foodex-backend--muzamilsakhi079.replit.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // always send cookies (refresh token)
});

//  Axios interceptor automatically attaches accessToken
api.interceptors.request.use((config) => {
  const { user, accessToken } = store.getState().auth;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
