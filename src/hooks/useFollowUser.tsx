import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';

const useFollowUser = (userId: string) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const authUser = useAuthStore((state) => state.authUser);
    const setAuthUser = useAuthStore((state) => state.setAuthUser);

    const { userProfile, setUserProfile } = useUserProfileStore();

    const showToast = useShowToast();

    const handleFollowUser = async () => {
        if (!authUser) {
            showToast('Error', 'You must be logged in to follow users', 'error');
            return;
        }

        setIsUpdating(true);
        try {
            const currentUserRef = doc(firestore, 'users', authUser.uid);
            const userToFollowOrUnfollowRef = doc(firestore, 'users', userId);

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
            });

            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });


            if (isFollowing) {
                // Unfollow
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter((uid) => uid !== userId),
                });

                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
                    });
                }

                localStorage.setItem(
                    'user-info',
                    JSON.stringify({
                        ...authUser,
                        following: authUser.following.filter((uid) => uid !== userId),
                    })
                );

                setIsFollowing(false);
            } else {
                // Follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId],
                });

                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid],
                    });
                }

                localStorage.setItem(
                    'user-info',
                    JSON.stringify({
                        ...authUser,
                        following: [...authUser.following, userId],
                    })
                );

                setIsFollowing(true);
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else {
                showToast('Error', 'An unexpected error occurred', 'error');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
