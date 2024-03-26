import { useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { API_ROUTES, BASE_API_URL, PATHS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import useWindowSize from '@hooks/use-window-size';
import { Modal, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import './upload-photo.scss';

export const renderModalError = (title: string, content: string, testId = '') => {
    Modal.error({
        title,
        content,
        className: 'wrapper-modal-error-message',
        style: {
            marginTop: '20vh',
        },
        okText: <span data-test-id={testId}>Закрыть</span>,
        maskStyle: {
            background: '#6b6e75',
        },
    });
};

interface IPropsUploadPhoto {
    initialValue: string;
    setUserPhoto: (arg: string) => void;
}

const UploadPhoto = ({ initialValue, setUserPhoto }: IPropsUploadPhoto) => {
    const isMobile = useWindowSize();
    const { token } = useAppSelector((state) => state.auth);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [listType, setListType] = useState<'picture-card' | 'picture'>('picture-card');
    const [uploadIcon, setUploadIcon] = useState<React.ReactNode>(<PlusOutlined />);
    const [uploadButtonText, setUploadButtonText] = useState('Загрузить фото профиля');

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        const uploadFile = newFileList[0];

        if (uploadFile && uploadFile.status === 'error') {
            renderModalError(
                'Файл слишком большой',
                'Выберите файл размером до 5 МБ.',
                'big-file-error-close',
            );
            setUserPhoto('');
            setFileList([{ uid: '-5', url: '', name: uploadFile.name, status: 'error' }]);
        } else if (uploadFile?.response?.url) {
            setUserPhoto(`${PATHS.PHOTO_DOMAIN}${uploadFile.response.url}`);
        }
    };

    useEffect(() => {
        if (isMobile) {
            setListType('picture');
            setUploadIcon(<UploadOutlined style={{ color: '#D9D9D9' }} />);
            setUploadButtonText('Загрузить');
        } else {
            setListType('picture-card');
            setUploadIcon(<PlusOutlined color='red' />);
            setUploadButtonText('Загрузить фото  профиля');
        }
    }, [isMobile]);

    const uploadButton = (
        <div className='btn-upload'>
            {uploadIcon}
            <div className='text-btn'>{uploadButtonText}</div>
        </div>
    );

    useEffect(() => {
        if (initialValue) {
            setFileList([
                {
                    uid: '1',
                    name: 'image.png',
                    status: 'done',
                    url: initialValue,
                },
            ]);
        }
    }, [initialValue]);

    return (
        <div className='wrapper-upload-mobile'>
            {!!(listType === 'picture' && fileList.length === 0) && (
                <div className='text-upload-mobile'>Загрузить фото профиля: </div>
            )}
            <div className='upload-photo-wrapper' data-test-id='profile-avatar'>
                <Upload
                    headers={{ Authorization: `Bearer ${localStorage.getItem('token') || token}` }}
                    action={`${BASE_API_URL}${API_ROUTES.uploadImage}`}
                    accept='image/png, image/jpeg'
                    listType={listType}
                    fileList={fileList}
                    onChange={handleChange}
                    showUploadList={true}
                    maxCount={1}
                    progress={{ strokeWidth: 2, showInfo: false, strokeColor: '#108ee9' }}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </div>
        </div>
    );
};

export default UploadPhoto;
