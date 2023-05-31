import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate, useParams } from "react-router-dom";
import { useEdit } from "../../hooks/useEdit";

// components
import UserForm from "../../components/UserForm/UserForm";
import FlexColumn from "../../components/FlexColumn/FlexColumn";
import Header from "../../components/Header/Header";

const EditUser = () => {
    const { id } = useParams();
    const { edit, isLoading, error } = useEdit()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleSubmit = async (formFields) =>{
        
        if(!user){
            return
        }

        const response = await edit(formFields, id, user.token)
        
        if(response.ok){
            navigate('/users')
        } 
    }

    return (
        <FlexColumn>
            <Header>
                <h1>Редагування користувача</h1>
            </Header>
            <UserForm handleSubmit={handleSubmit} isLoading={isLoading} error={error}/>
        </FlexColumn>
    );
}
 
export default EditUser;