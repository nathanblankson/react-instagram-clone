import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import useLogout from '../../hooks/useLogout.tsx';

export default function SuggestedUsersHeader() {
    const { handleLogout, isLoggingOut } = useLogout();

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Avatar src="/profilepic.png" name="nathanblankson" size={'lg'}/>
                <Text fontSize={12} fontWeight={'bold'}>
                    nathanblankson
                </Text>
            </Flex>
            <Button
                size={'xs'}
                background={'transparent'}
                _hover={{ background: 'transparent' }}
                fontSize={14}
                fontWeight={'medium'}
                color={'blue.500'}
                cursor={'pointer'}
                isLoading={isLoggingOut}
                onClick={handleLogout}>
                Log out
            </Button>
        </Flex>
    )
}
