import * as actionTypes from '../../actions/v1/ActionTypes';

const initialState = {
    queries: [],
    error: false,
    querySelected: {}
};

const setQueries = (state, action) => {
    // console.log(action.queries.response);
    return {
        ...state,
        queries: action.queries.response
    };
};

const fetchQueriesFailed = (state, action) => {
    // console.log(action.error);
    return {
        ...state,
        error: true
    };
};

const querySelected = (state, action) => {
    // console.log(action._id);
    const query = state.queries.find(query => {
        return query._id === action._id
    });
    // console.log(query);
    return {
        ...state,
        querySelected:query
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_QUERIES: return setQueries(state, action);
        case actionTypes.FETCH_QUERIES_FAILED: return fetchQueriesFailed(state, action);
        case actionTypes.QUERY_SELECTED: return querySelected(state, action);
        default: return state;
    }
};

export default reducer;
