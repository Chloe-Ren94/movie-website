import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const Lists = ({profile}) => {
    const lists = profile.lists;
    const [createList, setCreateList] = useState(false);
    const [listname, setListname] = useState('');
    const dispatch = useDispatch();

    const createListHandler = () => {
        setCreateList(false);
        setListname('');
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

    return(
        <div className="mt-5">
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
                <div className="mt-3">
                    <h4>{list.listname}</h4>
                    {list.movies.length === 0 ?
                        <p>This list has not included any movie yet.</p> :
                        <ul className="list-group">
                            {list.movies.map(movie =>
                                <li className="list-group-item">
                                    <Link to={`/details/${movie.imdbID}`}
                                          className="text-decoration-none">
                                        {movie.movieTitle}</Link>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            )}
        </div>
    )
}
export default Lists;