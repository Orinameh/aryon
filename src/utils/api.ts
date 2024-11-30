import axios, { InternalAxiosRequestConfig } from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API Calls

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.token) {
      config.headers.set("Authorization", `Bearer ${user.token}`);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errStatus = error.response.status;
    // const errMsg = error.response.data.message;
    if (errStatus === 401) {
      // Logout the user or refresh token
    }
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    if (error.request) {
      return Promise.reject(error.request);
    }

    return Promise.reject(error.request);
  }
);
