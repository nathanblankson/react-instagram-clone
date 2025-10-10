import { create } from 'zustand';
import type { User } from './authStore.tsx';

export interface UserProfileState {
    userProfile: User | null;
    setUserProfile: (profile: any) => void;
    // addPost: (post: any) => void;
}

const useUserProfileStore = create<UserProfileState>((set) => ({
    userProfile: null,
    setUserProfile: (profile: any) => set({ userProfile: profile }),
    // addPost
}));

export default useUserProfileStore;
