import axios from 'axios';

import * as actionTypes from './ActionTypes';
import * as endpoints from '../../../utils/endpoints';

export const initStationaryPoints = () => {
    return dispatch => {
        axios.get(endpoints.fetchAllStationaryPoints,
            {headers: {"x-access-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQ5Yzg4ZDExNzg1NzkyZTFmYWRhYmYzIiwiaWF0IjoxNTcwOTg4MzE0fQ.jkMjNpYx6lQzP1w8nViMDT7QPcvQIEjtRlcXs9Ti5nY'}})
            .then(response => {
                dispatch(setStationaryPoints(response.data));
            })
            .catch(err => {
                    dispatch(fetchStationaryPointsFailed(err));
                }
            )
    }
};

const setStationaryPoints = (stationaryPoints) => {
    return {
        type: actionTypes.SET_STATIONARY_POINTS,
        stationaryPoints: stationaryPoints
    };
};

const fetchStationaryPointsFailed = (err) => {
    return {
        type: actionTypes.FETCH_STATIONARY_POINTS_FAILED,
        err: err
    };
};

export const stationaryPointSelected = (_id) => {
    // console.log(_id);
    return {
        type: actionTypes.STATIONARY_POINT_SELECTED,
        _id:_id
    }
}



