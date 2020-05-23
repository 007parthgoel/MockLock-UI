import axios from 'axios';

import * as actionTypes from './ActionTypes';
import * as endpoints from '../../../utils/endpoints';
import {
    localConfig,
    set_cookies,
    load_cookies,
    remove_cookies,
    loadAll_cookies
} from '../../../utils/SessionManager';

export const initAdminLogin = (details) => {
    return dispatch => {
        axios.post(endpoints.adminLogin, {
            user_email: details.email,
            password: details.password,
        })
            .then(response => {
                set_cookies("AuthAction-InitAdmin",localConfig.user_type,response.data.response.user_type,{});
                // set_cookies("AuthAction-InitAdmin",localConfig.user_id,response.data.response._id,{});
                set_cookies("AuthAction-InitAdmin",localConfig.user_token,response.data.response.token,{});
                let user_details = {
                    // user_id: response.data.response._id,
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
        if (load_cookies("AuthAction-authCheckState", localConfig.user_token)) {
            let user=loadAll_cookies("AuthAction-authCheckState");
            loadAll_cookies("AuthAction-authCheckState");
            let user_details = {
                // user_id: user.user_id,
                user_type: user.user_type,
                user_token: user.user_token
            };
            dispatch(adminLoginSuccess(user_details));
        } else (dispatch(authLogout));
    }
};

export const authLogout = () => {
    // remove_cookies("AuthAction-onLogout",localConfig.user_id);
    remove_cookies("AuthAction-onLogout",localConfig.user_token);
    remove_cookies("AuthAction-onLogout",localConfig.user_type);
    loadAll_cookies("AuthAction-onLogout");
    return {
        type: actionTypes.ADMIN_LOGOUT
    }
};
