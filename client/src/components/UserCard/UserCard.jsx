import { BiEditAlt, BiTrash } from 'react-icons/bi'
import './UserCard.scss'

const UserCard = ({ user, handleEditUser, handleDeleteUser }) => {
    const roleTranslations = {
        admin: 'Адміністратор',
        student: 'Студент',
        teacher: 'Викладач'
    };

    return (
        <div className="user" key={user._id}>
            <div>
                <div className="user__photo">
                    {user.photo && <img src={user.photo} alt="User Photo" />}
                </div>
            </div>
            <div className="user__name">{user.fullname}</div>
            <div className="user__email">{user.email}</div>
            <div className="user__group">{user.group}</div>
            <div className="user__role">{roleTranslations[user.role]}</div>
            <div className="user__action">
                <button
                    className="user__button" 
                    title="Редагувати користувача" 
                    onClick={() => handleEditUser(user._id)}><BiEditAlt /></button>
                <button
                    className="user__button" 
                    title="Видалити користувача" 
                    onClick={() => handleDeleteUser(user._id)}><BiTrash /></button>
            </div>
        </div>
    );
}
 
export default UserCard;