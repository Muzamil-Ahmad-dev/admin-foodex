 import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";
  // "http://localhost:5000/api";

// Admin Axios instance
const adminAxios = axios.create({
  baseURL: API_URL,
  // No need for withCredentials since we use headers
});

/* -------------------------
   Request Interceptor
   - Attach access token from sessionStorage
------------------------- */
adminAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* -------------------------
   Response Interceptor
   - Refresh access token on 401
------------------------- */
const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const res = await adminAxios.post("/auth/refresh", null, {
      headers: { "x-refresh-token": refreshToken },
    });

    const newAccessToken = res.headers["x-access-token"];
    if (newAccessToken) {
      sessionStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("Failed to refresh token:", err.response?.data?.message || err.message);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    return null;
  }
};

adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return adminAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
