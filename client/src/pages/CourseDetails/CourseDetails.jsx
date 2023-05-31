import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CiCirclePlus } from 'react-icons/ci'
import { BiTrash } from 'react-icons/bi'
import './CourseDetails.scss'

// components
import FileIcon from "../../components/FileIcon/FileIcon";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null)
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const fetchCourse = async () => {
        const response = await fetch(`http://localhost:4000/api/courses/${id}`, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

        if (response.ok) {
            setCourse(json)
        }
    }

    useEffect(() => {
        if(user){
            fetchCourse()
        }
    }, [id])

    const deleteBlock = async (courseId, blockId) => {
        try {
          const response = await fetch(`http://localhost:4000/api/courses/resources/${courseId}/${blockId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
          });
      
          if (response.ok) {
            fetchCourse()
          } else {
            // Handle the error case
            const errorData = await response.json();
            console.error(errorData.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div>
            {course && (
                <div>
                    <div className="details-header">
                        <h1>{course.title}</h1>
                        <p>{course.specialization}</p>
                    </div>
                    <div className="details-container">
                        <div className="details-resourses">
                        {!course.resources.length ? (
                            user && user.userRole !== 'student' ? (
                                navigate(`/add-block/${id}`)
                            ) : (
                                <div className="details-block">
                                    <h2>Наразі в цьому курсі немає тем</h2>        
                                </div>
                            )
                            ) : (
                            course.resources.map((block, index) => (
                                <div className="details-block" key={index}>
                                    <div className="details-block__title">
                                    <h2>{block.topic}</h2>
                                    {user && user.userRole !== 'student' &&
                                        <button
                                            title="Видалити блок" 
                                            onClick={() => deleteBlock(id, index)}
                                        >
                                            <BiTrash size={24}/>
                                        </button>
                                    }
                                    </div>
                                    <div className="details-block__files">
                                    {block.files.map((file, fileIndex) => (
                                        <div className="details-block__file" key={fileIndex}>
                                        <FileIcon size={24} file={file}/>
                                        <a
                                            href={`http://localhost:4000${file.path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {decodeURIComponent(file.originalName.split('.').slice(0, -1).join('.'))}
                                        </a>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                        <div className="details-info">
                            <div className="details-teacher">
                                <div className="details-teacher__desc">{course.teacher}</div>
                            </div>
                        </div>
                    </div>
                    {user && user.userRole !== 'student' && (
                    <button 
                        className="details-add-button" 
                        onClick={() => navigate(`/add-block/${id}`)}>
                            <span>
                                <CiCirclePlus size={24} />
                                <p>Додати новий блок</p>
                            </span>
                    </button>
                    )}
                </div>
            )}
        </div>
    );
}
 
export default CourseDetails;