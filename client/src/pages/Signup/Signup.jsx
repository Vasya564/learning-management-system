import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";
import FlexColumn from "../../components/FlexColumn/FlexColumn";

const Signup = () => {
    
    const { signup, isLoading, error } = useSignup()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleSubmit = async (formFields) =>{
        const {fullname, role, group, email, password, photo} = formFields

        if(!user){
            return
        }
        // console.log(fullname, role, group, email, password, photo)
        const response = await signup(fullname, role, group, email, password, photo, user.token)
        
        if(response.ok){
            navigate('/users')
        } 
    }

    return (
        <FlexColumn>
            <h1>Створення нового користувача</h1>
            <UserForm handleSubmit={handleSubmit} isLoading={isLoading} error={error}/>
        </FlexColumn>
    );
}
 
export default Signup;