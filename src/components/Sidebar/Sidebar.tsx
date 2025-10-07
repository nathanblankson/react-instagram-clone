import { Avatar, Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import {
    CreatePostLogo,
    InstagramLogo,
    InstagramMobileLogo,
    NotificationsLogo,
    SearchLogo
} from '../../assets/constants.tsx';
import useLogout from '../../hooks/useLogout.tsx';

export default function Sidebar() {
    const sidebarItems = [
        {
            icon: <AiFillHome size={25}/>,
            text: 'Home',
            link: '/'
        },
        {
            icon: <SearchLogo/>,
            text: 'Search',
        },
        {
            icon: <NotificationsLogo/>,
            text: 'Notifications',
        },
        {
            icon: <CreatePostLogo/>,
            text: 'Create',
        },
        {
            icon: <Avatar size={'sm'} name="Nathan Blankson" src="/profilepic.png"/>,
            text: 'Profile',
            link: '/nathanblankson'
        },
    ];
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
                    {
                        sidebarItems.map((item, index) => (
                            <Tooltip
                                key={index}
                                hasArrow
                                label={item.text}
                                placement={'right'}
                                ml={1}
                                openDelay={500}
                                display={{ base: 'block', md: 'none' }}>
                                <Link
                                    display={'flex'}
                                    to={item.link ?? '#'}
                                    as={RouterLink}
                                    alignItems={'center'}
                                    justifyContent={{ base: 'center', md: 'flex-start' }}
                                    gap={4}
                                    _hover={{ bg: 'whiteAlpha.400' }}
                                    p={2}
                                    w={{ base: 10, md: 'full' }}
                                >
                                    {item.icon}
                                    <Box display={{ base: 'none', md: 'block' }}>
                                        {item.text}
                                    </Box>
                                </Link>
                            </Tooltip>
                        ))
                    }
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
