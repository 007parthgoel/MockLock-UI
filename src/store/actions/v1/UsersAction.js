import * as actionTypes from './ActionTypes';
import axios from 'axios';
import * as endpoints from '../../../utils/endpoints';

export const initAllUsersList = () => {
    return dispatch => {
        axios.get(endpoints.fetchAllUsers)
            .then(response => {
                dispatch(setUsersList(response.data));
            })
            .catch(error => {
                dispatch(fetchUsersListFailed(error));
            })
    }
};

const setUsersList = (list) => {
    return {
        type: actionTypes.SET_USERS_LIST,
        list: list,
    };
};

const fetchUsersListFailed = (error) => {
    return {
        type:actionTypes.FETCH_USERS_LIST_FAILED,
        error:error,
    }

}