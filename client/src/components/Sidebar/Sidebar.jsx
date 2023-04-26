import { NavLink, Outlet } from 'react-router-dom';
import { BsHouseDoor, BsJournals } from 'react-icons/bs'
import './Sidebar.scss'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Sidebar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <main>
            <aside>
                {/* User profile section */}
                <div className="profile">
                    <div className='profile__photo'></div>
                    {user && (<p className='profile__cred'>{user.email}</p>)}
                </div>
                <hr className='profile__line'/>
                {/* Navigation links */}
                <nav>
                    <ul className='nav__list'>
                        <NavLink to="">
                            <BsHouseDoor /> 
                            <li>Головна</li>
                        </NavLink>
                        <NavLink to="grades">
                            <BsJournals />
                            <li>Успішність</li>
                        </NavLink>
                        {!user && (
                            <NavLink to="login">
                                <li>Login</li>
                            </NavLink>
                        )}
                    </ul>
                    {user && (<button onClick={handleClick}>Log out</button>)}
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