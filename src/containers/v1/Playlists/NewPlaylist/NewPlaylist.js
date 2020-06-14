import React, {Component} from 'react';
import {connect} from "react-redux";

import classes from './NewPlaylist.css';
import Maps from '../../../../components/v1/UI/GoogleMaps/GoogleMaps';
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";
import {load_cookies, localConfig} from "../../../../utils/SessionManager";
import * as actions from "../../../../store/actions/v1/Index";
// import StationaryPoinGrid from "../../../../components/v1/StationaryPoint/StationaryPointGrid";
import HistoryPicker from "../../../../components/v1/NewPlaylist/HistoryPicker/HistoryPicker";
import NewPlaylistGrid from '../../../../components/v1/NewPlaylist/NewPlaylistGrid/NewPlaylistGrid';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faBars, faEdit} from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../../components/v1/UI/Modal/Modal';


class NewPlaylist extends Component {

    state = {
        playlistPicker: "history",
        show_historyPickerModal:false,
        historyPickerCheckBoxID:null,
        historyPickerPointAdded: {},
        historyPickerPointRemoved: null,
        MapCoordinates_Details:[],
    };

    componentDidMount() {
        if (load_cookies("StationaryPointer", localConfig.user_type, false) === 'mobile') {
            this.props.fetchStnryPointsFor_MOBILE_USER(load_cookies("StationaryPointer", localConfig.user_token, false));
            this.props.fetchOnePlaylistFor_MOBILE_USER(load_cookies("NewPlaylist", localConfig.playlistID_selected, false));
        }

        if (load_cookies("StationaryPointer", localConfig.user_type, false) === "admin") {
            this.props.fetchStnryPointsFor_ADMIN_USER(load_cookies("StationaryPointer", localConfig.userID_selected, false));
            this.props.fetchOnePlaylistFor_ADMIN_USER(load_cookies("NewPlaylist", localConfig.playlistID_selected, false));
        }
    };

    render() {
        library.add(faSortUp, faSortDown, faBars, faEdit);

        const historyPickerModalHandler = () => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    show_historyPickerModal: !prevState.show_historyPickerModal,
                };
            })
        };

        const PlaylistPickerHandler = (name) => {
            this.setState({playlistPicker: name});
        };

        const HistoryPickerCheckboxAddHandler = (_id) => {
            this.setState({historyPickerCheckBoxID:_id});
            historyPickerModalHandler();
        };

        const historyPickerPointHandler=(info)=>{
            let _id=this.state.historyPickerCheckBoxID;
            let point = this.props.StationaryPoints.filter(point => point._id === _id);
            let updatedPoint={
                ...point[0],
                Accuracy:info.Accuracy,
                Time:info.Time
            };
            this.setState({
                historyPickerPointAdded: updatedPoint,
                show_historyPickerModal:false,
                historyPickerCheckBoxID:null
            });
            setTimeout(() => {
                this.setState({historyPickerPointAdded: {}});
            }, 100);
        };

        const HistoryPickerCheckboxRemoveHandler = (_id) => {
            console.log(_id);
            this.setState({historyPickerPointRemoved: _id});
            setTimeout(() => {
                this.setState({historyPickerPointRemoved: null});
            }, 100);
        };

        const MapDisplayPointHandler=(point)=>{
            let mapDisplayArray=[];
            mapDisplayArray.push(point);
            this.setState({MapCoordinates_Details:[...mapDisplayArray]});
        };

        let EmptyData_statement = (this.props.StationaryPoints.length === 0) ?
            <p>There are no StationaryPoints</p> : null;

        const HistoryPickerGrid = this.props.StationaryPoints.map(stationaryPoint => (
            <li key={stationaryPoint._id}>
                <HistoryPicker
                    stationaryPoint={stationaryPoint}
                    checkBoxAdd={(_id) => {HistoryPickerCheckboxAddHandler(_id)}}
                    checkBoxRemove={(_id) => {HistoryPickerCheckboxRemoveHandler(_id)}}
                    checkBoxUncheckStatus={this.state.historyPickerCheckBoxID && this.state.show_historyPickerModal===false}
                    checkBoxStatusID={this.state.historyPickerCheckBoxID}
                    historyPointMapDisplay={(historyPoint)=>MapDisplayPointHandler(historyPoint)}
                />
            </li>
        ));

        const picker = (this.state.playlistPicker === "history") ? (
            <div>
                <div className={classes.StationaryPointGrid}>
                    {EmptyData_statement}
                    <ul className={classes.StationaryPointList}>
                        {HistoryPickerGrid}
                    </ul>
                    <Modal display={"HistoryPickerModal"} show={this.state.show_historyPickerModal} ModalClosed={historyPickerModalHandler}
                           historyPickerPoint_SubmitInfo={(info)=>{historyPickerPointHandler(info)}}
                           />
                </div>
            </div>
        ) : (
            <div>manual picker</div>
        );

        return (
            <div className={classes.newPlaylistsPage}>
                <div className={classes.newPlaylistContainer}>

                    {this.props.playlist_Selected ? <NewPlaylistGrid playlist={this.props.playlist_Selected}
                                                                     historyPickerAdded={this.state.historyPickerPointAdded}
                                                                     historyPickerRemoved={this.state.historyPickerPointRemoved}
                                                                     newPlaylistPointMapDisplay={(point)=>{MapDisplayPointHandler(point)}}
                                                                     newPlaylistMapDisplay={(playlist)=>this.setState({MapCoordinates_Details:[...playlist]})}/>
                                                                     : <p>hello</p>}
                </div>
                <div className={classes.ListpickerContainer}>
                    <div>
                        <h3 className={this.state.playlistPicker === "history" ? classes.ListpickerHeading_active : classes.ListpickerHeading}
                            onClick={() => PlaylistPickerHandler("history")}>
                            History Picker</h3>
                        <h3 className={this.state.playlistPicker === "manual" ? classes.ListpickerHeading_active : classes.ListpickerHeading}
                            onClick={() => PlaylistPickerHandler("manual")}>
                            Manual Picker</h3>
                    </div>
                    <div className={classes.googleMaps}>
                        <Maps Mapcoordinates_Details={this.state.MapCoordinates_Details}/>
                    </div>
                    <div className={classes.Listpicker}>
                        {picker}
                    </div>
                    {/*<Maps/>*/}
                    {/*<Maps Mapcoordinates_Details={{}}/>*/}
                </div>
            </div>
        );
    }
}

const
    mapStateToProps = state => {
        return {
            StationaryPoints: state.stationaryPointer.stationaryPoints,
            // error: state.stationaryPointer.error,
            // stationaryPointSelected: state.stationaryPointer.stationaryPointSelected,
            playlist_Selected: state.playlists.playlistSelected,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            fetchStnryPointsFor_MOBILE_USER: (token) => dispatch(actions.initStationaryPoints(token)),
            fetchOnePlaylistFor_ADMIN_USER: (id) => dispatch(actions.fetchOnePlaylist_FOR_ADMIN(id)),
            fetchOnePlaylistFor_MOBILE_USER: (id, token) => dispatch(actions.fetchOnePlaylist(id, token)),
            // onStationaryPointSelected: (_id) => dispatch(actions.stationaryPointSelected(_id)),
            // onPlaylistSelected: (_id) => dispatch(actions.playlistSelected(_id)),
            fetchStnryPointsFor_ADMIN_USER: (_id) => dispatch(actions.initStationaryPointsbyID_FOR_ADMIN(_id)),
            // fetchPlaylistsFor_ADMIN_USER: (_id) => dispatch(actions.initPlaylistsbyID_FOR_ADMIN(_id)),
        };
    };


export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylist);
