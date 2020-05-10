import axios from 'axios';

import * as actionTypes from './ActionTypes';
import * as endpoints from '../../../utils/endpoints';

export const initAdminLogin = (details) => {
    return dispatch => {
        console.log(details);
        axios.post(endpoints.adminLogin, {
            user_email: details.email,
            password: details.password,
        })
            .then(response => {
                console.log(response.data);
                // localStorage.setItem('user',response.data.response);
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
