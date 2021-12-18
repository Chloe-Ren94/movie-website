import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Navigation from "../Navigation";

const API_URL = 'https://webdev-movie-website.herokuapp.com/api'

const Register = () => {
    const [user, setUser] = useState({username: '', password: '', type: 'COMMON'});
    const navigate = useNavigate();
    const register = () => {
        fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if(res.status === 404) {
                alert('User already exists!');
            } else {
                navigate('/profile')
            }
        });
    };
    return(
        <div className="mt-5 container">
            <Navigation/>
            <div style={{width: "50%"}} className="mx-auto mt-5">
                <div className="mb-3 row">
                    <label for="username" className="col-sm-4 col-md-3 col-form-label">
                        Username</label>
                    <div className="col-sm-8 col-md-9">
                        <input
                            className="form-control"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            placeholder="username"
                            id="username"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="password" className="col-sm-4 col-md-3 col-form-label">
                        Password</label>
                    <div className="col-sm-8 col-md-9">
                        <input
                            className="form-control"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder="password"
                            id="password"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-4 col-md-3 col-form-label">User type</label>
                    <select className="form-select col-sm-8 col-md-9 ms-3"
                            style={{width: '50%'}}
                            value={user.type}
                            onChange={e => setUser({
                                ...user,
                                type: e.target.value
                            })}>
                        <option value="COMMON">common</option>
                        <option value="VIP">vip</option>
                        {/*<option value="ADMIN">admin</option>*/}
                    </select>
                </div>
                <div className="text-center">
                    <Link
                        to="/privacy"
                        className="text-decoration-none fs-5">
                        Privacy Notice
                    </Link>
                </div>
                <div className="text-center mt-2">
                    <button
                        className="btn btn-primary rounded-pill"
                        onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Register;