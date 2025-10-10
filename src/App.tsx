import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './firebase/firebase.ts';
import PageLayout from './Layouts/PageLayout/PageLayout.tsx';
import AuthPage from './pages/Auth/AuthPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';

function App() {
    const [authUser] = useAuthState(auth)

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
