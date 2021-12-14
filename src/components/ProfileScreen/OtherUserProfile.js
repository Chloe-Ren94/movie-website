import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";
import Profile from "./Profile";
import Lists from "./Lists";
import Reviews from "./Reviews";

const API_URL = 'http://localhost:4000/api'

const OtherUserProfile = () => {
    const profile = useSelector(state => state.profile);
    const navigate = useNavigate();
    const profileID = useParams().id;
    const [userProfile, setUserProfile] = useState({lists: [], createdAt: ''});

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
            <Profile profile={userProfile} hideSensitive={true}/>
            <Lists profile={userProfile}/>
            <Reviews profile={userProfile}/>
        </div>
    );
};
export default OtherUserProfile;