import * as actionTypes from '../../actions/v1/ActionTypes';

const initialState={
    playlists: null,
    playlistSelected:{},
    error: false,
};

const setPlaylists=(state,action)=>{
    return {
        ...state,
        playlists: action.playlists.response
    };
};

const fetchPlaylistsFailed=(state,action)=>{
    return {
        ...state,
        error: action.err
    };
};

const playlistSelectByID=(state,action)=>{
    // console.log(action._id);
    const playlist=state.playlists.find(playlist=>{
        return playlist._id===action._id;
    });
    return {
        ...state,
        playlistSelected :playlist
    }
};
const createPlaylistSuccess=(state,action)=>{
    return {
        ...state,
        playlistSelected:action.playlist.response
    };
};

const fetchOnePlaylist_success=(state,action)=>{
    return {
        ...state,
        playlistSelected:action.playlist.response
    }
};

const fetchOnePlaylist_failed=(state,action)=>{
    return {
        ...state,
        error:action.err
    }
};

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_PLAYLISTS:return setPlaylists(state,action);
        case actionTypes.FETCH_PLAYLISTS_FAILED:return fetchPlaylistsFailed(state,action);
        case actionTypes.PLAYLIST_SELECTED:return playlistSelectByID(state,action);
        case actionTypes.CREATE_PLAYLIST_SUCCESS:return createPlaylistSuccess(state,action);
        case actionTypes.FETCH_ONE_PLAYLIST_SUCCESS:return fetchOnePlaylist_success(state,action);
        case actionTypes.FETCH_ONE_PLAYLIST_FAILED:return fetchOnePlaylist_failed(state,action);
        default:return state;
    }
};

export default reducer;