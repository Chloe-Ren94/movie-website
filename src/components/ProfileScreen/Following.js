import React from "react";
import {Link} from "react-router-dom";

const Following = ({profile}) => {
    const following = profile.following;

    return(
        <div className="mt-5">
            <h3>Following</h3>
            {
                following.length === 0 &&
                <p>
                    You do not have any following yet.
                </p>
            }
            <ul className="list-group mt-2" style={{width: '50%'}}>
                {
                    following.map(user =>
                        <li key={user.userID} className="list-group-item">
                            <Link to={`/profile/${user.userID}`}
                                  style={{"text-decoration": "none"}}>
                                {user.username}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default Following;