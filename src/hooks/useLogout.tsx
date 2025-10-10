import type { AuthError } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authStore.tsx';
import useShowToast from './useShowToast';

const useLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logout();
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

    return { handleLogout, isLoggingOut, error };
};

export default useLogout;
