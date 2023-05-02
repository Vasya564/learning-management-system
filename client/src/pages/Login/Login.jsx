import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import './Login.scss'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const response = await login(email, password)

        if(response.ok){
            setEmail('')
            setPassword('')
            navigate('/')
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-form__title">Вхід в систему VLE</h2>
                <input
                    className="login-form__input" 
                    type="email"
                    value={email}
                    placeholder="Пошта"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-form__input" 
                    type="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-form__button" disabled={isLoading}>Увійти</button>
            </form>
            {error && <div className="login-form__error">{error}</div>}
        </div>
    );
}
 
export default Login;