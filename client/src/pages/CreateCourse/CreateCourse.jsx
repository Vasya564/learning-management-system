import './CreateCourse.scss'
import { useRef, useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";

import SelectStudents from '../../components/SelectStudents/SelectStudents';
import Header from '../../components/Header/Header';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [teacher, setTeacher] = useState('');
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const [options, setOptions] = useState([]);
    const [emptyFields, setEmptyFields] = useState([]);

    const navigate = useNavigate()

    const { user } = useAuthContext()

    useEffect(() => {
        if(emptyFields.length === 0){
            setError('')
        }
    }, [title, specialization, teacher, students, status]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:4000/api/user', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
            const options = [];

            json.forEach((user) => {
            const { group, email, fullname } = user;

            if (group) {
                const groupIndex = options.findIndex((option) => option.group === group);

                if (groupIndex === -1) {
                options.push({ group, students: [{ email, fullname }] });
                } else {
                options[groupIndex].students.push({ email, fullname });
                }
            }
            });
            setOptions(options)
        }
        
        if(user){
            fetchUsers()
        }
    }, [])

    const handleTitleChange = (e) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'title'));
        setTitle(e.target.value)
    }

    const handleSpecializationChange = (e) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'specialization'));
        setSpecialization(e.target.value)
    }

    const handleTeacherChange = (e) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'teacher'));
        setTeacher(e.target.value)
    }

    const handleStatusChange = (e) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'status'));
        setStatus(parseInt(e.target.value))
    }

    const handleSelectOptions = (values) => {
        setEmptyFields(emptyFields.filter((item) => item !== 'students'));
        setStudents(values);
    };

    const studentsRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {title, specialization, teacher, students: Object.values(students).flat(), status}
        // console.log(course)

        const response = await fetch('http://localhost:4000/api/courses', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok){
            setTitle('')
            setSpecialization('')
            setTeacher('')
            setStudents([])
            setStatus(0)
            setError(null)
            setEmptyFields([])
            studentsRef.current.updateChildState()
            navigate('/')
        }
        else{
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }

    return (
        <div className='create-course'>
            <Header>
                <h1>Створення курсу</h1>
            </Header>
            <div className='create-course__form-container'>
                <form id='course-form' className="create-course__form" onSubmit={handleSubmit}>
                    <div className='create-course__form-left'>
                        <label className='create-course__label'>Назва курсу:</label>
                        <input
                            className={`create-course__input ${emptyFields.includes('title') ? 'error' : ''}`} 
                            type="text"
                            value={title}
                            onChange={(e) => handleTitleChange(e)} 
                            />
                        <label className='create-course__label'>Спеціалізація:</label>
                        <input
                            className={`create-course__input ${emptyFields.includes('specialization') ? 'error' : ''}`} 
                            type="text"
                            value={specialization}
                            onChange={(e) => handleSpecializationChange(e)}
                            />
                        <label className='create-course__label'>Викладач:</label>
                        <select
                            className={`create-course__select ${emptyFields.includes('teacher') ? 'error' : ''}`}
                            value={teacher}
                            onChange={(e) => handleTeacherChange(e)}
                            >
                            <option hidden>Виберіть викладача</option>
                            {users && users.map((user) => {
                                if (user.role === 'teacher') {
                                    return <option key={user._id}>{user.fullname}</option>;
                                }
                            })}
                        </select>
                        <label className='create-course__label'>Статус курсу:</label>
                        <select
                            className={`create-course__select ${emptyFields.includes('status') ? 'error' : ''}`}
                            value={status}
                            onChange={(e) => handleStatusChange(e)}
                            >
                            <option hidden>Виберіть статус</option>
                            <option value="1">Активний</option>
                            <option value="3">Повторний курс</option>
                        </select>
                    </div>
                    <div className='create-course__form-right'>
                        <label className='create-course__label'>Студенти:</label>
                        <SelectStudents
                            ref={studentsRef}
                            options={options}
                            onSelect={handleSelectOptions}
                            emptyFields={emptyFields} 
                        />
                    </div>
                </form>
                {error && <div className='create-course__error'>{error}</div>}
                <button className='create-course__button' form="course-form">Створити курс</button> 
            </div>
        </div>
    );
}
 
export default CreateCourse;