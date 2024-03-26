import { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return isMobile
}

export default useWindowSize
