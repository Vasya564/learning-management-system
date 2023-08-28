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
    const { user, token } = useAuthContext()
    const [loading, setLoading] = useState(true);

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
                  {user ? 
                    (
                    <img src={user.photo} alt='User Profile' />
                  ) : (
                    <div>No photo available</div>
                  )}
                </div>
                    {user && (<p className='profile__cred'>{user.fullname}</p>)}
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
                        {user && user.role === 'admin' && 
                        <NavLink to="users">
                            <FiUsers />
                            <li>Користувачі</li>
                        </NavLink>}
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