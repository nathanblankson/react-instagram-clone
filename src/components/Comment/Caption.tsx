import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import type { Post } from '../../store/postStore.tsx';
import useUserProfileStore from '../../store/userProfileStore';
import { timeAgo } from '../../utils/timeAgo.util';

export interface CaptionProps {
    post: Post;
}

const Caption = (
    { post }: CaptionProps
) => {
    const userProfile = useUserProfileStore((state) => state.userProfile);

    if (!userProfile) {
        return null;
    }

    return (
        <Flex gap={4}>
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size={'sm'}/>
            </Link>
            <Flex direction={'column'}>
                <Flex gap={2} alignItems={'center'}>
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight={'bold'} fontSize={12}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{post.caption}</Text>
                </Flex>
                <Text fontSize={12} color={'gray'}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Caption;
