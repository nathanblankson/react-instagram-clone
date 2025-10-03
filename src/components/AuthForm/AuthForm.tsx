import { Box, Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);
    const [authForm, setAuthForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleAuth = () => {
        if (!authForm.email || !authForm.password || (!isLogin && !authForm.confirmPassword)) {
            alert('Please fill all the fields');
            return;
        }

        navigate('/');
    }

    return (
        <>
            <Box border={'1px solid gray'} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src="/logo.png" alt="Instagram Logo" h={24} cursor={'pointer'}/>

                    <Input
                        placeholder="Email"
                        type="email"
                        fontSize={14}
                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    />

                    <Input
                        placeholder="Password"
                        type="password"
                        fontSize={14}
                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    />

                    {
                        !isLogin
                        && (
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                fontSize={14}
                                onChange={(e) => setAuthForm({ ...authForm, confirmPassword: e.target.value })}
                            />
                        )
                    }

                    <Button w={'full'} colorScheme="blue" size={'sm'} fontSize={14} onClick={handleAuth}>
                        {isLogin ? 'Log in' : 'Sign Up'}
                    </Button>

                    {/* -- OR -- */}
                    <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
                        <Box flex={2} h={'1px'} bg={'gray.400'}/>
                        <Text mx={1} color={'white'}>OR</Text>
                        <Box flex={2} h={'1px'} bg={'gray.400'}/>
                    </Flex>

                    <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
                        <Image src="/google.png" alt="Google Logo" w={5}/>
                        <Text mx={2} color={'blue.500'}>
                            Log in with Google
                        </Text>
                    </Flex>
                </VStack>
            </Box>

            <Box border={'1px solid gray'} borderRadius={4} padding={5}>
                <Flex alignItems={'center'} justifyContent={'center'}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                    </Box>
                    <Box color={'blue.500'} cursor={'pointer'} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Log in'}
                    </Box>
                </Flex>
            </Box>
        </>
    )
}
