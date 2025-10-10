import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';

const useGetUserProfileByUsername = (username: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);

            try {
                const usernameQuery = query(collection(firestore, 'users'), where('username', '==', username));
                const usernameQuerySnapshot = await getDocs(usernameQuery);

                if (usernameQuerySnapshot.empty) {
                    return setUserProfile(null);
                }

                let userDoc;

                usernameQuerySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                setUserProfile(userDoc);
            } catch (error) {
                if (error instanceof Error) {
                    showToast('Error', error.message, 'error');
                } else {
                    showToast('Error', 'An unexpected error occurred', 'error');
                }
            } finally {
                setIsLoading(false);
            }
        };

        void getUserProfile();
    }, [setUserProfile, username, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
