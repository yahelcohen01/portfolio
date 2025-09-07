import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { logger } from "./logger";

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
      logger.info(
        `Making ${config.method?.toUpperCase()} request to: ${config.url}`
      );
    }
    return config;
  },
  (error) => {
    logger.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      logger.info(
        { ...response },
        `Response from ${response.config.url}: ${response.status}`
      );
    }
    return response;
  },
  (error) => {
    // Log error details
    if (error.response) {
      logger.error(
        {
          url: error.config?.url,
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        },
        `API Error ${error.response.status}:`
      );
    } else if (error.request) {
      logger.error(
        {
          url: error.config?.url,
          message: error.message,
        },
        "Network Error:"
      );
    } else {
      logger.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Helper function for GET requests with Next.js revalidation
export const get = async <TPayload, TResponse>({
  url,
  payload,
  revalidateSeconds,
}: {
  url: string;
  payload?: TPayload;
  revalidateSeconds?: number;
}): Promise<AxiosResponse<TResponse>> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url,
    params: payload,
  };

  // Add Next.js revalidation if specified
  if (revalidateSeconds) {
    config.headers = {
      ...config.headers,
      "Cache-Control": `max-age=${revalidateSeconds}`,
    };
  }

  return axiosInstance<TResponse>(config);
};

// Helper function for POST requests with Next.js revalidation
export const post = async <TData, TResponse>({
  url,
  data,
  revalidateSeconds,
}: {
  url: string;
  data?: TData;
  revalidateSeconds?: number;
}): Promise<AxiosResponse<TResponse>> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url,
    data,
  };

  // Add Next.js revalidation if specified
  if (revalidateSeconds) {
    config.headers = {
      ...config.headers,
      "Cache-Control": `max-age=${revalidateSeconds}`,
    };
  }

  return axiosInstance<TResponse>(config);
};

// Helper function for PUT request
export const put = async <TData, TResponse>({
  url,
  data,
}: {
  url: string;
  data?: TData;
}): Promise<AxiosResponse<TResponse>> => {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url,
    data,
  };

  return axiosInstance<TResponse>(config);
};

// Helper function for DELETE request
export const del = async <TPayload, TResponse>({
  url,
  payload,
}: {
  url: string;
  payload?: TPayload;
}): Promise<AxiosResponse<TResponse>> => {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
    params: payload,
  };

  return axiosInstance<TResponse>(config);
};

// Helper function for text responses
export const getTextWithRevalidation = async <TPayload, T extends string>({
  url,
  payload,
  revalidateSeconds,
}: {
  url: string;
  payload?: TPayload;
  revalidateSeconds?: number;
}): Promise<T> => {
  const response = await get<TPayload, T>({
    url,
    payload,
    revalidateSeconds,
  });
  return response.data;
};

export default axiosInstance;
