import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";
import Profile from "./Profile";
import Lists from "./Lists";
import Admin from "./Admin";
import EditProfile from "./EditProfile";
import ReviewsByProfile from "./ReviewsByProfile";
import Following from "./Following";

const API_URL = 'http://localhost:4000/api'

const ProfileScreen = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(profile => dispatch({
                type: 'fetch-profile',
                profile
            }))
            .catch(e => navigate('/login'));
    }

    useEffect(() => {
        if(!profile._id) {
            getProfile();
        }
    }, []);

    return(
        <div className="container mt-5">
            <Navigation active='profile'/>
            {
                profile.edit ? <EditProfile profile={profile}/> :
                    <Profile profile={profile} hideSensitive={false} edit={true}/>
            }
            <Lists profile={profile} hideSensitive={false}/>
            <ReviewsByProfile profile={profile}/>
            <Following profile={profile}/>
            {
                profile.type === 'ADMIN' && <Admin/>
            }
        </div>
    );
};
export default ProfileScreen;