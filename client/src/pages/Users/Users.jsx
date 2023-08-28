import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import './Users.scss'

// components
import SkeletonUser from "../../components/skeletons/SkeletonUser";
import UserCard from "../../components/UserCard/UserCard";
import Header from "../../components/Header/Header";

const Users = () => {
    const [users, setUsers] = useState(null)
    const { user, token } = useAuthContext();
    const navigate = useNavigate()

    const fetchUsers = async () => {
        const response = await fetch(`http://localhost:4000/api/user/`, {
            headers: {'Authorization': `Bearer ${token}`},
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

    const handleEditUser = (id) => {
        navigate(`/edit/${id}`)
    }

    const handleDeleteUser = async (id) => {
        const response = await fetch('http://localhost:4000/api/user/' +id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            fetchUsers()
        }
    }

    return (
        <>
            <Header>
                <h1>Користувачі</h1>
                <NavLink to="/signup" replace>Створити користувача</NavLink>
            </Header>
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
                        <UserCard
                            key={user._id} 
                            user={user}
                            handleEditUser={handleEditUser}
                            handleDeleteUser={handleDeleteUser}
                        />
                        )) 
                    }
                    { !users &&
                        [...Array(5).keys()].map(i => {
                            return <SkeletonUser key={i} />
                        })
                    }
                </div>
            </section>
        </>
    );
}
 
export default Users;