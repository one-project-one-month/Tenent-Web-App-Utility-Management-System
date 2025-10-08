import store from "@/store/store";
import axios from "axios";

const BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:3000/api/v1/";

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // This is crucial for sending HttpOnly cookies (for refresh token)
});

// retrieve the access token from the auth store
let ACCESS_TOKEN: string | null = null;

let isRefreshing = false;
// Varible to queue requests while the token is being refreshed
const failedQueue: any = [];

// Function to resolve the waiting api queues after the token is refreshed
const processQueue = ((error: any, token: null | string = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })

  failedQueue.length = 0;
})

apiClient.interceptors.request.use((config) => {
  ACCESS_TOKEN = store.getState().auth.accessToken;
	if (ACCESS_TOKEN) {
		config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
	} else {
    alert("Token is missing")
  }

	return config;
});

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/auth/refresh-token`)
          .then(({ data }) => {
            ACCESS_TOKEN = data.accessToken;
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
            originalRequest.headers['Authorization'] = 'Bearer ' + ACCESS_TOKEN;
            processQueue(null, ACCESS_TOKEN);
            resolve(apiClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            ACCESS_TOKEN = null;
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      })
    }
    return Promise.reject(error);
  }
);

// Function to be called on app startup to get the initial access token.
export const silentRefresh = async () => {
  try {
    const { data } = await apiClient.post('/auth/refresh');
    ACCESS_TOKEN = data.accessToken;
  } catch (error) {
    console.error('Could not silently refresh token:', error);
    ACCESS_TOKEN = null;
  }
};

export default apiClient;