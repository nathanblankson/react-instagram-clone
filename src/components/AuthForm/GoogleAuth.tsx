import { Flex, Image, Text } from '@chakra-ui/react';
import useGoogleAuth from '../../hooks/useGoogleAuth.tsx';

export interface GoogleAuthProps {
    prefix: string;
}

export default function GoogleAuth(
    { prefix }: GoogleAuthProps,
) {
    const { handleGoogleAuth } = useGoogleAuth();

    return (
        <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'} onClick={handleGoogleAuth}>
            <Image src="/google.png" alt="Google Logo" w={5}/>
            <Text mx={2} color={'blue.500'}>
                {prefix} with Google
            </Text>
        </Flex>
    )
}
