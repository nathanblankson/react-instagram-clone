import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import type { User } from '../store/authStore.tsx';
import useShowToast from './useShowToast';

// TODO: NBSon - expand on this to allow for matching users by username and returning a list of users
const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const showToast = useShowToast();

    const getUserProfile = async (username: string) => {
        setIsLoading(true);
        setUser(null);

        try {
            const usernameQuery = query(collection(firestore, 'users'), where('username', '==', username));
            const usernameQuerySnapshot = await getDocs(usernameQuery);

            if (usernameQuerySnapshot.empty) {
                return showToast('Error', 'User not found', 'error');
            }

            usernameQuerySnapshot.forEach((doc) => {
                setUser(doc.data() as User);
            });
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else {
                showToast('Error', 'An unexpected error occurred', 'error');
            }

            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
