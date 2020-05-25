import * as actionTypes from '../../actions/v1/ActionTypes';

const initialState={
    playlists: [],
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

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_PLAYLISTS:return setPlaylists(state,action);
        case actionTypes.FETCH_PLAYLISTS_FAILED:return fetchPlaylistsFailed(state,action);
        case actionTypes.PLAYLIST_SELECTED:return playlistSelectByID(state,action);
        default:return state;
    }
};

export default reducer;