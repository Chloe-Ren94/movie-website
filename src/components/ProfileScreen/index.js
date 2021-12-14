import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../Navigation";

const API_URL = 'http://localhost:4000/api'

const Profile = () => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lists = profile.lists;
    const [createList, setCreateList] = useState(false);
    const [listname, setListname] = useState('');
    const [manageUsers, setManageUsers] = useState(false);
    const [users, setUsers] = useState([]);

    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(profile => dispatch({
                type: 'fetch-profile',
                profile
            }))
            .catch(e => navigate('/login'));
    }
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
    const createListHandler = () => {
        const newProfile = {
            ...profile,
            lists: [
                ...profile.lists,
                {
                    listname,
                    movies: []
                }
            ]
        }
        fetch('http://localhost:4000/api/users', {
            method: 'PUT',
            body: JSON.stringify(newProfile),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => dispatch({
                type: 'update-profile',
                profile: newProfile
            }))
    }
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
    useEffect(() => {
        if(!profile._id) {
            getProfile();
        }
    }, []);
    return(
        <div className="container">
            <Navigation/>
            <h1>Profile</h1>
            <div>username: {profile.username}</div>
            <div className="mt-3">
                <div>
                    <h3 className="float-start">Lists</h3>
                    <button
                        className="btn btn-success rounded-pill float-start ms-3"
                        onClick={() => {
                            if(profile.type === 'COMMON') {
                                alert('Common user can only have one list!');
                            } else {
                                setCreateList(true);
                            }
                        }}>
                        Create a list
                    </button>
                </div>
                <div style={{clear: 'both'}}></div>
                {createList &&
                    <div>
                        <input className="form-control float-start"
                               value={listname}
                               placeholder="list name"
                               onChange={e => setListname(e.target.value)}
                               style={{width: '50%'}}/>
                        <button
                            className="btn btn-danger rounded-pill float-start ms-5"
                            onClick={() => {
                                setCreateList(false);
                                setListname('');
                            }}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary rounded-pill float-start ms-3"
                            onClick={createListHandler}>
                            Add
                        </button>
                        <div style={{clear: 'both'}}></div>
                    </div>
                }
                {lists.map(list =>
                    <div>
                        <h5>{list.listname}</h5>
                        {list.movies.length === 0 ?
                            <p>This list has not included any movie yet.</p> :
                            <ul>
                                {list.movies.map(movie =>
                                    <li>{movie.movieTitle}</li>
                                )}
                            </ul>
                        }
                    </div>
                )}
            </div>
            {profile.type === 'ADMIN' &&
                <button
                    onClick={() => {
                        getUsers();
                        setManageUsers(true);
                    }}
                    className="btn btn-warning">
                    Manage users
                </button>
            }
            {manageUsers &&
                <ul>
                    {users.map(user =>
                        <li>
                            {user.username}
                            {user.type !== 'ADMIN' &&
                                <button onClick={() => deleteUser(user)}>Delete</button>}
                        </li>)}
                </ul>
            }
            <button
                onClick={logout}
                className="btn btn-danger">
                Logout
            </button>
        </div>
    );
};
export default Profile;