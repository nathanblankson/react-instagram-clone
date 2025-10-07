import type { AlertStatus } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const useShowToast = () => {
    const toast = useToast();

    // useCallback is used to prevent infinite loop, by  caching the function
    const showToast = useCallback(
        (title: string, description: string, status: AlertStatus) => {
            toast({
                title,
                description,
                status,
                duration: 3000,
                isClosable: true,
            });
        },
        [toast]
    );

    return showToast;
};

export default useShowToast;
