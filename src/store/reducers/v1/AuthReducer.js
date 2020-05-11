import * as actionTypes from '../../actions/v1/ActionTypes';

const initialState={
    Admin_user:{},
    user_type:null,
    user_id:null,
    user_token:null,
    users_List:[],
    error:'',
    authRedirect:"/"
};

const adminLoginSuccess=(state,action)=>{
    return {
        ...state,
        // Admin_user: action.details.response,
        user_id: action.details.user_id,
        user_type:action.details.user_type,
        user_token: action.details.user_token,
        // authRedirect: "/home",
    }
};

const adminLoginFailed=(state,action)=>{
    return {
        ...state,
        error:action.error,
    }
};

const adminLogout=(state,action)=>{
    return {
        ...state,
        // Admin_user:{},
        // authRedirect: "/"
        user_id: null,
        user_type:null,
        user_token: null,
    }
};

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS: return adminLoginSuccess(state,action);
        case actionTypes.ADMIN_LOGIN_FAILED: return adminLoginFailed(state,action);
        case actionTypes.ADMIN_LOGOUT:return adminLogout(state,action);
        default:return state;
    }
};

export default reducer;