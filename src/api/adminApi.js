 import axios from "axios";

const API_URL = "/api"; // relative path works with Vercel proxy

const adminAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // allows refresh token cookie
});

// Attach access token from sessionStorage for protected requests
adminAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper: refresh access token
const refreshAccessToken = async () => {
  try {
    const res = await adminAxios.post("/auth/refresh"); // backend reads refreshToken cookie
    const { accessToken } = res.data;

    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      return accessToken;
    }

    return null;
  } catch (err) {
    console.error(
      "Failed to refresh token:",
      err.response?.data?.message || err.message
    );
    sessionStorage.removeItem("accessToken"); // logout if refresh fails
    return null;
  }
};

// Response interceptor to handle expired access token (401)
adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Try refreshing access token
      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return adminAxios(originalRequest); // retry original request
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
