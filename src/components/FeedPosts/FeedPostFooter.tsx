import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants.tsx';

export default function FeedPostFooter() {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(1000);

    const handleLike = () => {
        if (isLiked) {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
    }

    return (
        <Box mb={10}>
            <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={4} mt={4}>
                <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
                    {!isLiked ? (<NotificationsLogo/>) : (<UnlikeLogo/>)}
                </Box>

                <Box cursor={'pointer'} fontSize={18}>
                    <CommentLogo/>
                </Box>
            </Flex>

            <Text fontWeight={600} fontSize={'sm'}>
                {likeCount} likes
            </Text>

            <Text fontWeight={700} fontSize={'sm'}>
                nathanblankson{' '}
                <Text as="span" fontWeight={400}>
                    Feeling good
                </Text>
            </Text>

            <Text fontSize={'sm'} color={'gray'}>
                View all 1,000 comments
            </Text>

            <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w={'full'}>
                <InputGroup>
                    <Input variant={'flushed'} placeholder={'Add a comment...'} fontSize={14}/>
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={'blue.500'}
                            fontWeight={600}
                            cursor={'pointer'}
                            _hover={{ color: 'white' }}
                            bg={'transparent'}
                        >
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    )
}
