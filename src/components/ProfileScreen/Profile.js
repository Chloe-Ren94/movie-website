import React from "react";
import {useDispatch} from "react-redux";

const Profile = ({profile, hideSensitive=true, edit=false}) => {
    const dispatch = useDispatch();

    return(
        <div className="mt-5">
            <div>
                <h3 className="float-start">Personal information</h3>
                {
                    edit &&
                    <button
                        className="btn btn-success rounded-pill float-start ms-3 mt-1"
                        onClick={() => dispatch({type: 'click-edit'})}>
                        Edit
                    </button>
                }
                <div style={{clear: 'both'}}></div>
                <div>Username: {profile.username}</div>
                <div className="mt-2">Bio: {profile.bio}</div>
                <div className="mt-2">Joined: {profile.createdAt.split('T')[0]}</div>
            </div>
            {
                !hideSensitive &&
                    <div>
                        <div className="mt-2">Email: {profile.email}</div>
                        <div className="mt-2">Birthday: {profile.birthday}</div>
                        <div className="mt-2">Location: {profile.location}</div>
                        <div className="mt-2">User type: {profile.type}</div>
                    </div>
            }
        </div>
    )
}
export default Profile;