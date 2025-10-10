import type { AuthError } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';

export interface LoginProps {
    email: string;
    password: string;
}

const useLogin = () => {
    const showToast = useShowToast();
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state: any) => state.login);

    const login = async (inputs: LoginProps) => {
        if (!inputs.email || !inputs.password) {
            return showToast('Error', 'Please fill all the fields', 'error');
        }

        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred) {
                const docRef = doc(firestore, 'users', userCred.user.uid);
                const docSnap = await getDoc(docRef);

                localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
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

    return { loading, error, login };
};

export default useLogin;
