import { create } from 'zustand';
import type { User } from './authStore.tsx';

export interface UserProfileState {
    userProfile: User | null;
    setUserProfile: (profile: User) => void;
    addPost: (post: { id: string }) => void;
    deletePost: (postId: string) => void;
}

const useUserProfileStore = create<UserProfileState>((set) => ({
    userProfile: null,
    setUserProfile: (profile) => {
        set({ userProfile: profile });
    },
    // this is used to update the number of posts in the profile page
    addPost: (post) => {
        set((state) => {
            if (!state.userProfile) {
                return state;
            }

            return {
                userProfile: {
                    ...state.userProfile,
                    posts: [post.id, ...state.userProfile.posts]
                },
            };
        });
    },
    deletePost: (postId) => {
        set((state) => {
            if (!state.userProfile) {
                return state;
            }

            return {
                userProfile: {
                    ...state.userProfile,
                    posts: state.userProfile.posts.filter((id) => id !== postId),
                },
            };
        });
    },
}));

export default useUserProfileStore;
