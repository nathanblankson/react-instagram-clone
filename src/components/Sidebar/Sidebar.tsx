import { Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants.tsx';
import useLogout from '../../hooks/useLogout.tsx';
import SidebarItems from './SidebarItems.tsx';

export default function Sidebar() {
    const { handleLogout, isLoggingOut } = useLogout();

    return (
        <Box
            h={'100vh'}
            borderRight={'1px solid'}
            borderColor={'whiteAlpha.300'}
            py={8}
            px={{
                base: 2,
                md: 4
            }}
            position={'sticky'}
            top={0}
            left={0}>
            <Flex direction={'column'} gap={10} w={'full'} height={'full'}>
                {/* Instagram Logo */}
                <Link to={'/'} as={RouterLink} pl={2} display={{ base: 'none', md: 'block' }} cursor={'pointer'}>
                    <InstagramLogo/>
                </Link>
                <Link
                    to={'/'}
                    as={RouterLink}
                    pl={2}
                    display={{ base: 'block', md: 'none' }}
                    cursor={'pointer'}
                    borderRadius={6}
                    _hover={{
                        bg: 'whiteAlpha.200'
                    }}
                    w={10}>
                    <InstagramMobileLogo/>
                </Link>

                {/* Sidebar Items */}
                <Flex direction={'column'} gap={5} cursor={'pointer'}>
                    <SidebarItems/>
                </Flex>

                {/* Logout */}
                <Tooltip
                    hasArrow
                    label="Logout"
                    placement={'right'}
                    ml={1}
                    openDelay={500}
                    display={{ base: 'block', md: 'none' }}>
                    <Flex
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={{ base: 'center', md: 'flex-start' }}
                        gap={4}
                        _hover={{ bg: 'whiteAlpha.400' }}
                        p={2}
                        w={{ base: 10, md: 'full' }}
                        mt={'auto'}
                        onClick={handleLogout}
                    >
                        <BiLogOut size={25}/>
                        <Button
                            display={{ base: 'none', md: 'block' }}
                            variant={'ghost'}
                            _hover={{ bg: 'transparent' }}
                            isLoading={isLoggingOut}>
                            Logout
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </Box>
    )
}
