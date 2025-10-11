import { Alert, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import useLogin from '../../hooks/useLogin.tsx';

// TODO: look at using keyboard to submit form
export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useLogin();

    return (
        <>
            <Input
                placeholder="Email"
                type="email"
                fontSize={14}
                size={'sm'}
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />

            <InputGroup>
                <Input
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    fontSize={14}
                    size={'sm'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <InputRightElement h={'full'}>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (<ViewIcon/>) : (<ViewOffIcon/>)}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {
                error && (
                    <Alert status="error" fontSize={14} borderRadius={4}>
                        {error.message}
                    </Alert>
                )
            }

            <Button
                w={'full'}
                colorScheme="blue"
                size={'sm'}
                fontSize={14}
                isLoading={loading}
                onClick={() => login(loginForm)}>
                Log in
            </Button>
        </>
    )
}
