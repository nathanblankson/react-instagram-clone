import { Box, Image } from '@chakra-ui/react';
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

            {/*<PostFooter username={username}/>*/}
        </>
    )
}
