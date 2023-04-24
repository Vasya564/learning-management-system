import './CreateCourse.scss'
import { useRef, useState } from 'react';

import SelectStudents from '../../components/SelectStudents/SelectStudents';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [teacher, setTeacher] = useState('');
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState(null);

    const handleSelectOptions = (values) => {
        setStudents(values);
    };

    const studentsRef = useRef(null)
  
    const options = [
      {
        group: '4CS-21',
        students: ['Максим', 'Василь'] 
      },
      {
        group: '4CS-41',
        students: ['Христина', 'Яна', 'Михайло', 'Ірина']
      }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {title, specialization, teacher, students: Object.values(students).flat(), status}
        // console.log(course)

        const response = await fetch('http://localhost:4000/api/courses', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(response.ok){
            console.log(json)
            setTitle('')
            setSpecialization('')
            setTeacher('')
            setStudents([])
            setStatus(0)
            setError(null)
            studentsRef.current.updateChildState()
        }
        else{
            setError(json.error)
        }
    }

    return (
        <div className='create-course'>
            <h1 className='create-course__title'>Створення курсу</h1>
            <div className='create-course__form-container'>
                <form id='course-form' className="create-course__form" onSubmit={handleSubmit}>
                    <div className='create-course__form-left'>
                        <label className='create-course__label'>Назва курсу:</label>
                        <input
                            className='create-course__input' 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            />
                        <label className='create-course__label'>Спеціалізація:</label>
                        <input
                            className='create-course__input' 
                            type="text"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            />
                        <label className='create-course__label'>Викладач:</label>
                        <select
                            className='create-course__select'
                            value={teacher}
                            onChange={(e) => setTeacher(e.target.value)}
                            >
                            <option hidden>Виберіть викладача</option>
                            <option>Andriy Shevchenko</option>
                            <option>Jane Ukrainka</option>
                            <option>T Hack</option>
                        </select>
                        <label className='create-course__label'>Статус курсу:</label>
                        <select
                            className='create-course__select'
                            value={status}
                            onChange={(e) => setStatus(parseInt(e.target.value))}
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