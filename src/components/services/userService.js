import React from "react";
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:4000/api';

export const logout = (dispatch) => {
    const navigate = useNavigate();

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