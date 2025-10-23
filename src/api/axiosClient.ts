import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig
} from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const axiosClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
    // withCredentials: true
});

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
