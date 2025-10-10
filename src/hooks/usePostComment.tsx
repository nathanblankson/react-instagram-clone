import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import type { Comment } from '../store/postStore';
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.authUser);
    const addComment = usePostStore((state) => state.addComment);

    const handlePostComment = async (postId: string, comment: string) => {
        if (isCommenting) {
            return;
        }

        if (!authUser) {
            return showToast('Error', 'You must be logged in to comment', 'error');
        }

        setIsCommenting(true);

        const newComment: Comment = {
            comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId,
        };

        try {
            await updateDoc(doc(firestore, 'posts', postId), {
                comments: arrayUnion(newComment),
            });
            addComment(postId, newComment);
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else {
                showToast('Error', 'An unknown error occurred', 'error');
            }
        } finally {
            setIsCommenting(false);
        }
    };

    return { isCommenting, handlePostComment };
};

export default usePostComment;
