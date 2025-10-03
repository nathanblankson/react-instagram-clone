import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
            </Routes>
        </>
    )
}

export default App
