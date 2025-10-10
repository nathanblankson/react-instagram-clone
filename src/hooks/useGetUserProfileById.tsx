import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import type { User } from '../store/authStore.tsx';
import useShowToast from './useShowToast';

const useGetUserProfileById = (userId: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<User | null>(null);

    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setUserProfile(null);

            try {
                const userRef = await getDoc(doc(firestore, 'users', userId));
                
                if (userRef.exists()) {
                    setUserProfile(userRef.data() as User);
                }
            } catch (error) {
                if (error instanceof Error) {
                    showToast('Error', error.message, 'error');
                } else {
                    showToast('Error', 'An unknown error occurred', 'error');
                }
            } finally {
                setIsLoading(false);
            }
        };

        void getUserProfile();
    }, [showToast, setUserProfile, userId]);

    return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
