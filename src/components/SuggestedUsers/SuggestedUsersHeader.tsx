import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout.tsx';
import useAuthStore from '../../store/authStore.tsx';

export default function SuggestedUsersHeader() {
    const { handleLogout, isLoggingOut } = useLogout();
    const authUser = useAuthStore((state) => state.authUser);

    if (!authUser) {
        return null;
    }

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Link to={authUser.username}>
                    <Avatar src={authUser.profilePicURL} size={'lg'}/>
                </Link>
                <Link to={authUser.username}>
                    <Text fontSize={12} fontWeight={'bold'}>
                        {authUser.username}
                    </Text>
                </Link>
            </Flex>
            <Button
                size={'xs'}
                background={'transparent'}
                _hover={{ background: 'transparent' }}
                fontSize={14}
                fontWeight={'medium'}
                color={'blue.500'}
                cursor={'pointer'}
                isLoading={isLoggingOut}
                onClick={handleLogout}>
                Log out
            </Button>
        </Flex>
    )
}
