import { create } from 'zustand';

interface UserProfileState {
    userProfile: any;
    setUserProfile: (profile: any) => void;
    // addPost: (post: any) => void;
}

const useUserProfileStore = create<UserProfileState>((set) => ({
    userProfile: null,
    setUserProfile: (profile: any) => set({ userProfile: profile }),
    // addPost
}));

export default useUserProfileStore;
