import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BsHouseDoor, BsJournals } from 'react-icons/bs'
import { ImExit } from 'react-icons/im'
import './Sidebar.scss'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Sidebar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const navigate = useNavigate()

    const handleClick = () => {
        logout()
        navigate('/login')
    }

    return (
        <main>
            <aside>
                {/* User profile section */}
                <div className="profile">
                    <div className='profile__photo'></div>
                    {user && (<p className='profile__cred'>{user.userName}</p>)}
                </div>
                <hr className='profile__line'/>
                {/* Navigation links */}
                <nav>
                    <ul className='nav-list'>
                        <NavLink to="">
                            <BsHouseDoor /> 
                            <li>Головна</li>
                        </NavLink>
                        <NavLink to="grades">
                            <BsJournals />
                            <li>Успішність</li>
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