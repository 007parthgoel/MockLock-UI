import * as actionTypes from '../../actions/v1/ActionTypes';
// import {stationaryPointSelected} from "../../actions/v1";

const initialState={
    stationaryPoints: [],
    stationaryPointSelected:{},
    error: false,
};

const setStationaryPoints=(state,action)=>{
    return {
        ...state,
        stationaryPoints: action.stationaryPoints.response
    };
};

const fetchStationaryPointsFailed=(state,action)=>{
    return {
        ...state,
        error: true
    };
};

const stationaryPointSelectByID=(state,action)=>{
    // console.log(action._id);
    const stationaryPoint=state.stationaryPoints.find(stationaryPoint=>{
        return stationaryPoint._id===action._id;
    });
    return {
       ...state,
       stationaryPointSelected :stationaryPoint
    }
};

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_STATIONARY_POINTS:return setStationaryPoints(state,action);
        case actionTypes.FETCH_STATIONARY_POINTS_FAILED:return fetchStationaryPointsFailed(state,action);
        case actionTypes.STATIONARY_POINT_SELECTED:return stationaryPointSelectByID(state,action);
        default:return state;
    }
};

export default reducer;