import { Link, Outlet } from 'react-router-dom';
import { BsHouseDoor, BsJournals } from 'react-icons/bs'
import './Sidebar.scss'

const Sidebar = () => {
    return (
        <main>
            <aside>
                <div className="profile">
                    <div className='profile__photo'></div>
                    <p className='profile__cred'>Name Surname</p>
                </div>
                <hr className='profile__line'/>
                <nav>
                    <ul className='nav__list'>
                        <Link to={``}>
                            <BsHouseDoor /> 
                            <li>Головна</li>
                        </Link>
                        <Link to={`grades`}>
                            <BsJournals />
                            <li>Успішність</li>
                        </Link>
                    </ul>
                </nav>
            </aside>
            <Outlet />
        </main>
    );
}
 
export default Sidebar;