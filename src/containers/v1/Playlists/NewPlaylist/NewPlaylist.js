import React, {Component} from 'react';
import {connect} from "react-redux";

import classes from './NewPlaylist.css';
import Maps from '../../../../components/v1/UI/GoogleMaps/GoogleMaps';
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";
import {load_cookies, localConfig} from "../../../../utils/SessionManager";
import * as actions from "../../../../store/actions/v1/Index";
// import StationaryPoinGrid from "../../../../components/v1/StationaryPoint/StationaryPointGrid";
import HistoryPicker from "../../../../components/v1/NewPlaylist/HistoryPicker/HistoryPicker";
import ManualPicker from '../../../../components/v1/NewPlaylist/ManualPicker/ManualPicker';
import NewPlaylistGrid from '../../../../components/v1/NewPlaylist/NewPlaylistGrid/NewPlaylistGrid';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faBars, faEdit} from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../../components/v1/UI/Modal/Modal';
import Spinner from '../../../../components/v1/UI/Spinner/Spinner';


class NewPlaylist extends Component {

    state = {
        playlistPicker: "history",
        show_historyPickerModal:false,
        show_manualPickerModal:false,
        historyPickerCheckBoxID:null,
        historyPickerPointSubmit: {},
        historyPickerPointRemoved: null,
        manualPickerPointAdded:{},
        manualPickerPointSubmit:{},
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

        const manualPickerModalHandler=()=>{
            this.setState(prevState => {
                return {
                    ...prevState,
                    show_manualPickerModal: !prevState.show_manualPickerModal,
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
                historyPickerPointSubmit: updatedPoint,
                show_historyPickerModal:false,
                historyPickerCheckBoxID:null
            });
            setTimeout(() => {
                this.setState({historyPickerPointSubmit: {}});
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

        let HistoryPickerGrid=(this.props.error)?<p>Can't load History points</p>:<Spinner/>;
        if(this.props.StationaryPoints && this.props.playlist_Selected) {

            HistoryPickerGrid = this.props.StationaryPoints.map(stationaryPoint => (
                <li key={stationaryPoint._id}>
                    <HistoryPicker
                        stationaryPoint={stationaryPoint}
                        checkBoxAdd={(_id) => {HistoryPickerCheckboxAddHandler(_id)}}
                        checkBoxRemove={(_id) => {HistoryPickerCheckboxRemoveHandler(_id)}}
                        checkBoxUncheckStatus={this.state.historyPickerCheckBoxID && this.state.show_historyPickerModal === false}
                        checkBoxStatusID={this.state.historyPickerCheckBoxID}
                        historyPointMapDisplay={(historyPoint) => MapDisplayPointHandler(historyPoint)}
                        playlist={this.props.playlist_Selected}
                    />
                </li>
            ));
             if(this.props.StationaryPoints.length === 0){
                 HistoryPickerGrid=<p>There are no StationaryPoints</p>
             }
        }

        const picker = (this.state.playlistPicker === "history") ? (
            <div>
                <div className={classes.StationaryPointGrid}>
                    {/*{EmptyData_statement}*/}
                    <ul className={classes.StationaryPointList}>
                        {HistoryPickerGrid}
                    </ul>
                    <Modal display={"HistoryPickerModal"}
                           show={this.state.show_historyPickerModal}
                           ModalClosed={historyPickerModalHandler}
                           historyPickerPoint_SubmitInfo={(info)=>{historyPickerPointHandler(info)}}
                           />
                </div>
            </div>
        ) : (
            <div className={classes.ManualPickerGrid}>
                <ManualPicker plotLatLog={(LatLogCoords)=>{MapDisplayPointHandler(LatLogCoords)}}
                              AddLatLog={(point)=>{manualPickerPointAddHandler(point)}}
                              // resetLatLog={(Object.keys(this.state.manualPickerPointAdded).length>0) && this.state.show_manualPickerModal===false}
                              resetLatLog={this.state.show_manualPickerModal}
                />
                <Modal display={"ManualPickerModal"}
                       show={this.state.show_manualPickerModal}
                       ModalClosed={manualPickerModalHandler}
                       manualPickerPoint_SubmitInfo={(info)=>{manualPickerModalSubmitHandler(info)}}/>
            </div>
        );



        const manualPickerPointAddHandler=(point)=>{
            this.setState({manualPickerPointAdded:{...point}});
            manualPickerModalHandler();
            // setTimeout(()=>{
            //     manualPickerModalSubmitHandler();
            // },1000);
        };

        const manualPickerModalSubmitHandler=(info)=>{
            let manualPickerPoint={
                ...this.state.manualPickerPointAdded,
                name:info.PointName,
                description:info.PointDescription,
                Time:info.Time,
                Accuracy:info.Accuracy,
            };
            this.setState({
                manualPickerPointSubmit:manualPickerPoint,
                show_manualPickerModal:false,
                // manualPickerPointAdded:{},
            });
            setTimeout(()=>{
                this.setState({
                    manualPickerPointSubmit:{}
                })
            },300);
        };

        let NewPlaylistData=(this.props.PlaylistError)? <p>New playlist can't be loaded</p>:<Spinner/>;
        if(Object.keys(this.props.playlist_Selected).length>0){
            NewPlaylistData= <NewPlaylistGrid playlist={this.props.playlist_Selected}
                                              historyPickerAdded={this.state.historyPickerPointSubmit}
                                              historyPickerRemoved={this.state.historyPickerPointRemoved}
                                              manualPickerAdded={this.state.manualPickerPointSubmit}
                                              newPlaylistPointMapDisplay={(point)=>{MapDisplayPointHandler(point)}}
                                              newPlaylistMapDisplay={(playlist)=>this.setState({MapCoordinates_Details:[...playlist]})}
                                              historyPointDeleteCheckboxStatus={(id)=>this.setState({historyPickerCheckBoxID:id})}
            />
        }

        return (
            <div className={classes.newPlaylistsPage}>
                {/*{console.log(this.state.manualPickerPointAdded)}*/}
                <div className={classes.newPlaylistContainer}>
                    {NewPlaylistData}
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
                </div>
            </div>
        );
    }
}

const
    mapStateToProps = state => {
        return {
            StationaryPoints: state.stationaryPointer.stationaryPoints,
            StationaryPointerError: state.stationaryPointer.error,
            PlaylistError: state.playlists.error,
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
