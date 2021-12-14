import React, {useState} from "react";
import {Link} from "react-router-dom";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [manageUsers, setManageUsers] = useState(false);

    const getUsers = () => {
        fetch('http://localhost:4000/api/users')
            .then(res => res.json())
            .then(users => setUsers(users))
    }
    const deleteUser = (deleteUser) => {
        fetch(`http://localhost:4000/api/users/${deleteUser._id}`, {
            method: 'DELETE'
        }).then(res => setUsers(users.filter(user => user._id !== deleteUser._id)))
    }

    return(
        <div className="mt-5">
            <h3>Administrator role</h3>
            <button
                onClick={() => {
                    getUsers();
                    setManageUsers(true);
                }}
                className="btn btn-warning">
                Manage users
            </button>
            {manageUsers &&
                <ul className="mt-3 list-group"
                    style={{width: '50%'}}>
                    {users.map(user =>
                        <li className="list-group-item">
                            <div className="row">
                                <Link to={`/profile/${user._id}`}
                                      className="text-decoration-none col align-self-center">
                                    {user.username}
                                </Link>
                                {user.type !== 'ADMIN' &&
                                    <button
                                        className="btn btn-danger rounded-pill col"
                                        onClick={() => deleteUser(user)}>
                                        Delete
                                    </button>}
                            </div>
                        </li>)}
                </ul>
            }
        </div>
    )
}
export default Admin;