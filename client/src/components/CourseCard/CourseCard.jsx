import './CourseCard.scss'
import { BsFillChatTextFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
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
    return (
        <div className='content__course'>
            <div className={statusClass}>
                <BsFillChatTextFill />
                <p>{statusText}</p>
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