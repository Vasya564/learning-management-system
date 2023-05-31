import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";

// components
import UserForm from "../../components/UserForm/UserForm";
import FlexColumn from "../../components/FlexColumn/FlexColumn";
import Header from "../../components/Header/Header";

const Signup = () => {
    const { signup, isLoading, error, emptyFields } = useSignup()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleSubmit = async (formFields) =>{
        const {fullname, role, group, email, password, photo} = formFields

        if(!user){
            return
        }
        const response = await signup(fullname, role, group, email, password, photo, user.token)
        
        if(response.ok){
            navigate('/users')
        } 
    }

    return (
        <FlexColumn>
            <Header>
                <h1>Створення нового користувача</h1>
            </Header>
            <UserForm handleSubmit={handleSubmit} isLoading={isLoading} error={error} emptyFields={emptyFields}/>
        </FlexColumn>
    );
}
 
export default Signup;