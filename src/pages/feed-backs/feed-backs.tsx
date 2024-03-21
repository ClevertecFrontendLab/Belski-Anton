/* eslint-disable no-negated-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { IErrorResponse } from '@components/form/form';
import NotReviews from '@components/not-reviews/not-reviews';
import ModalSaveError from '@components/popup/modal-save-error/modal-save-error';
import ModalSuccess from '@components/popup/modal-success/modal-success';
import ModalWrite from '@components/popup/modal-write/modal-write';
import ModalWrong from '@components/popup/wrong-modal/modal-wrong';
import { PATHS } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { clearAuthState } from '@redux/auth-slice';
import { history } from '@redux/configure-store';
import { Avatar, Button, Rate } from 'antd';

import { useGetReviewsQuery } from '../../api/methods-api';

import './feed-backs.scss';

const routes = [
    {
        path: 'main',
        name: 'Главная',
    },
    {
        name: 'Отзывы пользователей',
    },
];

const FeedBacks = () => {
    const dispatch = useAppDispatch();
    const { data: reviews, isError, error } = useGetReviewsQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalOpenError, setIsModalError] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [isModalErrorSave, setModalErrorSave] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalSuccess(true);
    };

    const toggleReviews = () => {
        setShowAllReviews((prevState) => !prevState);
    };

    const handleErrorSave = () => {
        setModalErrorSave(false);
        setIsModalOpen(true);
    };

    const handleShowErorModulSave = () => {
        setModalErrorSave(true);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isError) {
            const fetchError = error as IErrorResponse;

            if (fetchError.status === 403) {
                localStorage.removeItem('token');
                dispatch(clearAuthState());
                history.push(PATHS.AUTH);
            } else {
                setIsModalError(true);
            }
        }
    }, [isError, error]);

    const onClickCloseModalSuccess = () => {
        setIsModalSuccess(false);
    };

    return (
        <div className='feedbacks-content'>
            
            <header>
                <Breadcrumbs items={routes} />
            </header>

            <div className='wrapper-feedbacks-content'>
                {!!reviews?.length && (
                    <React.Fragment>
                        <div className='wrapper-commit'>
                            {(showAllReviews ? reviews : reviews.slice(-4)).map((el) => (
                                <div className='wrapper-card-commit' key={el.id}>
                                    <div className='description-user'>
                                        <div>
                                            <Avatar
                                                size={42}
                                                src={el.imageSrc || ''}
                                                icon={!el.imageSrc ? <UserOutlined /> : undefined}
                                            />
                                        </div>
                                        <div className='name-user'>
                                            {el.fullName || 'Пользователь'}
                                        </div>
                                    </div>
                                    <div className='wrapper-rate-text'>
                                        <div className='wrapper-rate-date'>
                                            <Rate disabled={true} value={el.rating} />
                                            <div className='date-commit'>
                                                {new Date(el.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <p className='text'>{el.message || ''}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='wrapper-commit-btn'>
                            <Button
                                type='text'
                                className='write-review-btn'
                                onClick={showModal}
                                data-test-id='write-review'
                            >
                                Написать отзыв
                            </Button>
                            <Button
                                type='text'
                                className='expand-reviews-btn'
                                onClick={toggleReviews}
                                data-test-id='all-reviews-button'
                            >
                                {showAllReviews ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                            </Button>
                        </div>
                    </React.Fragment>
                )}
                {!!(reviews && !reviews.length) && <NotReviews onAddReview={showModal} />}
            </div>

            <ModalWrite
                isOpen={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                onError={handleShowErorModulSave}
            />
            <ModalWrong isOpen={isModalOpenError} centered={true} />
            <ModalSuccess isOpen={isModalSuccess} onCancel={onClickCloseModalSuccess} />
            <ModalSaveError
                open={isModalErrorSave}
                onCancel={handleErrorSave}
                onOk={() => setModalErrorSave(!isModalErrorSave)}
            />
        </div>
    );
};

export default FeedBacks;
