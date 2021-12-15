import React from "react";
import {useDispatch} from "react-redux";

const Profile = ({profile, hideSensitive=true}) => {
    const dispatch = useDispatch();

    return(
        <div className="mt-5">
            <div>
                <h3 className="float-start">Personal information</h3>
                {
                    !hideSensitive &&
                    <button
                        className="btn btn-success rounded-pill float-start ms-3"
                        onClick={() => dispatch({type: 'click-edit'})}>
                        Edit
                    </button>
                }
                <div style={{clear: 'both'}}></div>
                <div>Username: {profile.username}</div>
                <div>Bio: {profile.bio}</div>
                <div>Joined: {profile.createdAt.split('T')[0]}</div>
            </div>
            {
                !hideSensitive &&
                    <div>
                        <div>Email: {profile.email}</div>
                        <div>Birthday: {profile.birthday}</div>
                        <div>Location: {profile.location}</div>
                        <div>User type: {profile.type}</div>
                    </div>
            }
        </div>
    )
}
export default Profile;