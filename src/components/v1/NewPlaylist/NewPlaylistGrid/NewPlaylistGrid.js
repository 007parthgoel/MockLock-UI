import React, {useEffect, useState} from 'react';
import classes from './NewPlaylistGrid.css'
import {connect} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faBars, faCircle as faCircleSolid} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt, faEdit, faCircle as faCircleRegular} from '@fortawesome/free-regular-svg-icons'
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";
import {load_cookies, localConfig} from "../../../../utils/SessionManager";
import * as actions from '../../../../store/actions/v1/Index';
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Modal from '../../UI/Modal/Modal';

// const PlaylistGrid = (props) => {
const PlaylistGrid = (props) => {
    library.add(faSortUp, faSortDown, faBars, faTrashAlt, faEdit, faCircleSolid, faCircleRegular);

    const [state, setState] = useState({
        state_playlist: {...props.playlist},
    });

    const[alertModal,setAlertModal]=useState({
        show_playlistDeleteAlertModal:false,
        playlistPointIndexValue:null,
        playlistPointID:null,
    });

    const [snackbar, setSnackbar] = useState({
        snackbarOpen: false,
        snackbarMsg: '',
    });

    useEffect(() => {
        // console.log(props.playlist);
        setState({state_playlist: props.playlist})
    }, [props.playlist]);

    useEffect(() => {
        if (Object.keys(props.historyPickerAdded).length > 0) {
            let playlistArray = [...state.state_playlist.playlist_points];
            playlistArray.push(props.historyPickerAdded);
            setState({
                state_playlist: {
                    ...state.state_playlist,
                    playlist_points: [...playlistArray]
                }
            });
        }
    }, [props.historyPickerAdded]);

    useEffect(() => {
        if (props.historyPickerRemoved) {
            // console.log(props.historyPickerRemoved);
            let playlistArray = [...state.state_playlist.playlist_points];
            playlistArray = playlistArray.filter(point => point._id !== props.historyPickerRemoved);
            // console.log(playlistArray);
            setState({
                state_playlist: {
                    ...state.state_playlist,
                    playlist_points: [...playlistArray]
                }
            });
        }
    }, [props.historyPickerRemoved]);

    useEffect(() => {
        if (Object.keys(props.manualPickerAdded).length > 0) {
            // console.log(props.manualPickerAdded);
            let playlistArray = [...state.state_playlist.playlist_points];
            playlistArray.push(props.manualPickerAdded);
            setState({
                state_playlist: {
                    ...state.state_playlist,
                    playlist_points: [...playlistArray]
                }
            });
        }
    }, [props.manualPickerAdded]);

    let TotalTime=0;
    let TotalPointsCount=0;
    (()=>{
        // console.log("method called");
        let tempArraylist = [...state.state_playlist.playlist_points];
        TotalPointsCount = tempArraylist.length;
        tempArraylist.forEach((point, index, arr) => {
            TotalTime= TotalTime+point.Time;
        });
    })();

    const snackbarClose = () => {
        setSnackbar({snackbarOpen: false});
    };

    const modalCloseHandler= () => {
        setAlertModal(prevState => {
            return {
                ...prevState,
                show_playlistDeleteAlertModal: !prevState.show_playlistDeleteAlertModal,
            };
        })
    };

    const timeString_Handler = (time) => {
        let Total_time = time / 1000;
        let hours_playback=`00:00:00 sec`;
        if(Total_time>=3600){
            hours_playback=`${Math.floor(Total_time/3600)}:${Math.floor((Total_time%3600)/60)}:${Total_time%60} hrs`;
        }
        if(60<=Total_time && Total_time<3600){
            hours_playback=` 00:${Math.floor((Total_time%3600)/60)}:${Total_time%60} min`;
        }
        if(0<Total_time && Total_time<60){
            hours_playback=` 00:00:${Total_time%60} sec`;
        }
        return hours_playback;
    };

    const shiftUP_handler = (index) => {
        console.log("shiftUP handler");
        let temp = {...state.state_playlist};
        let templist = [...temp.playlist_points];
        let OBJ_index = templist[index];
        let OBJ_indexlower = templist[index - 1];
        templist[index] = OBJ_indexlower;
        templist[index - 1] = OBJ_index;
        temp = {...temp, playlist_points: templist};
        setState({state_playlist: temp});
    };

    const shiftDOWN_handler = (index) => {
        console.log("shiftdown handler");
        let temp = {...state.state_playlist};
        let templist = [...temp.playlist_points];
        let OBJ_index = templist[index];
        let OBJ_indexhigher = templist[index + 1];
        templist[index] = OBJ_indexhigher;
        templist[index + 1] = OBJ_index;
        temp = {...temp, playlist_points: templist};
        setState({state_playlist: temp});
    };

    const PlaylistDetailsHandler = (event) => {
        this.setState({
            PlaylistDetails: {
                ...this.state.PlaylistDetails,
                [event.target.name]: event.target.value,
            }
        });
    };

    const history = useHistory();
    const PlaylistSubmitHandler = () => {
        let playlist = state.state_playlist;
        if (load_cookies("NewPlaylistGrid", localConfig.user_type, false) === 'mobile') {
            props.updatePlaylist(playlist, playlist._id, load_cookies("StationaryPointer", localConfig.user_token, false));
        }

        if (load_cookies("NewPlaylistGrid", localConfig.user_type, false) === "admin") {
            props.updatePlaylist_FOR_ADMIN(playlist, playlist._id);
        }
        setSnackbar({snackbarOpen: true, snackbarMsg: 'Playlist Saved Successfully'});
        setTimeout(() => {
            history.push("/playlists");
        }, 3000);
    };

    const newPlaylistPointMapDisplay_handler = (index) => {
        var mapDisplaypoint = state.state_playlist.playlist_points[index];
        // console.log(mapDisplaypoint);
        props.newPlaylistPointMapDisplay(mapDisplaypoint);
    };

    const newPlaylistMapDisplay_handler = () => {
        var playlist = state.state_playlist.playlist_points;
        props.newPlaylistMapDisplay(playlist);
    };

    const listDeleteHandler = () => {
        let listPointIndexValue=alertModal.playlistPointIndexValue;
        let listPointID=alertModal.playlistPointID;
        let list = [...state.state_playlist.playlist_points];
        let filteredArray = list.filter((value, index, arr) => {
            return index !== listPointIndexValue;
        });
        console.log(listPointIndexValue);
        setState({
            state_playlist: {
                ...props.playlist,
                playlist_points: filteredArray
            },
        });
        modalCloseHandler();
        props.historyPointDeleteCheckboxStatus(listPointID);
    };

    const listDeleteAlertModalHandler=(index,id)=>{
        setAlertModal(prevState => {
            return {
                ...prevState,
                show_playlistDeleteAlertModal: !prevState.show_playlistDeleteAlertModal,
                playlistPointIndexValue:index,
                playlistPointID:id,
            };
        })
    };

    let list;
    let playlistInfo;

    // if (Object.keys(props.playlist_Selected).length > 0) {
    if (Object.keys(state.state_playlist).length > 0) {

        playlistInfo = (
            <div className={classes.newPlaylistInfo}>
                <h3>Name:</h3>
                <input type='text' name="name"
                       value={state.state_playlist.name}
                       placeholder={"Enter Playlist Name"}
                       autoComplete="off"
                       onChange={PlaylistDetailsHandler}/>
                <div name="Description">
                    <h3>Description:</h3>
                    <textarea name="description"
                              placeholder={"Enter Playlist Description"}
                              value={state.state_playlist.description}
                              onChange={PlaylistDetailsHandler}/>
                </div>
                <div name="colorLabel">
                    <h3>Color Label:</h3>
                    <select name="color" value={state.state_playlist.label_color}
                            onChange={PlaylistDetailsHandler}>
                        <option value="yellow">yellow</option>
                        <option value="red">red</option>
                        <option value="mustard">mustard</option>
                        <option value="lightgreen">lightgreen</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                        <option value="lightblue">lightblue</option>
                        <option value="orange">orange</option>
                    </select>
                    <h3 className={classes.time}>{timeString_Handler(TotalTime)}</h3>
                    <h3 className={classes.points}>{`${TotalPointsCount} points`}</h3>
                </div>
            </div>
        );

        const LightTooltip = withStyles((theme) => ({
            arrow: {
                color: theme.palette.common.white,
            },
            tooltip: {
                backgroundColor: theme.palette.common.white,
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: theme.shadows[1],
                fontSize: 13,
            },
        }))(Tooltip);

        // let points_count = `${points.points_count} points`;
        list = state.state_playlist.playlist_points.map((point, index) => (
            <div key={index} className={classes.list}>
                <div className={classes.list_arrowButton}>
                    {/*{(index === 0) ? ((TotalPointsCount=== 1) ?*/}
                    {(index === 0) ? (
                        (state.state_playlist.playlist_points.length === 1) ?
                        <FontAwesomeIcon icon="sort-down" size='3x' className={classes.fontIconIndex0}/> :
                        <FontAwesomeIcon icon="sort-down" size='3x' className={classes.fontIconIndex0} onClick={() => {shiftDOWN_handler(index)}}/>
                        )
                        : (index === (TotalPointsCount- 1)) ?
                        // : (index === (state.state_playlist.points_count - 1)) ?
                            <FontAwesomeIcon icon="sort-up" size='3x' className={classes.fontIconIndexLast}
                                             onClick={() => {shiftUP_handler(index)}}/>
                            :
                            <div>
                                < FontAwesomeIcon icon="sort-up" size='3x'  onClick={() => {shiftUP_handler(index)}}
                                                  className={classes.fontIconUPMidIndex}/>
                                <FontAwesomeIcon icon="sort-down" size='3x' onClick={() => {shiftDOWN_handler(index)}}
                                                 className={classes.fontIconDownMidIndex}/>
                            </div>
                    }
                </div>
                <div className={classes.list_description} onClick={() => {
                    newPlaylistPointMapDisplay_handler(index)
                }}>
                    <div>
                        <div className={classes.list_description_name}>{point.PointName || point.name}</div>
                        <div className={classes.list_description_time}>{timeString_Handler(point.Time)}</div>
                    </div>
                    <div>
                        <div
                            className={classes.list_description_desc}>{point.PointDescription || point.description}</div>
                    </div>
                    <div
                        className={classes.list_description_latLng}>{`${point.Latitude || point.latitude},${point.Longitude || point.longitude}`}</div>
                    <div className={classes.list_MenuOptions}>
                        <LightTooltip title="Edit" placement="top" arrow>
                            <div type="edit">
                                <FontAwesomeIcon icon={['far', 'edit']} size="2x" transform="shrink-4"/>
                            </div>
                        </LightTooltip>
                        <LightTooltip title="Delete" placement="top" arrow>
                            {/*<div type="delete" onClick={() => {listDeleteHandler(index, point._id)}}>*/}
                            <div type="delete" onClick={()=>listDeleteAlertModalHandler(index,point._id)}>
                                <FontAwesomeIcon icon={['far', 'trash-alt']} size="2x" transform="shrink-4"/>
                            </div>
                        </LightTooltip>
                    </div>
                </div>
            </div>

        ));
    }


    return (
        <div className={classes.PlayListGRID}>
            <Snackbar open={snackbar.snackbarOpen} anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                      autoHideDuration={5000} onClose={snackbarClose}
                      message={<span id="message-id">{snackbar.snackbarMsg}</span>}
                      action={[<IconButton key="close" aria-label="Close" color="inherit"
                                           onClick={snackbarClose}>x</IconButton>]}/>
            {playlistInfo}
            <Modal display={"NewPlaylistDeleteAlertModal"}
                   show={alertModal.show_playlistDeleteAlertModal}
                   deleteList={listDeleteHandler}
                   ModalClosed={modalCloseHandler}
            />
            <div className={classes.ListView}>
                {/*{console.log(state.state_playlist.playlist_points)}*/}
                {list}
            </div>
            {/*<div className={classes.savePlaylist}>*/}
            <button className={classes.viewOnMap} onClick={newPlaylistMapDisplay_handler}>View on Map</button>
            {/*<Link to="/playlists">*/}
            <button className={classes.savePlaylist} onClick={PlaylistSubmitHandler}>Save Playlist</button>
            {/*</Link>*/}
            {/*</div>*/}
        </div>
    );
};

const
    mapStateToProps = state => {
        return {
            // playlists: state.playlists.playlists,
            // error: state.playlists.error,
            // playlist_Selected: state.playlists.playlistSelected,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            updatePlaylist_FOR_ADMIN: (playlist, id) => dispatch(actions.updatePlaylist_FOR_ADMIN(playlist, id)),
            updatePlaylist: (playlist, id, token) => dispatch(actions.updatePlaylist(playlist, id, token))
            // fetchPlaylistsFor_MOBILE_USER: (token) => dispatch(actions.initPlaylists(token)),
            // onPlaylistSelected: (_id) => dispatch(actions.playlistSelected(_id)),
            // fetchPlaylistsFor_ADMIN_USER: (_id) => dispatch(actions.initPlaylistsbyID_FOR_ADMIN(_id)),
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistGrid);

