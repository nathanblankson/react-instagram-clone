import { Box, Image } from '@chakra-ui/react';
import FeedPostFooter from './FeedPostFooter.tsx';
import FeedPostHeader from './FeedPostHeader.tsx';

export default function FeedPost() {
    return (
        <>
            <FeedPostHeader/>

            <Box my={2} borderRadius={4} overflow={'hidden'}>
                <Image src="/img1.png" alt="User profile image"/>
            </Box>

            <FeedPostFooter/>
        </>
    )
}
