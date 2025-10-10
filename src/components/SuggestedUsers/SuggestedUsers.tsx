import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers.tsx';
import SuggestedUser from './SuggestedUser.tsx';
import SuggestedUsersHeader from './SuggestedUsersHeader.tsx';

export default function SuggestedUsers() {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers();

    if (isLoading) {
        return null;
    }

    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedUsersHeader/>

            {suggestedUsers.length !== 0 && (
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                    <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                        Suggested for you
                    </Text>
                    <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
                        See All
                    </Text>
                </Flex>
            )}

            {/* TODO: look at how we can improve follow here */}
            {suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.id}/>
            ))}

            <Box
                fontSize={12}
                color={'gray.500'}
                mt={5}
                alignSelf={'start'}
            >
                © 2025 Built By{' '}
                <Link href="https://www.linkedin.com/in/nathan-blankson-559830157/" target={'_blank'} color={'blue.500'} fontSize={14}>
                    Nathan Blankson
                </Link>
            </Box>
        </VStack>
    )
}
