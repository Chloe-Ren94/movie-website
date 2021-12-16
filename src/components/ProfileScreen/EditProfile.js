import React, {useState} from "react";
import {useDispatch} from "react-redux";

const EditProfile = ({profile}) => {
    const [bio, setBio] = useState(profile.bio);
    const [email, setEmail] = useState(profile.email);
    const [location, setLocation] = useState(profile.location);
    const [birthday, setBirthday] = useState(profile.birthday);
    const dispatch = useDispatch();
    
    const submitEditHandler = () => {
        const newProfile = {
            ...profile,
            email,
            bio,
            location,
            birthday
        };
        fetch('https://webdev-movie-website.herokuapp.com/api/users', {
            method: 'PUT',
            body: JSON.stringify(newProfile),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => dispatch({
            type: 'click-save',
            profile: newProfile
        }))
    }

    return(
        <div className="mt-5">
            <h3>Edit personal information</h3>
            <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Email</label>
                <div className="col-sm-10 col-md-10 col-lg-11">
                    <input
                        className="form-control text-white bg-black border"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="email"
                        id="email"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="location" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Location</label>
                <div className="col-sm-10 col-md-10 col-lg-11">
                    <input
                        className="form-control text-white bg-black border"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="location"
                        id="location"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="bio" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Bio</label>
                <div className="col-sm-10 col-md-10 col-lg-11">
                    <textarea className="form-control text-white bg-black border"
                              rows="3"
                              value={bio}
                              onChange={e => setBio(e.target.value)}
                              placeholder="bio"
                              id="bio">
                     </textarea>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="birthday" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Birthday</label>
                <div className="col-sm-10 col-md-10 col-lg-11">
                    <input className="form-control" type="date" value={birthday}
                           onChange={e => setBirthday(e.target.value)}
                           id="birthday"/>
                </div>
            </div>
            <button
                className="btn btn-primary float-end rounded-pill mt-3 ms-3"
                onClick={submitEditHandler}>
                Submit
            </button>
            <button
                className="btn btn-danger float-end rounded-pill mt-3"
                onClick={() => dispatch({
                    type: 'click-cancel'
                })}>
                Cancel
            </button>
            <div style={{clear: 'both'}}></div>
        </div>
    )
}
export default EditProfile;