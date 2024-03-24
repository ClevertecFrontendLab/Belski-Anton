import { useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import './upload-photo.scss';

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        Modal.error({
            title: 'Файл слишком большой ',
            content: 'Выберите файл размером [......] МБ.',
            className: 'wrapper-modal-error-message',
            style: {
                marginTop: '20vh',
            },
            okText: 'Закрыть',
            maskStyle: {},
        });

        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        Modal.error({
            title: 'Файл слишком большой ',
            content: 'Выберите файл размером [......] МБ.',
            className: 'wrapper-modal-error-message',
            style: {
                marginTop: '20vh',
            },
            okText: 'Закрыть',
            maskStyle: {
                 background:'#6b6e75',
            },
        });

        return false;
    }

    return isJpgOrPng && isLt2M;
};

const UploadPhoto = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [listType, setListType] = useState<'picture-card' | 'picture'>('picture-card');
    const [uploadIcon, setUploadIcon] = useState<React.ReactNode>(<PlusOutlined />);
    const [uploadButtonText, setUploadButtonText] = useState('Загрузить фото профиля');

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setListType('picture-card');
                setUploadIcon(<PlusOutlined color='red' />);
                setUploadButtonText('Загрузить фото  профиля');
            } else {
                setListType('picture');
                setUploadIcon(<UploadOutlined style={{ color: '#D9D9D9' }} />);
                setUploadButtonText('Загрузить');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const uploadButton = (
        <div className='btn-upload'>
            {uploadIcon}
            <div className='text-btn'>{uploadButtonText}</div>
        </div>
    );

    return (
        <div className='wrapper-upload-mobile'>
            {!!(listType === 'picture') && <div className='text-upload-mobile'>Загрузить фото профиля: </div>}
            <div className='upload-photo-wrapper'>
                <Upload
                    action=''
                    listType={listType}
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    showUploadList={true}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </div>
        </div>
    );
};

export default UploadPhoto;
