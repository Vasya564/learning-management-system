import './CreateCourse.scss'
import { useState } from 'react';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [teacher, setTeacher] = useState('');
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {title, specialization, teacher, students, status}
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
        }
        else{
            setError(json.error)
        }
    }

    return (
        <>
            <form className="course__create__form" onSubmit={handleSubmit}>
                <label>Назва курсу:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    />
                <label>Спеціалізація:</label>
                <input 
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    />
                <label>Викладач:</label>
                <select
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    >
                    <option hidden>Виберіть викладача</option>
                    <option>Andriy Shevchenko</option>
                    <option>Jane Ukrainka</option>
                    <option>T Hack</option>
                </select>
                <label>Студенти:</label>
                <select
                    value={students}
                    onChange={(e) => setStudents(Array.from(e.target.selectedOptions, option => option.value))}
                    multiple={true}
                    >
                    <option>Ivan</option>
                    <option>Vasyl</option>
                    <option>Yaroslav</option>
                </select>
                <label>Статус курсу:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(parseInt(e.target.value))}
                    >
                    <option hidden>Виберіть статус</option>
                    <option value="1">Активний</option>
                    <option value="3">Повторний курс</option>
                </select>
                <button>Створити курс</button>
                {error && <div>{error}</div>}
            </form>
        </>
    );
}
 
export default CreateCourse;