export interface User {
    userId: string
    token: string
}

export interface AuthResponse {
    success: boolean
    data?: any
    error?: string
    redirectTo?: string
}

export interface AuthContextType {
    user: User | null
    signup: (email: string, password: string) => Promise<AuthResponse>
    login: (email: string, password: string) => Promise<AuthResponse>
    logout: () => Promise<void>
    loading: boolean
}