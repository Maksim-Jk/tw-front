import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { IResponse, QueryParams } from './global.types';
import { TokenService } from '@/services/token.service';
import ToastEventBus from 'primevue/toasteventbus';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  transformResponse: [
    (data): unknown => {
      const parsedData = JSON.parse(data);
      return parsedData;
    },
  ],
});

api.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Something went wrong';

    if (error.response) {
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (Array.isArray(error.response.data?.errors)) {
        errorMessage = error.response.data.errors[0];
      } else if (error.response.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      }
      ToastEventBus.emit('add', {
        summary: 'Error',
        detail: errorMessage,
        severity: 'error',
        life: 1500,
      });

      return Promise.reject(error);
    }
  }
);

const apiService = {
  async get<T>(url: string, config?: AxiosRequestConfig<unknown>): Promise<IResponse<T>> {
    const response = await api.get<IResponse<T>>(url, config);
    return response.data;
  },

  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<IResponse<T>> {
    const response = await api.post<IResponse<T>>(url, data, config);
    return response.data;
  },

  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<IResponse<T>> {
    const response = await api.put<IResponse<T>>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig<unknown>): Promise<IResponse<T>> {
    const response = await api.delete<IResponse<T>>(url, config);
    return response.data;
  },
};

export { api, apiService };
