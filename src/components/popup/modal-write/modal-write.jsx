import { Button, Input, Modal, Rate } from 'antd';
import { useState } from 'react';
import { useCreateReviewMutation } from '../../../api/auth-api';
import './modal-write.scss';
const { TextArea } = Input;
const ModalWrite = ({ isOpen, onOk, centered, onCancel, onError }) => {
    const [createReview] = useCreateReviewMutation();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handlePublishClick = () => {
        if (rating) {
            createReview({ message: reviewText, rating })
                .unwrap()
                .then(() => onCancel())
                .catch(()=> onError())
                .finally(()=>{
                    setRating(0)
                    setReviewText('')
                })
        }
    };

    return (
             <Modal
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
                    on
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Rate onChange={setRating} value={rating} />

            <TextArea onChange={(e) => setReviewText(e.target.value)} value={reviewText} />
        </Modal>
    );
        
     
};

export default ModalWrite;
