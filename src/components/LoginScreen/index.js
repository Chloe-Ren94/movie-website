import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Navigation from "../Navigation";
import {useDispatch} from "react-redux";

const API_URL = 'https://webdev-movie-website.herokuapp.com/api';

const Login = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = () => {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if(res.status === 403) {
                alert('Invalid username or password!');
            } else {
                navigate('/profile');
            }
        });
    }
    return(
        <div className="container mt-5">
            <Navigation active='login'/>
            <div className="mx-auto mt-5" style={{width: "50%"}}>
                <div className="mb-3 row">
                    <label htmlFor="username" className="col-sm-4 col-md-3 col-form-label">
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
                    <label htmlFor="password" className="col-sm-4 col-md-3 col-form-label">
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
                <div className="text-center">
                    <button
                        className="btn btn-primary rounded-pill"
                        onClick={login}>
                        Login
                    </button>
                </div>
                <div className="mt-2 mx-auto">
                    Don't have an account?
                    <Link to="/register" className="ms-2 text-decoration-none">Register</Link> now!
                </div>
            </div>
        </div>
    );
};
export default Login;