import * as actionTypes from './ActionTypes';
import axios from 'axios';
import * as endpoints from '../../../utils/endpoints';

export const initQueries = () => {
    return dispatch => {
        axios.post(endpoints.fetchAllQueries, {status: "PENDING"})
            .then(response => {
                // console.log(response.data);
                dispatch(setQueries(response.data));
            })
            .catch(err => {
                // console.log(err);
                dispatch(fetchQueriesFailed(err));
            });
    };
};

export const setQueries = (queries) => {
    return {
        type: actionTypes.SET_QUERIES,
        queries: queries
    };
};

export const fetchQueriesFailed = (err) => {
    return {
        type: actionTypes.FETCH_QUERIES_FAILED,
        error: err
    };
};

export const querySelected = (_id) => {
    return {
        type: actionTypes.QUERY_SELECTED,
        _id: _id
    };
};