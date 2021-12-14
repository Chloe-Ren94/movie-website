import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const API_URL = 'http://localhost:4000/api';

const Navigation = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
            dispatch({
                type: 'destroy-profile'
            });
            navigate('/');
        });
    }

    return(
        <div className="container" style={{fontSize: '2em'}}>
            <ul className="nav nav-pills float-end">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">Search</Link>
                </li>
                <li className="nav-item">
                    <Link to="/privacy" className="nav-link">Privacy</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        {profile._id ? profile.username : 'Profile'}
                    </Link>
                </li>
                {
                    profile._id ?
                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-danger rounded-pill mx-auto d-block"
                                onClick={logout}>
                                Logout
                            </button>
                        </li>:
                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-success rounded-pill"
                                onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </li>
                }
            </ul>
            <div style={{clear: 'both'}}></div>
        </div>
    )
}
export default Navigation;