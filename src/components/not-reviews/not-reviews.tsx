import { Button } from 'antd';
import './not-reviews.scss';

interface NotReviewsProps {
    onAddReview: () => void;
}

const NotReviews = ({ onAddReview}:NotReviewsProps) => {
    return (
        <div className='container-not-review'>
            <div className='wrapper-not-reviews'>
                <div className='text-not-reviews'>
                    <div className='title-not-reviews'>Оставьте свой отзыв первым</div>
                    <div className='subtitle-not-reviews'>
                        Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                        Поделитесь своим мнением и опытом с другими пользователями,и помогите им
                        сделать правильный выбор.
                    </div>
                </div>
                <div className='wrapper-btn-write-commit'>
                    <Button className='btn-write-commit' onClick={ onAddReview} data-test-id='write-review'>
                        Написать отзыв
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotReviews;
