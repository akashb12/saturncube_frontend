import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: "http://localhost:4000/users",
  headers: {
    ["Content-Type"]: "application/json",
  },
});
axiosRequest.interceptors.request.use(function (config) {
  const token = document.cookie.split("=")[1];
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
