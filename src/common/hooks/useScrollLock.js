import { useLayoutEffect } from 'react';

export const useScrollLock = locked => {
    useLayoutEffect(() => {
        if (!globalThis.document) return;

        document.documentElement.dataset.scrollLock = locked || '';

        document.body.style.overflow = locked ? 'hidden' : 'visible';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [locked]);
};
