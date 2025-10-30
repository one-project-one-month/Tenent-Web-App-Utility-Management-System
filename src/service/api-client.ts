/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "@/store/store";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Local state encapsulated inside this function
  let isRefreshing = false;
  let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
  }[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
    });
    failedQueue = [];
  };

  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const ACCESS_TOKEN: string | null = store.getState().auth.accessToken;
    if (ACCESS_TOKEN) {
      config.headers = config.headers ?? ({} as Record<string, string>);
      (config.headers as Record<string, string>).Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  });

  // Response interceptor → handle token refresh
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        const url = originalRequest.url || "";

        if (
          url.includes("auth/refresh-token") ||
          url.includes("auth/login") ||
          url.includes("auth/logout")
        ) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            null,
            {
              withCredentials: true,
            }
          );

          const ACCESS_TOKEN = data.accessToken;
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${ACCESS_TOKEN}`;
          originalRequest.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
          processQueue(null, ACCESS_TOKEN);

          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  // Silent refresh helper
  const silentRefresh = async () => {
    try {
      const { data } = await apiClient.post("/auth/refresh");
      const ACCESS_TOKEN = data.accessToken;
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${ACCESS_TOKEN}`;
      return ACCESS_TOKEN;
    } catch (error) {
      console.error("Could not silently refresh token:", error);
      return null;
    }
  };

  return { apiClient, silentRefresh };
};

// Export initialized instance
const { apiClient, silentRefresh } = createApiClient();

export { silentRefresh };
export default apiClient;
