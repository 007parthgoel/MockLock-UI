import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";
import {Link} from "react-router-dom";
import * as actions from "../../../../store/actions/v1/Index";
import {load_cookies, localConfig} from "../../../../utils/SessionManager";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusSquare, faPlusSquare,faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {
    faMinusSquare as faMinusSquareRegular,
    faPlusSquare as faPlusSquareRegular,
    faTimesCircle as faTimesCircleRegular,
} from '@fortawesome/free-regular-svg-icons';

class Modal extends Component {

    state = {
        newPlaylistDetails: {
            name: '',
            description: '',
            label_color: '',
        },
        HistoryModalExecTime:5,
        HistoryModalAccuracy:10
    };

    render() {
        library.add(faMinusSquareRegular, faPlusSquareRegular,faTimesCircle,faTimesCircleRegular);

        const newPlaylistDetailsHandler = (event) => {
            this.setState({
                newPlaylistDetails: {
                    ...this.state.newPlaylistDetails,
                    [event.target.name]: event.target.value,
                }
            });
        };

        const ModalClosedHandler = () => {
            this.setState({
                newPlaylistDetails: {
                    ...this.state.newPlaylistDetails,
                    name: '',
                    description: '',
                    color: ''
                },
                HistoryModalExecTime:5,
                HistoryModalAccuracy:10.00
            });
            this.props.ModalClosed();
        };

        const createPlaylistHandler = () => {
            // console.log(this.state.newPlaylistDetails);
            if (load_cookies("Playlists", localConfig.user_type, false) === 'mobile') {
                this.props.createPlaylist_FOR_USER(load_cookies("Modal create Playlist", localConfig.user_token, false),
                    this.state.newPlaylistDetails);
            }

            if (load_cookies("Playlists", localConfig.user_type, false) === "admin") {
                this.props.createPlaylist_FOR_ADMIN(load_cookies("Modal create Playlist", localConfig.userID_selected, false),
                    this.state.newPlaylistDetails);
            }
        };

        var modalData;
        if (this.props.display === "newPlaylistModal") {
            modalData = (
                <div
                    className={classes.newPlaylistModal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <h3>Please enter following details:</h3>
                    <input type='text' name="name" value={this.state.newPlaylistDetails.name}
                           placeholder={"Enter Playlist Name"}
                           autoComplete="off"
                           onChange={newPlaylistDetailsHandler}/>
                    <textarea name="description"
                              placeholder={"Enter Playlist Description"}
                              value={this.state.newPlaylistDetails.description}
                              onChange={newPlaylistDetailsHandler}/>
                    <h3>Select Color Label:</h3>
                    <select name="label_color" value={this.state.newPlaylistDetails.color}
                            onChange={newPlaylistDetailsHandler}>
                        <option value="yellow">yellow</option>
                        <option value="red">red</option>
                        <option value="mustard">mustard</option>
                        <option value="lightgreen">lightgreen</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                        <option value="lightblue">lightblue</option>
                        <option value="orange">orange</option>
                    </select>
                    <div>
                        <h3 type="cancel" onClick={ModalClosedHandler}>CANCEL</h3>
                        <Link to="/newPlaylist">
                            <h3 type="continue" onClick={createPlaylistHandler}>CONTINUE</h3>
                        </Link>
                    </div>

                </div>
            );
        }

        let ExecTime=`${Math.floor(this.state.HistoryModalExecTime/60)} min : ${Math.floor(this.state.HistoryModalExecTime%60)} sec`;
        const HistoryModalExecTime_Handler=(type)=>{
            (type==="sub")? this.setState(prevState=>{
                return{
                    ...prevState,
                    HistoryModalExecTime:prevState.HistoryModalExecTime-1}
                }):this.setState(prevState=>{
                return{
                    ...prevState,
                    HistoryModalExecTime:prevState.HistoryModalExecTime+1}
            })
        };

        const MinimumExecutionTimeHandler=()=>{
            alert("Minimum required time is 2 seconds");
            this.setState({HistoryModalExecTime:5});
        };

        let Accuracy=`${(this.state.HistoryModalAccuracy).toFixed(2)} meters`;
        const HistoryModalAccuracy_Handler=(type)=>{
            (type==="sub")? this.setState(prevState=>{
                return{
                    ...prevState,
                    HistoryModalAccuracy:prevState.HistoryModalAccuracy-.01}
            }):this.setState(prevState=>{
                return{
                    ...prevState,
                    HistoryModalAccuracy:prevState.HistoryModalAccuracy+.01}
            })
        };

        const historyPickerModalSubmitHandler=()=>{
            let info={
                Time:this.state.HistoryModalExecTime*1000,
                Accuracy:this.state.HistoryModalAccuracy,
            };
            this.props.historyPickerPoint_SubmitInfo(info);
            this.setState({HistoryModalExecTime:5,HistoryModalAccuracy:10.00});
        };

        if (this.props.display === 'HistoryPickerModal') {
            modalData = (
                <div
                    className={classes.HistoryPickerModal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div className={classes.HistoryPickerHeading}>
                        <h2>Location From History</h2>
                        <FontAwesomeIcon icon={['fas', 'times-circle']} size='2x'
                                         className={classes.HistoryPickerCloseIcon} onClick={ModalClosedHandler}/>
                    </div>
                    <div className={classes.HistoryPickerSubHeading}>
                        <h3 type="subheading1">Set Execution Time</h3>
                        <p>Set running time for execution of this point</p>
                        <FontAwesomeIcon icon={['far', 'minus-square']} size='3x' className={classes.HistoryPickerIcon}
                        onClick={()=>{HistoryModalExecTime_Handler("sub")}}/>
                        <h3 className={classes.executionTime}>{ExecTime}</h3>
                        {(this.state.HistoryModalExecTime<2) ? MinimumExecutionTimeHandler():null}
                        <FontAwesomeIcon icon={['far', 'plus-square']} size='3x' className={classes.HistoryPickerIcon}
                                         onClick={()=>{HistoryModalExecTime_Handler("add")}}/>
                    </div>
                    <div className={classes.HistoryPickerSubHeading}>
                        <h3 type="subheading1">Set Accuracy</h3>
                        <p>Set accuracy of this point</p>
                        <FontAwesomeIcon icon={['far', 'minus-square']} size='3x' className={classes.HistoryPickerIcon}
                                         onClick={()=>{HistoryModalAccuracy_Handler("sub")}}/>
                        <h3 className={classes.accuracy}>{Accuracy}</h3>
                        <FontAwesomeIcon icon={['far', 'plus-square']} size='3x' className={classes.HistoryPickerIcon}
                                         onClick={()=>{HistoryModalAccuracy_Handler("add")}}/>
                    </div>
                    <div type="playlistSubmit">
                        <button onClick={historyPickerModalSubmitHandler}>Add to Playlist</button>
                    </div>
                </div>
            )
        }

        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={ModalClosedHandler}/>
                {modalData}
            </Fragment>
        );
    }
}

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
            createPlaylist_FOR_ADMIN: (user_id, playlist) => dispatch(actions.createPlaylist_FOR_ADMIN(user_id, playlist)),
            createPlaylist_FOR_USER: (token, playlist) => dispatch(actions.createPlaylist(token, playlist)),
            // fetchPlaylistsFor_MOBILE_USER: (token) => dispatch(actions.initPlaylists(token)),
            // onPlaylistSelected: (_id) => dispatch(actions.playlistSelected(_id)),
            // fetchPlaylistsFor_ADMIN_USER: (_id) => dispatch(actions.initPlaylistsbyID_FOR_ADMIN(_id)),

        };
    };


export default connect(mapStateToProps, mapDispatchToProps)(Modal);