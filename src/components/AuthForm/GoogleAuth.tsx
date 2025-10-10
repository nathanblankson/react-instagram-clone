import { Flex, Image, Text } from '@chakra-ui/react';

export interface GoogleAuthProps {
    prefix: string;
}

export default function GoogleAuth(
    { prefix }: GoogleAuthProps,
) {
    return (
        <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
            <Image src="/google.png" alt="Google Logo" w={5}/>
            <Text mx={2} color={'blue.500'}>
                {prefix} with Google
            </Text>
        </Flex>
    )
}
