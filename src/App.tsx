import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from './Layouts/PageLayout/PageLayout.tsx';
import AuthPage from './pages/Auth/AuthPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import useAuthStore from './store/authStore.tsx';

function App() {
    const authUser = useAuthStore((state: any) => state.user);

    return (
        <PageLayout>
            <Routes>
                <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/auth"/>}/>
                <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to="/"/>}/>
                <Route path="/:username" element={<ProfilePage/>}/>
            </Routes>
        </PageLayout>
    )
}

export default App
