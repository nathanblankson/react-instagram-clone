import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import type { Post } from '../store/postStore.tsx';
import useShowToast from './useShowToast';

const useLikePost = (post: Post) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const authUser = useAuthStore((state) => state.authUser);

    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid || '')); // TODO: see how to better handle this

    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (isUpdating) {
            return;
        }

        if (!authUser) {
            return showToast('Error', 'You must be logged in to like a post', 'error');
        }

        setIsUpdating(true);

        try {
            const postRef = doc(firestore, 'posts', post.id);

            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });

            setIsLiked(!isLiked);

            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else {
                showToast('Error', 'An unknown error occurred', 'error');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
