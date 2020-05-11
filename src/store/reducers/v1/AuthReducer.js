import * as actionTypes from '../../actions/v1/ActionTypes';

const initialState={
    Admin_user:{},
    users_List:[],
    error:'',
    authRedirect:"/"
};

const adminLoginSuccess=(state,action)=>{
    return {
        ...state,
        Admin_user: action.details.response,
        authRedirect: "/home",
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
        Admin_user:{},
        authRedirect: "/"
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