import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { BiUpload } from 'react-icons/bi'
import './AddBlock.scss'

// components
import FlexColumn from '../../components/FlexColumn/FlexColumn';
import FlexColumnCenter from '../../components/FlexColumnCenter/FlexColumnCenter';
import Header from '../../components/Header/Header';

const AddBlock = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [topic, setTopic] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(emptyFields.length === 0){
            setError('')
        }
    }, [topic, files]);

    const truncateFileName = (fileName, maxLength) => {
        if (fileName.length <= maxLength) {
          return fileName;
        }
        
        const extensionIndex = fileName.lastIndexOf('.');
        const name = fileName.substring(0, extensionIndex);
        const extension = fileName.substring(extensionIndex);
        const truncatedName = name.substring(0, maxLength - 3);
        
        return truncatedName + '...' + extension;
      };

    const handleTopicChange = (e) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'topic'));
        setTopic(e.target.value)
    }

    const handleFileChange = (event) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'files'));
        const fileList = Array.from(event.target.files);

        // Check file sizes
        const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
        const oversizedFiles = fileList.filter((file) => file.size > maxSizeInBytes);

        if (oversizedFiles.length > 0) {
            if (oversizedFiles.length === fileList.length) {
              // All uploaded files are oversized
              setSizeError('Розмір завантажених файлів перевищує 3МБ');
            } else {
              // Some files are oversized
              const errorMessage = oversizedFiles.map((file) => `Розмір файлу "${file.name}" перевищує 3МБ`).join(', ');
              setSizeError(errorMessage);
              const validFiles = fileList.filter((file) => !oversizedFiles.includes(file));
              setFiles(validFiles);
            }
            console.log(oversizedFiles);
            return;
          }

        setSizeError('');
        // Update selected files state
        setFiles(fileList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('topic', topic);

        for (let i = 0; i < files.length; i++) {
            const encodedFilename = encodeURIComponent(files[i].name);
            formData.append('files', files[i], encodedFilename);
        }

        const response = await fetch(`http://localhost:4000/api/courses/resources/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: formData,
        })

        const json = await response.json()
        if(response.ok) {
            navigate(`/course/${id}`)
        }
        else {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        };
    };

    return (
        <FlexColumn>
        <Header>
            <h1>Додавання нового блоку до курсу</h1>
        </Header>
        <FlexColumnCenter>
            <form className='add-block__form' id='add-block__form' onSubmit={handleSubmit} >
                <input 
                    className={`add-block__input ${emptyFields.includes('topic') ? 'error' : ''}`} 
                    placeholder='Тема блоку' 
                    type="text" 
                    value={topic} 
                    onChange={handleTopicChange} 
                />
                <div>
                    <label className={`add-block__files ${emptyFields.includes('files') ? 'error-dashed' : ''}`} htmlFor="files">
                        {files.length > 0 ? (
                            <div>
                                <p>Вибрані файли:</p>
                                <ul className='add-block__selected'>
                                    {files.map((file, index) => (
                                        <li key={index}>
                                            <p>{truncateFileName(file.name, 35)}</p>
                                            <p></p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                        : <span className='add-block__placeholder'>
                            <BiUpload size={32} />
                            Виберіть файли
                            <p className='add-block__hint'>(Максимальний розмір файлу – 3мб)</p>
                        </span>
                    }
                    </label>
                    <input type="file" id="files" name='files' multiple onChange={handleFileChange} style={{display: "none"}}/>
                    
                </div>
                {sizeError && <div className='oversize-error'>{sizeError}</div>}
            </form>
            {error && <div className='add-block__error'>{error}</div>}
            <button className='add-block__button' form="add-block__form">Додати</button>  
        </FlexColumnCenter>
        </FlexColumn>
    );
};

export default AddBlock;