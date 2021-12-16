import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const API_URL = 'https://webdev-movie-website.herokuapp.com/api';

const Navigation = ({active}) => {
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
                    <Link to="/"
                          className={active === 'home' ? 'nav-link active' : 'nav-link'}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/search"
                          className={active === 'search' ? 'nav-link active' : 'nav-link'}>
                        Search
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/privacy"
                          className={active === 'privacy' ? 'nav-link active' : 'nav-link'}>
                        Privacy
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile"
                          className={active === 'profile' ? 'nav-link active' : 'nav-link'}>
                        {profile._id ? profile.username : 'Profile'}
                    </Link>
                </li>
                {
                    profile._id ?
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={logout}>
                                Logout
                            </Link>
                        </li>:
                        <li className="nav-item">
                            <Link to="/login"
                                  className={active === 'login' ? 'nav-link active' : 'nav-link'}>
                                Login
                            </Link>
                        </li>
                }
            </ul>
            <div style={{clear: 'both'}}></div>
        </div>
    )
}
export default Navigation;