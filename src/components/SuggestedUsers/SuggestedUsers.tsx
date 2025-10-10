import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import SuggestedUsersHeader from './SuggestedUsersHeader.tsx';

export default function SuggestedUsers() {
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedUsersHeader/>

            <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                    Suggested for you
                </Text>
                <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
                    See All
                </Text>
            </Flex>

            {/* TODO: Commented out for now */}
            {/*<SuggestedUser id="1" name="Dan Abrahmov" followers={1392} avatar="https://bit.ly/dan-abramov"/>*/}
            {/*<SuggestedUser id="2" name="Sophie Alpert" followers={1234} avatar="https://bit.ly/sophie-alpert"/>*/}
            {/*<SuggestedUser id="3" name="Sebastian Markbåge" followers={1100} avatar="https://bit.ly/sebastian-markbage"/>*/}

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
