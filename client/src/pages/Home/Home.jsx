import './Home.scss'
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';

// components
import CourseCard from '../../components/CourseCard/CourseCard';
import Header from '../../components/Header/Header';

const Home = () => {
    const [courses, setCourses] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);

    const { user } = useAuthContext()

    const fetchCourses = async () => {
        const response = await fetch('http://localhost:4000/api/courses', {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

        if (response.ok) {
            setCourses(json)
        }
    }

    useEffect(() => {
        if(user){
            fetchCourses()
        }
    }, [])

    useEffect(() => {
        if (courses){
            const newFilteredCourses = courses
                .filter((course) => {
                    if (filterValue === "") {
                        return true;
                    } else {
                        return course.status === parseInt(filterValue);
                    }
                })
                .filter((course) => {
                    if(user.userRole === 'student'){
                        return course.students.includes(user.email);
                    }
                    else if(user.userRole === 'teacher'){
                        return course.teacher.includes(user.userName);
                    }
                    else{
                        return course
                    }
                })
                .sort((a, b) => {
                    if (a.status === b.status) {
                      return a.title.localeCompare(b.title);
                    } else {
                      return a.status - b.status;
                    }
                  });
            setFilteredCourses(newFilteredCourses);
        }
    }, [courses, filterValue, user.email])
    
    return (
        <> 
            {/* Page header with filter */}
            <Header>
                {user && user.userRole === 'admin' ? <h1>Всі курси</h1> : <h1>Мої курси</h1>}
                {user && user.userRole !== 'student' && (
                    <NavLink to="/create-course" replace>
                        Створити курс
                    </NavLink>
                )}
                <select 
                    value={filterValue} 
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    <option value="">Всі статуси</option>
                    <option value="1">Активні</option>
                    <option value="2">Завершені</option>
                    <option value="3">Повторний курс</option>
                </select>
            </Header>
            {/* Courses wrapper and courses */}
            <section className='content__courses'>
                {filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course} fetchCourses={fetchCourses}/>
                ))}
            </section>
        </>
    );
}
 
export default Home;