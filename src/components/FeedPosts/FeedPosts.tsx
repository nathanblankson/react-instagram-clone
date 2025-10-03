import { Container } from '@chakra-ui/react';
import FeedPost from './FeedPost.tsx';

export default function FeedPosts() {
    return (
        <Container maxW={'container.sm'} py={10} px={2}>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
        </Container>
    )
}
