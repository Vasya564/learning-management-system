import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Profile.scss'

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null)
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/api/user/${id}`, {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok) {
                setProfile(json)
            }
        }
        
        if(user){
            fetchUser()
        }
    }, [id])
    return (
        <div className="center-container">
            {profile && 
                <div className="profile-card">
                    <p className="profile-card__photo"><img src={`data:${profile.photo.contentType};base64,${profile.photo.data}`} /></p>
                    <p className="profile-card__name">Повне ім’я: {profile.fullname}</p>
                    <p className="profile-card__email">Пошта: {profile.email}</p>
                    <p className="profile-card__group">Група: {profile.group}</p>
                </div>
            }
        </div>
    );
}
 
export default Profile;