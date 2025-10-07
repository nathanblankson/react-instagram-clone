import type { AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase.ts';
import useAuthStore from '../store/authStore.tsx';
import useShowToast from './useShowToast.tsx';

export interface SignupProps {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

export default function UseSignUpWithEmailAndPassword() {
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state: any) => state.login);

    const signup = async (inputs: SignupProps) => {
        if (!inputs.email || !inputs.password || !inputs.fullName || !inputs.username) {
            // TODO: the error is initially undefined the first time
            showToast('Error', 'Please fill in all fields', 'error');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if (!userCredential) {
                showToast('Error', error?.message ?? 'Signup failed', 'error');
                return;
            }

            if (userCredential) {
                const userDoc = {
                    uid: userCredential.user.uid,
                    fullName: inputs.fullName,
                    username: inputs.username,
                    email: inputs.email,
                    bio: '',
                    profilePicURL: '',
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                }

                await setDoc(doc(firestore, 'users', userCredential.user.uid), userDoc);
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                loginUser(userDoc);
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
    }

    return {
        loading,
        error,
        signup,
    }
}
