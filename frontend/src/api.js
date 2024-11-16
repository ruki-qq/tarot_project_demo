import axios from "axios";
import { isEmpty } from "./utils";

export const API_URL = "http://localhost:8000/api/v1";

export const $api = axios.create({
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!isEmpty(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
