'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface User {
    userId: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    signup: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
    login: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem('authToken');
                const userId = localStorage.getItem('userId');
                const userData = localStorage.getItem('userData');

                if (token && userId && userData) {
                    setUser({
                        userId,
                        token,
                        email: JSON.parse(userData).email
                    });
                }
            } catch (error) {
                console.error('Error reading from localStorage:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token, userId, user: userData } = response.data;

            if (token && userId) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('userData', JSON.stringify(userData || { email }));

                setUser({
                    userId,
                    token,
                    email: userData?.email || email
                });

                return { success: true, data: response.data };
            } else {
                return {
                    success: false,
                    error: 'Invalid login response: missing token or userId'
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || error.response?.data?.error || 'Login failed'
            };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {

            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userData');
            setUser(null);
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            const response = await authAPI.signup({ email, password });
            return { success: true, data: response.data };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || error.response?.data?.error || 'Signup failed'
            };
        }
    };

    const value: AuthContextType = {
        user,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};