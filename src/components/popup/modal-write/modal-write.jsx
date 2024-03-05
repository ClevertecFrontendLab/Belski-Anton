import { Button, Input, Modal, Rate } from 'antd';
import { useState } from 'react';
import { useCreateReviewMutation } from '../../../api/methods-api';
import { StarTwoTone, StarFilled } from '@ant-design/icons';
import './modal-write.scss';
const { TextArea } = Input;
const ModalWrite = ({ isOpen, onOk, centered, onCancel, onError }) => {
    const [createReview] = useCreateReviewMutation();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const handlePublishClick = () => {
        if (rating) {
            createReview({ message: reviewText, rating })
                .unwrap()
                .then(() => {
                    setRating(0);
                    setReviewText('');
                    onCancel();
                })
                .catch(() => {
                    onError();
                });
        }
    };

    return (
        <Modal
            className='wrapper-write-modal'
            title='Ваш отзыв'
            open={isOpen}
            onOk={onOk}
            centered={centered}
            onCancel={onOk}
            footer={[
                <Button
                    key='submit'
                    type='primary'
                    onClick={handlePublishClick}
                    data-test-id='new-review-submit-button'
                    className='btn-write-new-commit'
                    disabled={rating === 0}
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Rate
                onChange={handleRatingChange}
                value={rating}
                character={({ index }) =>
                    index < rating ? (
                        <StarFilled style={{ color: '#FAAD14' }} />
                    ) : (
                        <StarTwoTone twoToneColor='#FAAD14' />
                    )
                }
            />

            <TextArea onChange={(e) => setReviewText(e.target.value)} value={reviewText} />
        </Modal>
    );
};

export default ModalWrite;
