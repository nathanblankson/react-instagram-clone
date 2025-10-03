import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FeedPost from './FeedPost.tsx';

export default function FeedPosts() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []);

    return (
        <Container maxW={'container.sm'} py={10} px={2}>
            {
                isLoading && [0, 1, 2, 3].map((_, i) => (
                    <VStack key={i} gap={4} mb={10} alignItems={'flex-start'}>
                        <Flex gap={2}>
                            <SkeletonCircle size="10"/>
                            <VStack gap={2} alignItems={'flex-start'}>
                                <Skeleton height={'10px'} w={'200px'}/>
                                <Skeleton height={'10px'} w={'200px'}/>
                            </VStack>
                        </Flex>
                        <Skeleton w={'full'}>
                            <Box h={'500px'}>
                                contents wrapped
                            </Box>
                        </Skeleton>
                    </VStack>
                ))
            }

            {
                !isLoading && (
                    <>
                        <FeedPost
                            username="nathanblankson"
                            avatar="/img1.png"
                            img="/img1.png"
                        />
                        <FeedPost
                            username="joshuakelly"
                            avatar="/img2.png"
                            img="/img2.png"
                        />
                        <FeedPost
                            username="simonebiles"
                            avatar="/img3.png"
                            img="/img3.png"
                        />
                        <FeedPost
                            username="robertdowneyjr"
                            avatar="/img4.png"
                            img="/img4.png"
                        />
                    </>
                )
            }
        </Container>
    )
}
