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
                localStorage.removeItem('userData');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    verifyEmail: (token) => api.get(`/auth/verify?token=${token}`),
    logout: () => api.post('/auth/logout'),
};

export const profileAPI = {
    getProfile: () => api.get('/profile/talent/me'), // Remove userId param
    createOrUpdateProfile: (data, profileData) => api.post('/profile/talent', data),
};

export const jobsAPI = {
    getAllJobs: (filters = {}) => api.get('/jobs', { params: filters }),
    getMatchingJobs: () => api.get('/jobs/matching'), // Remove userId param
    getJobById: (jobId) => api.get(`/jobs/${jobId}`),
    createJob: (data) => api.post('/jobs', data),
    updateJob: (jobId, data) => api.put(`/jobs/${jobId}`, data),
    deleteJob: (jobId) => api.delete(`/jobs/${jobId}`),
};

export default api;