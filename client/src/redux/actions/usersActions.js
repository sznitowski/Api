import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    // USER_LOGOUT,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
}
    from "../constants/usersConstants";
import { useNavigate } from "react-router-dom";

//user list
export const fetchUsers = () => async (dispatch) => {
    try {
        const url = "/api/user/users";
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, config);
        const data = await response.json();
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data.data }); // Payload ya contiene data
        console.log(data);
        console.log(data.data);
    } catch (error) {
        console.error("Error fetching users:", error);
        dispatch({ type: FETCH_USERS_FAIL, payload: error.message });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const data = {
            email: email,
            password: password,
        };
        const url = "api/user/login";
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, config);
        const responseData = await response.json();
        console.log(responseData);

        if (response.ok) {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: responseData });
            localStorage.setItem("userInfo", JSON.stringify(data));
            return Promise.resolve(); // Resolve the Promise for success
        } else {
            console.error('Error en la solicitud:', response.status);
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: responseData.message || 'Login failed',
            });
            return Promise.reject(); // Reject the Promise for failure
        }
    } catch (error) {
        console.error('Error:', error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
        });
        return Promise.reject(); // Reject the Promise for error
    }
};


/* export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
}; */

export const Register = (firstName, lastName, email, age, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const url = "/api/user/register";
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, age, password }),
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (response.ok) {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));
            return Promise.resolve(); // Resolve the Promise for success
        } else {
            console.error('Error en la solicitud:', response.status);
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data.message || 'Registration failed',
            });
            return Promise.reject(); // Reject the Promise for failure
        }
    } catch (error) {
        console.error('Error:', error);

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message,
        });
    }
};



