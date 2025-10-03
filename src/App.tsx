import { Route, Routes } from 'react-router-dom';
import PageLayout from './Layouts/PageLayout/PageLayout.tsx';
import AuthPage from './pages/Auth/AuthPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';

function App() {
    return (
        <PageLayout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
            </Routes>
        </PageLayout>
    )
}

export default App
