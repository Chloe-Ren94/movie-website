import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Navigation from "../Navigation";

const API_URL = 'http://localhost:4000/api'

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
        <div className="mx-auto mt-5" style={{width: "50%"}}>
            <Navigation/>
            <div className="mb-3 row">
                <label for="username" className="col-sm-2 col-form-label">
                    Username</label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="username"
                        id="username"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label for="password" className="col-sm-2 col-form-label">
                    Password</label>
                <div className="col-sm-10">
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
                <label className="col-sm-2 col-form-label">User type</label>
                <select className="form-select ms-3"
                        style={{width: '50%'}}
                        value={user.type}
                        onChange={e => setUser({
                            ...user,
                            type: e.target.value
                        })}>
                    <option value="COMMON">common</option>
                    <option value="VIP">vip</option>
                    <option value="ADMIN">admin</option>
                </select>
            </div>
            <div className="text-center">
                <button
                    className="btn btn-primary rounded-pill"
                    onClick={register}>
                    Register
                </button>
            </div>
        </div>
    );
};
export default Register;