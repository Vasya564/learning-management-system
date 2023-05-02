import './Home.scss'
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import CourseCard from '../../components/CourseCard/CourseCard';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [courses, setCourses] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('http://localhost:4000/api/courses', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                setCourses(json)
            }
        }
        
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
                .sort((a, b) => {
                    if (a.status === b.status) {
                      return a.title.localeCompare(b.title);
                    } else {
                      return a.status - b.status;
                    }
                  });
            setFilteredCourses(newFilteredCourses);
        }
    }, [courses, filterValue])
    
    return (
        <> 
            {/* Page header with filter */}
            <header className='content__header'>
                <h1>Мої курси</h1>
                <NavLink to="/create-course" replace>Створити курс</NavLink>
                <select 
                    value={filterValue} 
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    <option value="">Всі статуси</option>
                    <option value="1">Активні</option>
                    <option value="2">Завершені</option>
                    <option value="3">Повторний курс</option>
                </select>
            </header>
            {/* Courses wrapper and courses */}
            <section className='content__courses'>
                {filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course}/>
                ))}
            </section>
        </>
    );
}
 
export default Home;