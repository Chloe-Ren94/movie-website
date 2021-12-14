import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";
import Profile from "./Profile";
import Lists from "./Lists";
import Reviews from "./Reviews";
import Admin from "./Admin";

const API_URL = 'http://localhost:4000/api'

const ProfileScreen = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listname, setListname] = useState('');
    const [users, setUsers] = useState([]);

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
        <div className="container">
            <Navigation/>
            <Profile profile={profile} hideSensitive={false}/>
            <Lists profile={profile}/>
            <Reviews profile={profile}/>
            {profile.type === 'ADMIN' &&
                <Admin/>
            }
        </div>
    );
};
export default ProfileScreen;