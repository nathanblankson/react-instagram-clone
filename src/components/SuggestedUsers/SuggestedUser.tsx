import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface SuggestedUserProps {
    name: string;
    followers: number;
    avatar: string;
}

export default function SuggestedUser(
    { name, followers, avatar }: SuggestedUserProps
) {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Avatar src={avatar} name={name} size={'md'}/>
                <VStack alignItems={'flex-start'} spacing={2}>
                    <Box fontSize={12} fontWeight={'bold'}>
                        {name}
                    </Box>
                    <Box fontSize={11} color={'gray.500'}>
                        {followers} followers
                    </Box>
                </VStack>
            </Flex>
            <Button
                fontSize={13}
                bg={'transparent'}
                p={0}
                h={'max-content'}
                fontWeight={'medium'}
                color={'blue.400'}
                cursor={'pointer'}
                _hover={{ color: 'white' }}
                onClick={() => setIsFollowing(!isFollowing)}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
        </Flex>
    )
}
