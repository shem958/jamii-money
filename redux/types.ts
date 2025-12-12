// redux/types.ts
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    payday?: number;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
}