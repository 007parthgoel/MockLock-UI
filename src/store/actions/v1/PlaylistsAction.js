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

// action to fetch playlists for mobile users::
export const initPlaylists = (token) => {
    return dispatch => {
        axios.get(endpoints.fetchAllPlaylists,
            // {headers: {"x-access-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWQ5Yzg4ZDExNzg1NzkyZTFmYWRhYmYzIiwiaWF0IjoxNTcwOTg4MzE0fQ.jkMjNpYx6lQzP1w8nViMDT7QPcvQIEjtRlcXs9Ti5nY'}})
            {headers: {"x-access-token": token}})
            .then(response => {
                console.log(response.data);
                dispatch(setPlaylists(response.data));
            })
            .catch(err => {
                    dispatch(fetchPlaylistsFailed(err));
                }
            )
    }
};

// action to fetch playlists by ID for ADMIN USER::
export const initPlaylistsbyID_FOR_ADMIN = (id) => {
    set_cookies("initPlaylistsbyID_FOR_ADMIN", localConfig.userID_selected, id, {});
    return dispatch => {
        axios.get(endpoints.fetchAllPlaylistsbyID_FOR_ADMIN + id)
            .then(response => {
                console.log(response.data);
                dispatch(setPlaylists(response.data));
            })
            .catch(err => {
                dispatch(fetchPlaylistsFailed(err));
            });
    };
};

const setPlaylists = (playlists) => {
    return {
        type: actionTypes.SET_PLAYLISTS,
        playlists: playlists
    };
};

const fetchPlaylistsFailed = (err) => {
    return {
        type: actionTypes.FETCH_PLAYLISTS_FAILED,
        err: err
    };
};

export const playlistSelected = (_id) => {
    // console.log(_id);
    return {
        type: actionTypes.PLAYLIST_SELECTED,
        _id: _id
    }
};



