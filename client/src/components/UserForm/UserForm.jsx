import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import './UserForm.scss'

const UserForm = ({ handleSubmit, isLoading, error, emptyFields }) => {
    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(!!id);
    const [initialFields, setInitialFields] = useState({});
    const { user } = useAuthContext()
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')
    const [group, setGroup] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/api/user/${id}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            const {fullname, role, group, email, photo} = json

            if (response.ok) {
                setInitialFields(json);
                setFullname(fullname)
                setRole(role)
                setGroup(group)
                setEmail(email)
                setPhoto(photo)
            }
        }
        if(id){
            fetchUser()
        }
    }, [id])

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);

        if (selectedRole !== 'student') {
            setGroup('-');
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (isEditMode) {
            const updatedFields = {};
            if (fullname !== initialFields.fullname) {
                updatedFields.fullname = fullname;
            }
            if (role !== initialFields.role) {
                updatedFields.role = role;
            }
            if (group !== initialFields.group) {
                updatedFields.group = group;
            }
            if (email !== initialFields.email) {
                updatedFields.email = email;
            }
            if (photo !== initialFields.photo) {
                updatedFields.photo = photo;
            }
            handleSubmit(updatedFields);
        }
        else{
            handleSubmit({ fullname, role, group, email, password, photo });
        }
      };

      const handlePhotoChange = (event) => {
        const selectedPhoto = event.target.files[0];
        setPhoto(selectedPhoto);
        setPhotoPreview(URL.createObjectURL(selectedPhoto));
      };

    return (
        <>
            <form className="user-form" onSubmit={handleFormSubmit}>
                <div className="user-form__template">
                    {photoPreview || (isEditMode && photo) || (isEditMode && photoPreview) ? (
                        <img
                        className="user-form__photo"
                        src={isEditMode && photoPreview ? photoPreview :
                            isEditMode ? `data:${photo.contentType};base64,${photo.data}` :
                            photoPreview ? photoPreview :
                            null}
                        alt="Thumb"
                        />
                    ) : (
                        <p className="user-form__photo--thumbnail">Фото користувача</p>
                    )}
                </div>

                <input
                    className="user-form__input"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    name="photo"
                    required={!isEditMode}
                    onChange={handlePhotoChange}
                />

                <input
                    className={`user-form__input ${emptyFields && emptyFields.includes('fullname') ? 'error' : ''}`} 
                    type="text"
                    value={fullname}
                    placeholder="Повне ім’я"
                    onChange={(e) => setFullname(e.target.value)}
                />
                <select
                    className={`user-form__select ${emptyFields && emptyFields.includes('role') ? 'error' : ''}`}
                    value={role}
                    onChange={handleRoleChange} 
                >
                    <option hidden>Виберіть роль</option>
                    <option value="student">Студент</option>
                    <option value="teacher">Викладач</option>
                    <option value="admin">Адміністратор</option>
                </select>
                {role === "student" &&
                    <>
                        <input
                            className="user-form__input" 
                            type="text"
                            placeholder="Група"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        />
                    </>
                }
                <input
                    className={`user-form__input ${emptyFields && emptyFields.includes('email') ? 'error' : ''}`} 
                    type="email"
                    value={email}
                    placeholder="Пошта"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {!isEditMode && <input
                    className={`user-form__input ${emptyFields && emptyFields.includes('password') ? 'error' : ''}`} 
                    type="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />}

                <button className="user-form__button" disabled={isLoading}>{isEditMode ? 'Зберегти' : 'Створити'}</button>
            </form>
            {error && <div className="user-form__error">{error}</div>}
        </>
    );
}
 
export default UserForm;