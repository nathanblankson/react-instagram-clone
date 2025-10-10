import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser.tsx';
import useAuthStore, { type User } from '../../store/authStore.tsx';

interface SuggestedUserProps {
    user: User;
    setUser: (user: User) => void;
}

export default function SuggestedUser(
    { user, setUser }: SuggestedUserProps
) {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
    const authUser = useAuthStore((state) => state.authUser);

    const onFollowUser = async () => {
        if (!authUser) {
            return;
        }

        await handleFollowUser();

        setUser({
            ...user,
            followers: isFollowing
                ? user.followers.filter((follower) => follower.uid !== authUser.uid)
                : [...user.followers, authUser],
        });
    };

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Avatar src={user.profilePicURL} size={'md'}/>
                <VStack alignItems={'flex-start'} spacing={2}>
                    <Box fontSize={12} fontWeight={'bold'}>
                        {user.username}
                    </Box>
                    <Box fontSize={11} color={'gray.500'}>
                        {user.followers.length} followers
                    </Box>
                </VStack>
            </Flex>
            {authUser && authUser.uid !== user.uid && (
                <Button
                    fontSize={13}
                    bg={'transparent'}
                    p={0}
                    h={'max-content'}
                    fontWeight={'medium'}
                    color={'blue.400'}
                    cursor={'pointer'}
                    _hover={{ color: 'white' }}
                    onClick={onFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            )}
        </Flex>
    )
}
