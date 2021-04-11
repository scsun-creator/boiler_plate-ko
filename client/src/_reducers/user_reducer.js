import {LOGIN_USER} from '../_actions/types';
import {REGISTER_USER} from '../_actions/types';
import {AUTH_USER} from '../_actions/types';
import {LOGOUT} from '../_actions/types';


export default function (state={"isLogin" : false}, action){
    //console.log(action)
    switch (action.type) {

        case LOGIN_USER :
            return {...state, loginSuccess : action.payload, "isLogin" : true}
            break;
        case REGISTER_USER :
            return {...state, registerSuccess : action.payload}
            break;
        case AUTH_USER :
            return {...state, userData : action.payload}
            break;
        case LOGOUT :
            return {"isLogin" : false}
            break;    

        default:
            return state;

    }
}