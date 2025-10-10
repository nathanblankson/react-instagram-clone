import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useEditProfile from '../../hooks/useEditProfile';
import usePreviewImage from '../../hooks/usePreviewImage';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';

export interface EditProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfile = (
    { isOpen, onClose }: EditProfileProps
) => {
    const [inputs, setinputs] = useState({
        fullName: '',
        username: '',
        bio: '',
    });
    const authUser = useAuthStore((state) => state.authUser);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImage();
    const { isUpdating, editProfile } = useEditProfile();
    const showToast = useShowToast();

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                showToast('Error', error.message, 'error');
            } else {
                showToast('Error', 'An unexpected error occurred', 'error');
            }
        }
    };

    if (!authUser) {
        return null;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent bg={'black'} boxShadow={'xl'} border={'1px solid gray'} mx={3}>
                    <ModalHeader/>
                    <ModalCloseButton/>
                    <ModalBody>
                        {/* Container Flex */}
                        <Flex bg={'black'}>
                            <Stack spacing={4} w={'full'} maxW={'md'} bg={'black'} p={6} my={0}>
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                    Edit Profile
                                </Heading>
                                <FormControl>
                                    <Stack direction={['column', 'row']} spacing={6}>
                                        <Center>
                                            <Avatar
                                                size="xl"
                                                src={selectedFile || authUser.profilePicURL}
                                                border={'2px solid white '}
                                            />
                                        </Center>
                                        <Center w="full">
                                            <Button w="full" onClick={() => fileRef.current?.click()}>
                                                Edit Profile Picture
                                            </Button>
                                        </Center>
                                        <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                                    </Stack>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'sm'}>Full Name</FormLabel>
                                    <Input
                                        placeholder={'Full Name'}
                                        size={'sm'}
                                        type={'text'}
                                        value={inputs.fullName || authUser.fullName}
                                        onChange={(e) => setinputs({ ...inputs, fullName: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'sm'}>Username</FormLabel>
                                    <Input
                                        placeholder={'Username'}
                                        size={'sm'}
                                        type={'text'}
                                        value={inputs.username || authUser.username}
                                        onChange={(e) => setinputs({ ...inputs, username: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'sm'}>Bio</FormLabel>
                                    <Input
                                        placeholder={'Bio'}
                                        size={'sm'}
                                        type={'text'}
                                        value={inputs.bio || authUser.bio}
                                        onChange={(e) => setinputs({ ...inputs, bio: e.target.value })}
                                    />
                                </FormControl>

                                <Stack spacing={6} direction={['column', 'row']}>
                                    <Button
                                        bg={'red.400'}
                                        color={'white'}
                                        w="full"
                                        size="sm"
                                        _hover={{ bg: 'red.500' }}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        size="sm"
                                        w="full"
                                        _hover={{ bg: 'blue.500' }}
                                        onClick={handleEditProfile}
                                        isLoading={isUpdating}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProfile;
