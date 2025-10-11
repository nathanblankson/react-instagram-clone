import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import usePostStore, { type BasePost, type Post } from '../store/postStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore((state) => state.authUser);
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async () => {
            if (!authUser) {
                return;
            }

            setIsLoading(true);


            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }

            const postsQuery = query(collection(firestore, 'posts'), where('createdBy', 'in', authUser.following));

            try {
                const querySnapshot = await getDocs(postsQuery);
                const feedPosts: Post[] = [];

                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() as BasePost });
                });

                feedPosts.sort((a, b) => b.createdAt - a.createdAt);

                setPosts(feedPosts);
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

        if (authUser) {
            void getFeedPosts();
        }
    }, [authUser, showToast, setPosts, setUserProfile]);

    return { isLoading, posts };
};

export default useGetFeedPosts;
