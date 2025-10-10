import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import usePostStore, { type BasePost, type Post } from '../store/postStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) {
                return;
            }
            setIsLoading(true);
            setPosts([]);

            try {
                const postsQuery = query(collection(firestore, 'posts'), where('createdBy', '==', userProfile.uid));
                const postsQuerySnapshot = await getDocs(postsQuery);

                const posts: Post[] = [];

                postsQuerySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data() as BasePost, id: doc.id });
                });

                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (error) {
                if (error instanceof Error) {
                    showToast('Error', error.message, 'error');
                } else {
                    showToast('Error', 'An unexpected error occurred', 'error');
                }

                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        void getPosts();
    }, [setPosts, userProfile, showToast]);

    return { isLoading, posts };
};

export default useGetUserPosts;
