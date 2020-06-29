import axios from 'axios';

import * as actionTypes from './ActionTypes';
import * as endpoints from '../../../utils/endpoints';
import {
    localConfig,
    set_cookies,
    // load_cookies,
    // remove_cookies,
    // loadAll_cookies
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
                // console.log(response.data);
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

// action to fetch playlists for mobile users::
export const createPlaylist = (token, playlist) => {
    return dispatch => {
        axios.post(endpoints.createPlaylist,
            {headers: {"x-access-token": token}}, playlist)
            .then(response => {
                console.log(response.data);
                set_cookies("playlistAction_createPlaylist", localConfig.playlistID_selected, response.data.response._id, {});
                dispatch(createPlaylist_success(response.data));
            })
            .catch(err => {
                    dispatch(createPlaylist_failed(err));
                }
            )
    }
};

// action to fetch playlists by ID for ADMIN USER::
export const createPlaylist_FOR_ADMIN = (user_id, playlist) => {
    // console.log(user_id,playlist);
    // set_cookies("initPlaylistsbyID_FOR_ADMIN", localConfig.userID_selected, id, {});
    return dispatch => {
        axios.post(endpoints.createPlaylist_FOR_ADMIN + user_id, playlist)
            .then(response => {
                console.log(response.data);
                set_cookies("playlistAction_createPlaylist_FOR_ADMIN", localConfig.playlistID_selected, response.data.response._id, {});
                dispatch(createPlaylist_success(response.data));
            })
            .catch(err => {
                dispatch(createPlaylist_failed(err));
            });
    };
};

export const createPlaylist_success = (playlist) => {
    return {
        type: actionTypes.CREATE_PLAYLIST_SUCCESS,
        playlist: playlist
    };
};

export const createPlaylist_failed = (err) => {
    return {
        type: actionTypes.CREATE_PLAYLIST_FAILED,
        err: err
    };
};

export const updatePlaylist = (playlist,id,token) => {
    return dispatch => {
        console.log("success2");
        axios.post(endpoints.updatePlaylist + id,
            {headers: {"x-access-token": token}},playlist)
            .then(response => {
                console.log(response.data);
                set_cookies("playlistAction_updatePlaylist", localConfig.playlistID_selected, id, {});
                // set_cookies("playlistAction_updatePlaylist", localConfig.playlistID_selected, response.data.response._id, {});
                dispatch(updatePlaylist_success(response.data));
            })
            .catch(err => {
                    dispatch(updatePlaylist_failed(err));
                }
            )
    }
};

// action to fetch playlists by ID for ADMIN USER::
export const updatePlaylist_FOR_ADMIN = (playlist,id) => {
    // set_cookies("initPlaylistsbyID_FOR_ADMIN", localConfig.userID_selected, id, {});
    return dispatch => {
        // console.log(playlist,id);
        axios.post(endpoints.updatePlaylist_FOR_ADMIN + id,playlist)
            .then(response => {
                console.log(response.data);
                set_cookies("playlistAction_updatePlaylist", localConfig.playlistID_selected, id, {});
                // set_cookies("playlistAction_updatePlaylist", localConfig.playlistID_selected, response.data.response._id, {});
                dispatch(updatePlaylist_success(response.data));
            })
            .catch(err => {
                dispatch(updatePlaylist_failed(err));
            });
    };
};

export const updatePlaylist_success = (playlist) => {
    return {
        type: actionTypes.UPDATE_PLAYLIST_SUCCESS,
        playlist: playlist
    };
};

export const updatePlaylist_failed = (err) => {
    return {
        type: actionTypes.UPDATE_PLAYLIST_FAILED,
        err: err
    };
};

export const fetchOnePlaylist_FOR_ADMIN = (id) => {
    return dispatch => {
        axios.get(endpoints.fetchOnePlaylistsbyID_FOR_ADMIN + id)
            .then(response => {
                dispatch(fetchOnePlaylist_success(response.data));
            })
            .catch(err => {
                dispatch(fetchOnePlaylist_failed(err));
            })
    }
};

export const fetchOnePlaylist = (id, token) => {
    return dispatch => {
        axios.get(endpoints.fetchOnePlaylistsbyID_FOR_ADMIN + id,
            {headers: {"x-access-token": token}})
            .then(response => {
                dispatch(fetchOnePlaylist_success(response.data));
            })
            .catch(err => {
                dispatch(fetchOnePlaylist_failed(err));
            })
    }
};

const fetchOnePlaylist_success = (playlist) => {
    return {
        type: actionTypes.FETCH_ONE_PLAYLIST_SUCCESS,
        playlist: playlist
    }
};

const fetchOnePlaylist_failed = (err) => {
    return {
        type:actionTypes.FETCH_STATIONARY_POINTS_FAILED,
        err:err
    }
};

export const deletePlaylist_FOR_ADMIN=(id)=>{
    return dispatch=>{
        axios.get(endpoints.deletePlaylist_FOR_ADMIN+id)
            .then(response=>{
                console.log(response.data);
            })
            .catch(err=>{
                console.log(err);
            });
    }
};

export const deletePlaylist=(id,token)=>{
    return dispatch=>{
        axios.get(endpoints.deletePlaylist_FOR_ADMIN+id,
            {headers: {"x-access-token": token}})
            .then(response=>{
                console.log(response.data);
            })
            .catch(err=>{
                console.log(err);
            });
    }
};
