import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Users.scss'

const Users = () => {
    const [users, setUsers] = useState(null)
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`http://localhost:4000/api/user/`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
        }
        
        if(user){
            fetchUsers()
        }
    }, [])

    return (
        <>
            <header className='content__header'>
                <h1>Користувачі</h1>
                <NavLink to="/signup" replace>Створити користувача</NavLink>
            </header>
            <section className="content__users">
                <div className="users__labels">
                    <div className="users__labels--photo">Фото</div>
                    <div className="users__labels--name">Повне ім’я</div>
                    <div className="users__labels--email">Пошта</div>
                    <div className="users__labels--group">Група</div>
                    <div className="users__labels--group">Роль</div>
                </div>
                <div className="users__info">
                    { users && users.map((user) => (
                        <div className="user" key={user._id}>
                            <div>
                                <div className="user__photo"></div>
                            </div>
                            <div className="user__name">{user.fullname}</div>
                            <div className="user__email">{user.email}</div>
                            <div className="user__group">{user.group}</div>
                            <div className="user__group">{user.role}</div>
                        </div>
                        )) 
                    }
                </div>
            </section>
        </>
    );
}
 
export default Users;