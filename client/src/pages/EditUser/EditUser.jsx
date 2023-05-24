import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { useEdit } from "../../hooks/useEdit";
import { useParams } from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";

const EditUser = () => {
    const { id } = useParams();
    const { edit, isLoading, error } = useEdit()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleSubmit = async (formFields) =>{
        // const {fullname, role, group, email, password, photo} = formFields

        if(!user){
            return
        }
        // console.log(formFields)
        const response = await edit(formFields, id, user.token)
        
        if(response.ok){
            navigate('/users')
        } 
    }

    return (
        <div className="signup-container">
            <h1>Редагування користувача</h1>
            <UserForm handleSubmit={handleSubmit} isLoading={isLoading} error={error}/>
        </div>
    );
}
 
export default EditUser;