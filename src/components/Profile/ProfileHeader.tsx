import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import useAuthStore from '../../store/authStore.tsx';
import useUserProfileStore from '../../store/userProfileStore.tsx';
import EditProfile from './EditProfile.tsx';

export default function ProfileHeader() {
    const [isFollowing] = useState(false);
    const authUser = useAuthStore(state => state.authUser);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userProfile } = useUserProfileStore();

    if (!userProfile) {
        return null; // TODO: NBSon - loading spinner, or some placeholder
    }

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
            <AvatarGroup
                size={{ base: 'xl', md: '2xl' }}
                justifySelf={'center'}
                alignSelf={'flex-start'}
                mx={'auto'}>
                <Avatar src={userProfile.profilePicURL}/>
            </AvatarGroup>

            <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
                <Flex
                    gap={4}
                    direction={{ base: 'column', sm: 'row' }}
                    justifyContent={{ base: 'center', sm: 'flex-start' }}
                    alignItems={'center'}
                    w={'full'}>
                    <Text fontSize={{ base: 'sm', md: 'lg', }}>
                        {userProfile.username}
                    </Text>

                    {visitingOwnProfileAndAuth && (
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                            <Button
                                bg={'white'}
                                color={'black'}
                                _hover={{ bg: 'whiteAlpha.800' }}
                                size={{ base: 'xs', md: 'sm' }}
                                onClick={onOpen}>
                                Edit Profile
                            </Button>
                        </Flex>
                    )}

                    {visitingAnotherProfileAndAuth && (
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                            <Button
                                bg={'blue.500'}
                                color={'white'}
                                _hover={{ bg: 'blue.600' }}
                                size={{ base: 'xs', md: 'sm' }}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </Button>
                        </Flex>
                    )}
                </Flex>

                <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as="span" fontWeight={'bold'} mr={1}>
                            {userProfile.posts.length}
                        </Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as="span" fontWeight={'bold'} mr={1}>
                            {userProfile.followers.length}
                        </Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as="span" fontWeight={'bold'} mr={1}>
                            {userProfile.following.length}
                        </Text>
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>
                        {userProfile.fullName}
                    </Text>
                </Flex>
                <Text fontSize={'sm'}>{userProfile.bio}</Text>
            </VStack>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
        </Flex>
    )
}
