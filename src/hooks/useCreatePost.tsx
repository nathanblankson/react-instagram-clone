import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore, storage } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import usePostStore, { type BasePost } from '../store/postStore.tsx';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';

const useCreatePost = () => {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.authUser);
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useUserProfileStore((state) => state.addPost);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const { pathname } = useLocation();

    const handleCreatePost = async (selectedFile: string | null, caption: string) => {
        if (isLoading || !authUser || !userProfile) {
            return;
        }

        if (!selectedFile) {
            throw new Error('Please select an image');
        }

        setIsLoading(true);

        const newPost: BasePost = {
            caption: caption,
            imageURL: '',
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };

        try {
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
            const userDocRef = doc(firestore, 'users', authUser.uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef, { imageURL: downloadURL });

            newPost.imageURL = downloadURL;

            if (userProfile.uid === authUser.uid) {
                createPost({ ...newPost, id: postDocRef.id });
            }

            if (pathname !== '/' && userProfile.uid === authUser.uid) {
                addPost({ ...newPost, id: postDocRef.id });
            }

            showToast('Success', 'Post created successfully', 'success');
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

    return { isLoading, handleCreatePost };
};

export default useCreatePost;
