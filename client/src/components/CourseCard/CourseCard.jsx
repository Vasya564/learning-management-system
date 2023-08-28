import './CourseCard.scss'
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, fetchCourses }) => {
    const { user, token } = useAuthContext()
    const navigate = useNavigate()
    // Translating number status to text and applying appropriate style colors
    let statusText;
    let statusClass;
    switch(course.status){
        case 1:
            statusText = "Активний";
            statusClass = "content__course__status--active";
            break;
        case 2:
            statusText = "Завершений";
            statusClass = "content__course__status--completed";
            break;
        case 3:
            statusText = "Повторний курс";
            statusClass = "content__course__status--repeat"
            break;
    }

    const handleDeleteCourse = async (id) => {
        const response = await fetch('http://localhost:4000/api/courses/' +id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            fetchCourses()
        }
    }
    return (
        <div className='content__course'>
            <div className={statusClass}>
                <p>{statusText}</p>
                {user && user.userRole !== 'student' && (
                    <div className='content__course__actions'>
                        <button onClick={() => navigate(`/edit-course/${course._id}`)}><BiEditAlt size={16} /></button>
                        <button onClick={() => handleDeleteCourse(course._id)}><BiTrash size={16} /></button>
                    </div>
                )}
            </div>
            <div className='content__course__main'>
                <div className='content__course__header'>
                    <div className='content__course__header--text'>
                        <h3>{course.title}</h3>
                        <p>{course.specialization}</p>
                    </div>
                    <Link className='content__course__header--link' to={`course/${course._id}`}>Перейти до курсу</Link>
                </div>
                <div className='content__course__footer'>
                    <hr />
                    <div className='content__course__teacher'>
                        <p>{course.teacher}</p>
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default CourseCard;