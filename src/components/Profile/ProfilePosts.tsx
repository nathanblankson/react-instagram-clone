import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProfilePost from './ProfilePost.tsx';

export default function ProfilePosts() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <Grid
            templateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
            }}
            gap={1}
            columnGap={1}
        >
            {isLoading &&
                [0, 1, 2, 4].map((_, idx) => (
                    <VStack key={idx} alignItems={'flex-start'} gap={4}>
                        <Skeleton w={'full'}>
                            <Box h="300px">contents wrapped</Box>
                        </Skeleton>
                    </VStack>
                ))}

            {!isLoading && (
                <>
                    <ProfilePost img="/img1.png" username="nathanblankson" avatar="/img1.png"/>
                    <ProfilePost img="/img2.png" username="joshuakelly" avatar="/img2.png"/>
                    <ProfilePost img="/img3.png" username="simonebiles" avatar="/img3.png"/>
                    <ProfilePost img="/img4.png" username="robertdowneyjr" avatar="/img4.png"/>
                </>
            )}
        </Grid>
    )
}

