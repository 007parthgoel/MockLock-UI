import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './StationaryPointer.css';
import StationaryPoinGrid from '../../../components/v1/StationaryPoint/StationaryPointGrid';
import Maps from '../../../components/v1/UI/GoogleMaps/GoogleMaps';
// import Maps from '../../../components/v1/UI/MapBox/MapBox';
import * as actions from "../../../store/actions/v1/Index";
import {
    localConfig,
    // set_cookies,
    load_cookies,
    // remove_cookies,
    // loadAll_cookies
} from '../../../utils/SessionManager';
import {Link} from "react-router-dom";
import Spinner from '../../../components/v1/UI/Spinner/Spinner';
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "../../../components/v1/UI/Modal/Modal";

class StationaryPointer extends Component {

    state={
        show_StnryPointDeleteAlertModal: false,
        StnryPointDeleteID:null,
        snackbarOpen: false,
    };

    componentDidMount() {
        if (load_cookies("StationaryPointer", localConfig.user_type, false) === 'mobile') {
            this.props.fetchStnryPointsFor_MOBILE_USER(load_cookies("StationaryPointer", localConfig.user_token, false));
        }

        if (load_cookies("StationaryPointer", localConfig.user_type, false) === "admin") {
            this.props.fetchStnryPointsFor_ADMIN_USER(load_cookies("StationaryPointer", localConfig.userID_selected, false));
        }

    };

    render() {

        let StationaryPointGrid=(this.props.error)? <p>Points can't be loaded</p>:<Spinner/>;

        if(this.props.StationaryPoints){
            StationaryPointGrid = this.props.StationaryPoints.map(stationaryPoint => (
                <li key={stationaryPoint._id}>
                    <StationaryPoinGrid
                        stationaryPoint={stationaryPoint}
                        clicked={(_id) => {this.props.onStationaryPointSelected(_id);}}
                        deleteIconClicked={(id) => {stationaryPointDeleteModalHandler(id)}}/>
                </li>
            ));

            if(this.props.StationaryPoints.length===0){
                StationaryPointGrid= <p>There are no Points</p>;
            }
        }

        let stationaryPointSelected_array=[];
        if(Object.keys(this.props.stationaryPointSelected).length>0){
            stationaryPointSelected_array[0]=this.props.stationaryPointSelected;
        }

        const stationaryPointDeleteModalHandler = (id) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    show_StnryPointDeleteAlertModal: !prevState.show_StnryPointDeleteAlertModal,
                    StnryPointDeleteID:id,
                }
            });
        };

        const stationaryPointDeleteModalCloseHandler=()=>{
            this.setState(prevState => {
                return {
                    ...prevState,
                    show_StnryPointDeleteAlertModal: !prevState.show_StnryPointDeleteAlertModal,
                    StnryPointDeleteID:null,
                }
            });
        };

        const stationaryPointDeleteHandler=()=>{
            let id=this.state.StnryPointDeleteID;

            if (load_cookies("Playlists", localConfig.user_type, false) === 'mobile') {
                this.props.deleteStnryPointFor_MOBILE_USER(id,load_cookies("Playlists", localConfig.user_token, false));
                console.log("playlist deleted");
            }

            if (load_cookies("Playlists", localConfig.user_type, false) === "admin") {
                this.props.deleteStnryPointFor_ADMIN_USER(id);
                console.log("playlist deleted");
            }
            stationaryPointDeleteModalCloseHandler();
            this.setState({
                snackbarOpen: true,
                // snackbarMsg: 'Playlist Saved Successfully'
            });
            setTimeout(()=>{
                window.location.reload();
            },1000);
        };

        const snackbarClose = () => {
            this.setState({snackbarOpen: false});
        };


        return (
            <div className={classes.StationPointerPage}>
                <Snackbar open={this.state.snackbarOpen} anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                          autoHideDuration={5000} onClose={snackbarClose}
                    // message={<span id="message-id">{this.state.snackbarMsg}</span>}
                          message={<span id="message-id">StationaryPoint Deleted</span>}
                          action={[<IconButton key="close" aria-label="Close" color="inherit"
                                               onClick={snackbarClose}>x</IconButton>]}/>
                <div className={classes.Page_headings}>
                    <Link to="/stationary-pointer">
                        <h1 className={classes.Page_headings_active}>History</h1>
                    </Link>
                    <Link to="/playlists">
                        <h1>Playlists</h1>
                    </Link>
                </div>

                <div className={classes.Page_subheadings}>
                    <div className={classes.Page_subheading_left}>
                        <h2>Recent Executed Itenaries</h2>
                    </div>
                    <div className={classes.Page_subheading_right}>
                        <h3>settings</h3>
                        <h3>Help and guidlines</h3>
                    </div>
                </div>
                <div className={classes.Grid_MapContainer}>
                    <div className={classes.Grid}>
                        <div className={classes.GridList}>
                            {/*{EmptyData_statement}*/}
                            <ul className={classes.Lists}>
                                {StationaryPointGrid}
                            </ul>
                            <Modal display={"StationaryPointDeleteAlertModal"}
                                   show={this.state.show_StnryPointDeleteAlertModal}
                                   ModalClosed={stationaryPointDeleteModalCloseHandler}
                                   deleteStationaryPoint={stationaryPointDeleteHandler}/>
                        </div>
                        {/*<div className={classes.SubMenu}>*/}
                        {/*    <p>submenu</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className={classes.googleMaps}>
                        <Maps
                            // Mapcoordinates_Details={Object.values(this.props.stationaryPointSelected)}
                            Mapcoordinates_Details={stationaryPointSelected_array}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const
    mapStateToProps = state => {
        return {
            StationaryPoints: state.stationaryPointer.stationaryPoints,
            error: state.stationaryPointer.error,
            stationaryPointSelected: state.stationaryPointer.stationaryPointSelected,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            fetchStnryPointsFor_MOBILE_USER: (token) => dispatch(actions.initStationaryPoints(token)),
            onStationaryPointSelected: (_id) => dispatch(actions.stationaryPointSelected(_id)),
            fetchStnryPointsFor_ADMIN_USER: (_id) => dispatch(actions.initStationaryPointsbyID_FOR_ADMIN(_id)),
            deleteStnryPointFor_MOBILE_USER:(_id,token)=>dispatch(actions.deleteStationaryPoint(_id,token)),
            deleteStnryPointFor_ADMIN_USER:(_id)=>dispatch(actions.deleteStationaryPoint_FOR_ADMIN(_id)),
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(StationaryPointer);
