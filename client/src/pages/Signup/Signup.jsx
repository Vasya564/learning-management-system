import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import './Signup.scss'

const Signup = () => {
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')
    const [group, setGroup] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, isLoading, error } = useSignup()

    const navigate = useNavigate()

    const { user } = useAuthContext()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!user){
            return
        }

        var response;
        // console.log(fullname, role, group, email, password)
        if (role === "student"){
            response = await signup(fullname, role, group, email, password, user.token)
        } 
        else {
            setGroup('')
            response = await signup(fullname, role, group, email, password, user.token)
        }
        if(response.ok){
            setFullname('')
            setRole('')
            setGroup('')
            setEmail('')
            setPassword('')
            navigate('/users')
        } 
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-form__title">Створення нового користувача</h2>

                <input
                    className="signup-form__input" 
                    type="text"
                    value={fullname}
                    placeholder="Повне ім’я"
                    onChange={(e) => setFullname(e.target.value)}
                />
                <select
                    className="signup-form__select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)} 
                >
                    <option hidden>Виберіть роль</option>
                    <option value="student">Студент</option>
                    <option value="teacher">Викладач</option>
                    <option value="admin">Адміністратор</option>
                </select>
                {role === "student" &&
                    <div>
                        <input
                            className="signup-form__input" 
                            type="text"
                            placeholder="Група"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        />
                    </div>
                }
                <input
                    className="signup-form__input" 
                    type="email"
                    value={email}
                    placeholder="Пошта"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="signup-form__input" 
                    type="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="signup-form__button" disabled={isLoading}>Створити</button>
            </form>
            {error && <div className="signup-form__error">{error}</div>}
        </div>
    );
}
 
export default Signup;