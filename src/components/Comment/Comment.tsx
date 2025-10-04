import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CommentProps {
    createdAt: string;
    username: string;
    profilePic: string;
    text: string;
}

export default function Comment(
    { text, createdAt, profilePic, username }: CommentProps
) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    if (isLoading) {
        return <CommentSkeleton/>;
    }

    return (
        <Flex gap={4}>
            <Link to={`/${username}`}>
                <Avatar src={profilePic} size={'sm'}/>
            </Link>
            <Flex direction={'column'}>
                <Flex gap={2} alignItems={'center'}>
                    <Link to={`/${username}`}>
                        <Text fontWeight={'bold'} fontSize={12}>
                            {username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{text}</Text>
                </Flex>
                <Text fontSize={12} color={'gray'}>
                    {createdAt}
                </Text>
            </Flex>
        </Flex>
    );
}

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={'full'} alignItems={'center'}>
            <SkeletonCircle h={10} w="10"/>
            <Flex gap={1} flexDir={'column'}>
                <Skeleton height={2} width={100}/>
                <Skeleton height={2} width={50}/>
            </Flex>
        </Flex>
    );
};
