import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";

const API_URL = 'http://localhost:4000/api'

const OtherUserProfile = () => {
    const profile = useSelector(state => state.profile);
    const navigate = useNavigate();
    const profileID = useParams().id;
    const [userProfile, setUserProfile] = useState({});

    const getUserProfile = () => {
        if (profile._id === profileID) {
            navigate('/profile');
        }
        fetch(`${API_URL}/users/${profileID}`)
            .then(res => res.json())
            .then(user => setUserProfile(user));
    }

    useEffect(getUserProfile, []);

    return(
        <div className="container">
            <Navigation/>
            <h1>Profile</h1>
            <div>username: {userProfile.username}</div>
        </div>
    );
};
export default OtherUserProfile;