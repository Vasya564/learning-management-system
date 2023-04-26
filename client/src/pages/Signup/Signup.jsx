import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')
    const [group, setGroup] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await signup(fullname, role, group, email, password)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Signup</h3>

            <label>Fullname:</label>
            <input 
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />
            <label>Role:</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)} 
            >
                <option hidden>Виберіть роль</option>
                <option value="студент">Студент</option>
                <option value="викладач">Викладач</option>
                <option value="адміністратор">Адміністратор</option>
            </select> 
            <label>Group:</label>
            <input 
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
            />
            <label>Email:</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={isLoading}>Signup</button>
            {error && <div>{error}</div>}
        </form>
    );
}
 
export default Signup;