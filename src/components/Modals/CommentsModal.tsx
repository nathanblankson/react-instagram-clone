import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import usePostComment from '../../hooks/usePostComment';
import type { Post } from '../../store/postStore.tsx';
import PostComment from '../Comment/PostComment.tsx';

export interface CommentsModalProps {
    isOpen: any;
    onClose: any;
    post: Post;
}

const CommentsModal = (
    { isOpen, onClose, post }: CommentsModalProps
) => {
    const { handlePostComment, isCommenting } = usePostComment();
    const commentRef = useRef<HTMLInputElement | null>(null);
    const commentsContainerRef = useRef<HTMLDivElement | null>(null);

    const handleSubmitComment = async (e: any) => {
        // do not refresh the page, prevent it
        e.preventDefault();

        if (!commentRef.current?.value) {
            return;
        }

        await handlePostComment(post.id, commentRef.current.value);
        commentRef.current.value = '';
    };

    useEffect(() => {
        const scrollToBottom = () => {
            if (!commentsContainerRef.current) {
                return;
            }

            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        };

        if (isOpen) {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    }, [isOpen, post.comments.length]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
            <ModalOverlay/>
            <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <Flex
                        mb={4}
                        gap={4}
                        flexDir={'column'}
                        maxH={'250px'}
                        overflowY={'auto'}
                        ref={commentsContainerRef}
                    >
                        {post.comments.map((comment, idx) => (
                            <PostComment key={idx} comment={comment}/>
                        ))}
                    </Flex>
                    <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
                        <Input placeholder="Comment" size={'sm'} ref={commentRef}/>
                        <Flex w={'full'} justifyContent={'flex-end'}>
                            <Button type="submit" ml={'auto'} size={'sm'} my={4} isLoading={isCommenting}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CommentsModal;
