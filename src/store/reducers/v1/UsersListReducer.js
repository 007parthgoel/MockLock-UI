import * as actionTypes from '../../actions/v1/ActionTypes';

const initialState={
    Users_list:[],
    error:null,
};

const setUsersList=(state,action)=>{
    return{
        ...state,
        Users_list: action.list.response,
    }
};

const fetchUsersListFailed=(state,action)=>{
    return {
        ...state,
        error:action.error,
    }
};

export const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.SET_USERS_LIST: return setUsersList(state,action);
        case actionTypes.FETCH_USERS_LIST_FAILED:return fetchUsersListFailed(state,action);
        default:return state;
    };
};

export default reducer;