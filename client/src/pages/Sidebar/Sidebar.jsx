import { NavLink, Outlet } from 'react-router-dom';
import { BsHouseDoor, BsJournals } from 'react-icons/bs'
import './Sidebar.scss'

const Sidebar = () => {
    return (
        <main>
            <aside>
                {/* User profile section */}
                <div className="profile">
                    <div className='profile__photo'></div>
                    <p className='profile__cred'>Name Surname</p>
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