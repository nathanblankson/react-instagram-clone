import { create } from 'zustand';

export interface User {
    uid: string;
    fullName: string;
    username: string;
    email: string;
    bio: string;
    profilePicURL: string;
    followers: any[];
    following: any[];
    posts: any[];
    /** Timestamp in milliseconds */
    createdAt: number;
}

export interface AuthState {
    authUser: User | null;
    login: (user: User) => void;
    logout: () => void;
    setAuthUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    authUser: JSON.parse(localStorage.getItem('user-info') || 'null'),
    login: (user: User) => set({ authUser: user }),
    logout: () => set({ authUser: null }),
    setAuthUser: (user: User) => set({ authUser: user }),
}));

export default useAuthStore;
