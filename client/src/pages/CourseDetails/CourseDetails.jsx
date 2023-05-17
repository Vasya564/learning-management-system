import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './CourseDetails.scss'

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null)
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`http://localhost:4000/api/courses/${id}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                setCourse(json)
            }
        }
        
        if(user){
            fetchCourses()
        }
    }, [id])

    return (
        <div>
            {course && (
                <div>
                    <h1>{course.title}</h1>
                    <div className="details-container">
                        <div className="details-resourses">
                            <div className="details-block">
                                <h2>Topic №1 - Lorem ipsum dolor sit amet</h2>
                                <a href="#">Lorem ipsum dolor sit amet</a>
                                <a href="#">Lorem ipsum dolor sit amet</a>
                                <a href="#">Lorem ipsum dolor sit amet</a>
                            </div>
                            <div className="details-block">
                                <h2>Topic №2 - Lorem ipsum dolor sit amet</h2>
                                <a href="#">Lorem ipsum dolor sit amet</a>
                                <a href="#">Lorem ipsum dolor sit amet</a>
                                <a href="#">Lorem ipsum dolor sit amet</a>
                            </div>
                        </div>
                        <div className="details-info">
                            <div className="details-teacher">
                                <div className="details-teacher__photo"></div>
                                <div className="details-teacher__desc">{course.teacher}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default CourseDetails;