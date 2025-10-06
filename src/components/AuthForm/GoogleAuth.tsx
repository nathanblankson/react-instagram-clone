import { Flex, Image, Text } from '@chakra-ui/react';

export default function GoogleAuth() {
    return (
        <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
            <Image src="/google.png" alt="Google Logo" w={5}/>
            <Text mx={2} color={'blue.500'}>
                Log in with Google
            </Text>
        </Flex>
    )
}
