import axios from 'axios';

import * as actionTypes from './ActionTypes';
import * as endpoints from '../../../utils/endpoints';
import {
    localStorageConfig,
    set_localStorage,
    remove_localStorage,
    get_localStorage
} from '../../../utils/SessionManager';

export const initAdminLogin = (details) => {
    return dispatch => {
        axios.post(endpoints.adminLogin, {
            user_email: details.email,
            password: details.password,
        })
            .then(response => {
                // set_localStorage("AuthAction-InitAdmin", localStorageConfig.is_login, true);
                set_localStorage("AuthAction-InitAdmin", localStorageConfig.user_token,response.data.response.token);
                set_localStorage("AuthAction-InitAdmin", localStorageConfig.user_type, response.data.response.user_type);
                set_localStorage("AuthAction-InitAdmin", localStorageConfig.user_id, response.data.response._id);
                // set_localStorage("AuthAction-InitAdmin", localStorageConfig.Admin_user, JSON.stringify(response.data));
                let user_details = {
                    user_id: response.data.response._id,
                    user_type: response.data.response.user_type,
                    user_token: response.data.response.token,
                    // user_email: response.data.response.user_email,
                };
                dispatch(adminLoginSuccess(user_details));
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

export const authCheckState = () => {
    return dispatch => {
        // if (get_localStorage("AuthAction-authCheckState", localStorageConfig.is_login) === true) {
        if (get_localStorage("AuthAction-authCheckState", localStorageConfig.user_token)) {
            // let details = JSON.parse(get_localStorage(localStorageConfig.Admin_user));
            let user_details = {
                user_id: get_localStorage("AuthAction-authCheckState", localStorageConfig.user_id),
                user_type: get_localStorage("AuthAction-authCheckState", localStorageConfig.user_type),
                user_token:get_localStorage("AuthAction-authCheckState",localStorageConfig.user_token),
            };
            dispatch(adminLoginSuccess(user_details));
        } else (dispatch(authLogout));
    }
};

export const authLogout = () => {
    // set_localStorage("AuthAction-onLogout", localStorageConfig.is_login, false);
    remove_localStorage("AuthAction-onLogout", localStorageConfig.user_id);
    remove_localStorage("AuthAction-onLogout", localStorageConfig.user_type);
    remove_localStorage("AuthAction-onLogout", localStorageConfig.user_token);
    return {
        type: actionTypes.ADMIN_LOGOUT
    }
};
