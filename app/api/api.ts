import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userId');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);


interface SignupData {
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const authAPI = {
    signup: (data: SignupData) => api.post('/auth/signup', data),
    login: (data: LoginData) => api.post('/auth/login', data),
    verifyEmail: (token: string) => api.get(`/auth/verify?token=${token}`),
    logout: (userId: string) => api.post('/auth/logout', null, { params: { userId } }),
};

export const profileAPI = {
    getProfile: (userId: string) => api.get(`/profile/talent/me?userId=${userId}`),
    createOrUpdateProfile: (userId: string, data: any) => api.post(`/profile/talent/${userId}`, data),
};

export default api;