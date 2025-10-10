import type { AuthError } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useAuthStore, { type User } from '../store/authStore';
import useShowToast from './useShowToast';

const useGoogleAuth = () => {
    const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const handleGoogleAuth = async () => {
        try {
            const userCredential = await signInWithGoogle();

            if (!userCredential && error) {
                showToast('Error', error.message, 'error');
                return;
            }

            if (userCredential) {
                const userRef = doc(firestore, 'users', userCredential.user.uid);
                const userSnapshot = await getDoc(userRef);

                // TODO: NBSon - investigate how linking accounts works
                if (userSnapshot.exists()) {
                    // Login existing user
                    const userDoc = userSnapshot.data();
                    localStorage.setItem('user-info', JSON.stringify(userDoc));
                    loginUser(userDoc as User);
                } else {
                    // Register new user
                    const userDoc = {
                        uid: userCredential.user.uid,
                        fullName: userCredential.user.displayName || `Instagram User ${Math.floor(Math.random() * 1000)}`,
                        username: userCredential.user.email!.split('@')[0], // TODO: NBSon - investigate why this can be null
                        email: userCredential.user.email!,
                        bio: '',
                        profilePicURL: userCredential.user.photoURL || '',
                        followers: [],
                        following: [],
                        posts: [],
                        createdAt: Date.now(),
                    }

                    await setDoc(doc(firestore, 'users', userCredential.user.uid), userDoc);
                    localStorage.setItem('user-info', JSON.stringify(userDoc));
                    loginUser(userDoc);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else if ((error as AuthError).code) {
                const authError = error as AuthError;
                showToast('Error', authError.message, 'error');
            } else {
                showToast('Error', 'An unknown error occurred', 'error');
            }
        }
    };

    return { loading, error, handleGoogleAuth };
};

export default useGoogleAuth;
