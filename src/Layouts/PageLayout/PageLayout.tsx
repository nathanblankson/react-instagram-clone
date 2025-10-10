import { Box, Flex, Spinner } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.tsx';
import Sidebar from '../../components/Sidebar/Sidebar.tsx';
import { auth } from '../../firebase/firebase.ts';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    const { pathname } = useLocation();
    const [authUser, loading] = useAuthState(auth)
    const shouldShowSidebar = pathname !== '/auth' && !!authUser;
    const shouldShowNavbar = pathname !== '/auth' && !authUser && !loading
    const isCheckingIsUserIfAuth = !authUser && loading;

    if (isCheckingIsUserIfAuth) {
        return <PageLayoutSpinner/>
    }

    return (
        <Flex flexDir={shouldShowNavbar ? 'column' : 'row'}>
            {/* Sidebar */}
            {
                shouldShowSidebar && (
                    <Box w={{ base: '70px', md: '240px' }}>
                        <Sidebar/>
                    </Box>
                )
            }

            {
                shouldShowNavbar && (
                    <Navbar/>
                )
            }

            {/* Main Content */}
            <Box flex={1} w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }} mx={'auto'}>
                {children}
            </Box>
        </Flex>
    )
}

const PageLayoutSpinner = () => {
    return (
        <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center">
            <Spinner size="xl"/>
        </Flex>
    );
};
