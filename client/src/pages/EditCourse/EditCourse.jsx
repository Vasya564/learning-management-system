// import './CreateCourse.scss'
import { useRef, useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate, useParams } from "react-router-dom";

// components
import SelectStudents from '../../components/SelectStudents/SelectStudents';
import Header from '../../components/Header/Header';

const EditCourse = () => {
    const [initialFields, setInitialFields] = useState({})
    const [title, setTitle] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [teacher, setTeacher] = useState('');
    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const [options, setOptions] = useState([]);
    const [regStudents, setRegStudents] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate()

    const { user } = useAuthContext()

    function areObjectsNotEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
          return true;
        }
      
        for (let key of keys1) {
          if (obj1[key] !== obj2[key]) {
            return true;
          }
        }
      
        return false;
      }

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
        const fetchCourse = async () => {
            const response = await fetch(`http://localhost:4000/api/courses/${id}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
    
            if (response.ok) {
                const { title, specialization, teacher, status, students } = json
                setInitialFields(json);
                setTitle(title)
                setSpecialization(specialization)
                setTeacher(teacher)
                setStatus(status)
                setRegStudents(students)
            }
        }
        if(user){
            fetchUsers()
            fetchCourse()
        }
    }, [])

    const handleSelectOptions = (values) => {
        setStudents(values);
    };

    const studentsRef = useRef(null)
  

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedFields = {};
        if (title !== initialFields.title) {
            updatedFields.title = title;
        }
        if (specialization !== initialFields.specialization) {
            updatedFields.specialization = specialization;
        }
        if (teacher !== initialFields.teacher) {
            updatedFields.teacher = teacher;
        }
        if (areObjectsNotEqual(Object.values(students).flat(), initialFields.students)) {
            updatedFields.students = Object.values(students).flat();
        }
        if (status !== initialFields.status) {
            updatedFields.status = status;
        }

        const response = await fetch(`http://localhost:4000/api/courses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedFields)
        })

        const json = await response.json()

        if(response.ok){
            setTitle('')
            setSpecialization('')
            setTeacher('')
            setStudents([])
            setStatus(0)
            setError(null)
            studentsRef.current.updateChildState()
            navigate('/')
        }
        else{
            setError(json.error)
        }
    }

    return (
        <div className='create-course'>
            <Header>
                <h1>Редагування курсу</h1>
            </Header>
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
                            {users && users.map((user) => {
                                if (user.role === 'teacher') {
                                    return <option key={user._id}>{user.fullname}</option>;
                                }
                            })}
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
                            students={regStudents}
                        />
                    </div>
                </form>
                {error && <div className='create-course__error'>{error}</div>}
                <button className='create-course__button' form="course-form">Зберегти курс</button> 
            </div>
        </div>
    );
}
 
export default EditCourse;