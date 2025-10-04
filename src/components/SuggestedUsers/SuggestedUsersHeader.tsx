import { Avatar, Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function SuggestedUsersHeader() {
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Avatar src="/profilepic.png" name="nathanblankson" size={'lg'}/>
                <Text fontSize={12} fontWeight={'bold'}>
                    nathanblankson
                </Text>
            </Flex>
            <Link
                as={RouterLink}
                to={'/auth'}
                fontSize={14}
                fontWeight={'medium'}
                color={'blue.500'}
                cursor={'pointer'}
                style={{ textDecoration: 'none' }}>
                Log out
            </Link>
        </Flex>
    )
}
