import { ReactNode } from 'react';
import './auth-page.css';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import Loader from '@components/loader/loader';
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
