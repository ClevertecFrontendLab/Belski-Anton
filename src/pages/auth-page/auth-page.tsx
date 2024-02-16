import { ReactNode } from 'react';
import './auth-page.css';
interface AuthPageProps {
    children: ReactNode;
}

export const AuthPage = ({ children }: AuthPageProps) => {
    return (
        <div className='bg-auth'>
            {children}
        </div>
    );
};
