import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { ImExit } from 'react-icons/im'
import './Sidebar.scss'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const Sidebar = () => {
    const { logout } = useLogout()
    const [photo, setPhoto] = useState(null)
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const storedPhoto = localStorage.getItem('userPhoto'); // Retrieve photo from local storage
      
            if (storedPhoto) {
              setPhoto(JSON.parse(storedPhoto));
              setLoading(false);
            } else {
              const response = await fetch(`http://localhost:4000/api/user/${user._id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
              });
              const json = await response.json();
              const { photo } = json;
      
              if (response.ok) {
                setPhoto(photo);
                localStorage.setItem('userPhoto', JSON.stringify(photo)); // Store photo in local storage
              }
      
              setLoading(false);
            }
          };
        if(user){
            fetchUser()
        }
    }, [user])

    const navigate = useNavigate()

    const handleClick = () => {
        logout()
        navigate('/login')
    }

    return (
        <main>
            <aside>
                {/* User profile section */}
                {user && <Link to={`profile/${user._id}`} className='profile__link'>
                <div className="profile">
                  <div className='profile__photo'>
                  {loading ? (
                    <div></div>
                  ) : photo ? (
                    <img src={`data:${photo.contentType};base64,${photo.data}`} alt='User Profile' />
                  ) : (
                    <div>No photo available</div>
                  )}
                </div>
                    {user && (<p className='profile__cred'>{user.userName}</p>)}
                </div>
                </Link>}
                <hr className='profile__line'/>
                {/* Navigation links */}
                <nav>
                    <ul className='nav-list'>
                        <NavLink to="">
                            <BsHouseDoor /> 
                            <li>Головна</li>
                        </NavLink>
                        <NavLink to="users">
                            <FiUsers />
                            <li>Користувачі</li>
                        </NavLink>
                        {user && (
                            <button className='nav-list__button' onClick={handleClick}><ImExit />Вийти</button>
                        )}
                    </ul>
                </nav>
            </aside>
            {/* Main content section */}
            <section className='content'>
                <Outlet />
            </section>
        </main>
    );
}
 
export default Sidebar;