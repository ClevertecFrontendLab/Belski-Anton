import { useEffect, useState } from 'react';
import CalendarDesktop from '@components/calendar-desktop/calendar-dekstop';
import CalendarMobile from '@components/mobile-calendar/calendar-mobile';

const CalendarPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setIsMobile(width <= 640);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile ? <CalendarMobile /> : <CalendarDesktop />;
};

export default CalendarPage;
