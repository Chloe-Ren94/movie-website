import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";
import Profile from "./Profile";
import Lists from "./Lists";
import ReviewsByReview from "./ReviewsByReview";
import {findInFollowing} from "../services/followingService";


const API_URL = 'https://webdev-movie-website.herokuapp.com/api'

const OtherUserProfile = () => {
    const profile = useSelector(state => state.profile);
    const navigate = useNavigate();
    const profileID = useParams().id;
    const [userProfile, setUserProfile] = useState({lists: [], createdAt: ''});
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();

    const getUserProfile = () => {
        if (profile._id === profileID) {
            navigate('/profile');
        }
        fetch(`${API_URL}/users/${profileID}`)
            .then(res => res.json())
            .then(user => setUserProfile(user));
    }

    const findReviewsByUserID = () => {
        fetch(`https://webdev-movie-website.herokuapp.com/api/reviews/user/${profileID}`)
            .then(res => res.json())
            .then(reviews => setReviews(reviews));
    }

    const followHandler = () => {
        if(!profile._id) {
            navigate('/login');
        }
        const newProfile = {
            ...profile,
            following: [
                {
                    userID: userProfile._id,
                    username: userProfile.username
                },
                ...profile.following
            ]
        }
        fetch('https://webdev-movie-website.herokuapp.com/api/users', {
            method: 'PUT',
            body: JSON.stringify(newProfile),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => dispatch({
            type: 'update-profile',
            profile: newProfile
        }))
    }

    const unfollowHandler = () => {
        const newProfile = {
            ...profile,
            following: profile.following.filter(user => user.userID !== userProfile._id)
        }
        fetch('https://webdev-movie-website.herokuapp.com/api/users', {
            method: 'PUT',
            body: JSON.stringify(newProfile),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => dispatch({
            type: 'update-profile',
            profile: newProfile
        }))
    }

    useEffect(() => {
        getUserProfile();
        findReviewsByUserID();
    }, []);

    return(
        <div className="container mt-5">
            <Navigation/>
            <Profile profile={userProfile} hideSensitive={
                profile.type === 'ADMIN' ? false : true
            }/>
            {
                findInFollowing(userProfile, profile) ?
                    <button
                        className="btn btn-danger rounded-pill mt-3"
                        onClick={unfollowHandler}>
                        Unfollow
                    </button> :
                    <button
                        className="btn btn-primary rounded-pill mt-3"
                        onClick={followHandler}>
                        Follow
                    </button>
            }
            <Lists profile={userProfile} hideSensitive={true}/>
            <ReviewsByReview reviews={reviews}/>
        </div>
    );
};
export default OtherUserProfile;