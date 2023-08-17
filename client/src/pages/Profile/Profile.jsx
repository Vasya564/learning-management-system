import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Profile.scss'

// components
import FlexColumnCenter from "../../components/FlexColumnCenter/FlexColumnCenter";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null)
    const { user, token } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:4000/api/user/${id}`, {
                headers: {'Authorization': `Bearer ${token}`},
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
        <FlexColumnCenter>
            {profile &&
                <div className="profile-card"> 
                    <p className="profile-card__photo"><img src={`data:${profile.photo.contentType};base64,${profile.photo.data}`} /></p>
                    <p className="profile-card__name">{profile.fullname}</p>
                    <div className="profile-info">
                        <div className="profile-block">
                            <p className="profile-block__label">Пошта</p>
                            <p className="profile-block__email">{profile.email}</p>
                        </div>
                        {profile.group &&
                        <div className="profile-block">
                            <p className="profile-block__label">Група</p>
                            <p className="profile-block__group">{profile.group}</p>
                        </div>
                        }
                    </div>
                </div>
            }
        </FlexColumnCenter>
    );
}
 
export default Profile;