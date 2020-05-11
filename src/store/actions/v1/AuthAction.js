import axios from 'axios';

import * as actionTypes from './ActionTypes';
import * as endpoints from '../../../utils/endpoints';
import {localStorageConfig,set_localStorage,remove_localStorage} from '../../../utils/SessionManager';

export const initAdminLogin = (details) => {
    return dispatch => {
        axios.post(endpoints.adminLogin, {
            user_email: details.email,
            password: details.password,
        })
            .then(response => {
                set_localStorage("AuthAction-InitAdmin",localStorageConfig.is_login,true);
                set_localStorage("AuthAction-InitAdmin",localStorageConfig.Admin_user,JSON.stringify(response.data));
                dispatch(adminLoginSuccess(response.data));
            })
            .catch(error => {
                dispatch(adminLoginFailed(error));
            });
    };
};

const adminLoginSuccess = (details) => {
    return {
        type: actionTypes.ADMIN_LOGIN_SUCCESS,
        details: details
    };
};

const adminLoginFailed = (error) => {
    return {
        type: actionTypes.ADMIN_LOGIN_FAILED,
        error: error,
    };
};

export const onLogout=()=>{
    set_localStorage("AuthAction-onLogout",localStorageConfig.is_login,false);
    remove_localStorage("AuthAction-onLogout",localStorageConfig.Admin_user);
    return {
        type:actionTypes.ADMIN_LOGOUT
    }
};
