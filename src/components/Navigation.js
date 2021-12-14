import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Navigation = () => {
    const profile = useSelector(state => state.profile);

    return(
        <div className="container">
            <ul className="nav nav-pills float-end">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">Search</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        {profile._id ? profile.username : 'Profile'}
                    </Link>
                </li>
                {/*{*/}
                {/*    profile ? (<button>Logout</button>) :*/}
                {/*        (<li className="nav-item">*/}
                {/*            <Link to="/login" className="nav-link">Login</Link>*/}
                {/*        </li>)*/}
                {/*}*/}
            </ul>
            <div style={{clear: 'both'}}></div>
        </div>
    )
}
export default Navigation;