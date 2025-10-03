import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.tsx';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    const { pathname } = useLocation();

    return (
        <Flex>
            {/* Sidebar */}
            {
                pathname !== '/auth' && (
                    <Box w={{ base: '70px', md: '240px' }}>
                        <Sidebar/>
                    </Box>
                )
            }

            {/* Main Content */}
            <Box flex={1} w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }}>
                {children}
            </Box>
        </Flex>
    )
}
