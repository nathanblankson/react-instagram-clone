import { Container } from '@chakra-ui/react';
import FeedPost from './FeedPost.tsx';

export default function FeedPosts() {
    return (
        <Container maxW={'container.sm'} py={10} px={2}>
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
        </Container>
    )
}
