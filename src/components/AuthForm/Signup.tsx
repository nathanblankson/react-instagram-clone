import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

export default function Signup() {
    const [signupForm, setSignupForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Input
                placeholder="Email"
                type="email"
                fontSize={14}
                size={'sm'}
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
            />

            <Input
                placeholder="Username"
                type="text"
                fontSize={14}
                size={'sm'}
                value={signupForm.username}
                onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
            />

            <Input
                placeholder="Full Name"
                type="text"
                fontSize={14}
                size={'sm'}
                value={signupForm.fullName}
                onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
            />

            <InputGroup>
                <Input
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    fontSize={14}
                    size={'sm'}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
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

            <Button w={'full'} colorScheme="blue" size={'sm'} fontSize={14}>
                Sign Up
            </Button>
        </>
    )
}
