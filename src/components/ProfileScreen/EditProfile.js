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
        fetch('http://localhost:4000/api/users', {
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
            <div className="border border-secondary rounded p-2">
                <div>Email</div>
                <input className="form-control ps-0 text-white bg-black"
                       value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="border border-secondary rounded p-2 mt-3">
                <div>Location</div>
                <input className="form-control ps-0 text-white bg-black"
                       value={location}
                       onChange={e => setLocation(e.target.value)}/>
            </div>
            <div className="border border-secondary rounded p-2 mt-3">
                <div>Bio</div>
                <textarea className="form-control ps-0 text-white bg-black"
                          style={{resize: "none"}}
                          value={bio}
                          onChange={e => setBio(e.target.value)}>
                </textarea>
            </div>
            <div className="border border-secondary rounded p-2 mt-3">
                <div>Birthday</div>
                <input className="form-control" type="date" value={birthday}
                       onChange={e => setBirthday(e.target.value)}/>
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