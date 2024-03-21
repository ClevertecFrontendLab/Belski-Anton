import { ReactNode } from 'react';
import Loader from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import './auth-page.scss';

interface AuthPageProps {
    children: ReactNode;
}

export const AuthPage = ({ children }: AuthPageProps) => {
    const { isLoading } = useAppSelector((store) => store.load);

    return (
        <div className='bg-auth'>
            {isLoading && <Loader />}
            {children}
        </div>
    );
};
