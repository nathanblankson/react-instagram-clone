import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';
import { firestore, storage } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore.tsx';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';

const useDeletePost = (id: string) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const showToast = useShowToast();
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

    const authUser = useAuthStore((state) => state.authUser);

    const handleDeletePost = async () => {
        if (!window.confirm('Are you sure you want to delete this post?') || !authUser || isDeleting) {
            return;
        }

        try {
            const imageRef = ref(storage, `posts/${id}`);
            await deleteObject(imageRef);
            const userRef = doc(firestore, 'users', authUser.uid);
            await deleteDoc(doc(firestore, 'posts', id));

            await updateDoc(userRef, {
                posts: arrayRemove(id),
            });

            deletePost(id);
            decrementPostsCount(id);
            showToast('Success', 'Post deleted successfully', 'success');
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else {
                showToast('Error', 'An unexpected error occurred', 'error');
            }
        } finally {
            setIsDeleting(false);
        }
    };
    return { isDeleting, handleDeletePost };
};

export default useDeletePost;
