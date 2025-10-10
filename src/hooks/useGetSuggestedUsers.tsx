import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore, { type User } from '../store/authStore';
import useShowToast from './useShowToast';

export interface SuggestedUser extends User {
    id: string;
}

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
    const authUser = useAuthStore((state) => state.authUser);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            if (!authUser) {
                return;
            }

            setIsLoading(true);

            try {
                const usersRef = collection(firestore, 'users');
                const suggestedUsersQuery = query(
                    usersRef,
                    where('uid', 'not-in', [authUser.uid, ...authUser.following]),
                    orderBy('uid'),
                    limit(3)
                );

                const suggestedUsersQuerySnapshot = await getDocs(suggestedUsersQuery);
                const users: SuggestedUser[] = [];

                suggestedUsersQuerySnapshot.forEach((doc) => {
                    users.push({ ...doc.data() as User, id: doc.id });
                });

                setSuggestedUsers(users);
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

        if (authUser) {
            void getSuggestedUsers();
        }
    }, [authUser, showToast]);

    return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
