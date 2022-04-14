import { useCallback, useEffect, useState } from 'react';

export const useFakeFetch = (data, timeout) => {
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (data) {
                setResponse(data);
            }

            setLoading(false);
        }, timeout);
    }, [data, timeout]);

    return {
        isLoading,
        response
    };
};

export const useFakePost = () => {
    const [isLoading, setLoading] = useState(false);
    const fakePost = useCallback(async (data, timeout) => {
        return new Promise(resolve => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                resolve(data);
            }, timeout);
        });
    }, []);

    return {
        isLoading,
        fakePost
    };
};
