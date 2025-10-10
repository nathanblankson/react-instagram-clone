import { Box, Image } from '@chakra-ui/react';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import type { Post } from '../../store/postStore.tsx';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader.tsx';

export interface FeedPostProps {
    post: Post;
}

const FeedPost = (
    { post }: FeedPostProps
) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);

    return (
        <>
            {userProfile && <PostHeader post={post} creatorProfile={userProfile}/>}
            <Box my={2} borderRadius={4} overflow={'hidden'}>
                <Image src={post.imageURL} alt={'FEED POST IMG'}/>
            </Box>
            {userProfile && <PostFooter post={post} creatorProfile={userProfile}/>}
        </>
    );
};

export default FeedPost;
