import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Create a global axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Making ${config.method?.toUpperCase()} request to: ${config.url}`
      );
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log(`Response from ${response.config.url}: ${response.status}`);
    }
    return response;
  },
  (error) => {
    // Log error details
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, {
        url: error.config?.url,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("Network Error:", {
        url: error.config?.url,
        message: error.message,
      });
    } else {
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Helper function for GET requests with Next.js revalidation
export const getWithRevalidation = async (
  url: string,
  revalidateSeconds?: number
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url,
  };

  // Add Next.js revalidation if specified
  if (revalidateSeconds) {
    config.headers = {
      ...config.headers,
      "Cache-Control": `max-age=${revalidateSeconds}`,
    };
  }

  return axiosInstance(config);
};

// Helper function for text responses
export const getTextWithRevalidation = async (
  url: string,
  revalidateSeconds?: number
): Promise<string> => {
  const response = await getWithRevalidation(url, revalidateSeconds);
  return response.data;
};

export default axiosInstance;
