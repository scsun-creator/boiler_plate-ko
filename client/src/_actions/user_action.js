import axios from "axios";
import {LOGIN_USER} from './types';
import {REGISTER_USER} from './types';
import {AUTH_USER} from './types';
import {LOGOUT} from './types';

export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login',dataToSubmit).then(res => res.data);

    return {
        type : LOGIN_USER,
        payload : request
    }

}

export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register',dataToSubmit).then(res => res.data);

    return {
        type : REGISTER_USER,
        payload : request
    }

}

export function auth(dataToSubmit){

    const request = axios.get('/api/users/auth').then(res => res.data);

    return {
        type : AUTH_USER,
        payload : request
    }

}

export function logout(dataToSubmit){

    const request = axios.get('/api/users/logout',dataToSubmit).then(res => res.data);

    return {
        type : LOGOUT,
        payload : request
    }

}