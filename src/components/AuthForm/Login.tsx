import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

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

            <Input
                placeholder="Password"
                type="password"
                fontSize={14}
                size={'sm'}
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />

            <Button w={'full'} colorScheme="blue" size={'sm'} fontSize={14}>
                Log in
            </Button>
        </>
    )
}
