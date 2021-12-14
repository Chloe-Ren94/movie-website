import React from "react";

const Profile = ({profile, hideSensitive=true}) => {
    return(
        <div>
            <div>
                <h3>Personal information</h3>
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
                    </div>
            }
        </div>
    )
}
export default Profile;