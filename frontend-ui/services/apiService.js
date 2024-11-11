import axios from "axios";

const apiUrl = "https://qa-test-9di7.onrender.com";

const getToken = () => localStorage.getItem("token") || null;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const apiService = {
  request: async ({ method, url, data = null, params = null, headers = {} }) => {
    try {
      const options = {
        method,
        url,
        params,
        headers,
      };

      if (method !== "DELETE") {
        options.data = data;
      }

      const response = await apiClient(options);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default apiService;
