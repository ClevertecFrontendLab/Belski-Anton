import { useEffect, useState } from 'react';

const useWindowSize = (maxWidth = 768) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= maxWidth);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= maxWidth);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [maxWidth]);

    return isMobile;
};

export default useWindowSize;
