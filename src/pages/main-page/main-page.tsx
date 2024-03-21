import React from 'react';
import {} from 'react-router-dom';
import { MainContent } from '@components/main-content';
import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';

export const MainPage = () => (
        <React.Fragment>
            <MainHeader />
            <MainContent />
            <MainFooter />
        </React.Fragment>
    );
