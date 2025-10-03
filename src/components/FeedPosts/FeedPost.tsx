import { Box, Image } from '@chakra-ui/react';
import FeedPostFooter from './FeedPostFooter.tsx';
import FeedPostHeader from './FeedPostHeader.tsx';

interface FeedPostProps {
    username: string;
    avatar: string;
    img: string;
}

export default function FeedPost(
    { username, avatar, img }: FeedPostProps,
) {
    return (
        <>
            <FeedPostHeader username={username} avatar={avatar}/>

            <Box my={2} borderRadius={4} overflow={'hidden'}>
                <Image src={img} alt={username}/>
            </Box>

            <FeedPostFooter username={username}/>
        </>
    )
}
