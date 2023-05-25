import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { BiUpload } from 'react-icons/bi'
import './AddBlock.scss'
import FlexColumn from '../../components/FlexColumn/FlexColumn';

const AddBlock = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [topic, setTopic] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFiles = [...event.target.files];
        setFiles(selectedFiles);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!topic || files.length === 0) {
            setError('Всі поля повинні бути заповнені');
            return;
        }

        const formData = new FormData();
        formData.append('topic', topic);

        for (let i = 0; i < files.length; i++) {
            const encodedFilename = encodeURIComponent(files[i].name);
            formData.append('files', files[i], encodedFilename);
        }

        fetch(`http://localhost:4000/api/courses/resources/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: formData,
        })
        .then((response) => {
            response.json()
            navigate(`/course/${id}`)
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <FlexColumn>
        <h2>Додавання нового блоку до курсу</h2>
        <form className='add-block__form' onSubmit={handleSubmit} >
            <input 
                className="add-block__input" 
                placeholder='Тема блоку' 
                type="text" 
                value={topic} 
                onChange={handleTopicChange} 
            />
            <div>
                <label className='add-block__files' htmlFor="files">
                    {files.length > 0 ? (
                        <div>
                            <p>Вибрані файли:</p>
                            <ul className='add-block__selected'>
                                {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )
                    : <span className='add-block__placeholder'>
                        <BiUpload size={32} />
                        Виберіть файли
                    </span>
                }
                </label>
                <input type="file" id="files" name='files' multiple onChange={handleFileChange} style={{display: "none"}}/>
                
            </div>
            <button className='add-block__button' type="submit">Додати</button>
        </form>
        {error && <div>{error}</div>}
        </FlexColumn>
    );
};

export default AddBlock;