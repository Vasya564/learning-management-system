import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import './Users.scss'

const Users = () => {
    const [users, setUsers] = useState(null)
    const { user } = useAuthContext();
    const navigate = useNavigate()

    const roleTranslations = {
        admin: 'Адміністратор',
        student: 'Студент',
        teacher: 'Викладач'
      };

    const fetchUsers = async () => {
        const response = await fetch(`http://localhost:4000/api/user/`, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

        if (response.ok) {
            const sortedUsers = json.slice().sort((a, b) => {
                return a.fullname.localeCompare(b.fullname);
            });
            setUsers(sortedUsers)
        }
    }

    useEffect(() => {
        if(user){
            fetchUsers()
        }
    }, [])

    const handleDeleteUser = async (id) => {
        const response = await fetch('http://localhost:4000/api/user/' +id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        if(response.ok){
            fetchUsers()
        }
    }

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
                    <div className="users__labels--action">Дія</div>
                </div>
                <div className="users__info">
                    { users && users.map((user) => (
                        <div className="user" key={user._id}>
                            <div>
                                <div className="user__photo">
                                    {user.photo && <img src={`data:${user.photo.contentType};base64,${user.photo.data}`} alt="User Photo" />}
                                </div>
                            </div>
                            <div className="user__name">{user.fullname}</div>
                            <div className="user__email">{user.email}</div>
                            <div className="user__group">{user.group}</div>
                            <div className="user__group">{roleTranslations[user.role]}</div>
                            <div className="users__action">
                                <button title="Редагувати користувача" onClick={() => navigate(`/edit/` +user._id)}><BiEditAlt /></button>
                                <button title="Видалити користувача" onClick={() => handleDeleteUser(user._id)}><BiTrash /></button>
                            </div>
                        </div>
                        )) 
                    }
                </div>
            </section>
        </>
    );
}
 
export default Users;