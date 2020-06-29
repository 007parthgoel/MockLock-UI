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
import {faMinusSquare, faPlusSquare, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {
    faMinusSquare as faMinusSquareRegular,
    faPlusSquare as faPlusSquareRegular,
    faTimesCircle as faTimesCircleRegular,
} from '@fortawesome/free-regular-svg-icons';
import ManualPicker from "../../NewPlaylist/ManualPicker/ManualPicker";

const AlertMessageModal = (props) => {
    return (
        <div
            className={classes.AlertMessageModal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            <h2>Are you sure,you want to delete</h2>
            <button type="cancel" onClick={props.clickedCancel}>Cancel</button>
            <button type="yes" onClick={props.clickedYes}>Yes</button>
        </div>
    );
};

class Modal extends Component {

    state = {
        newPlaylistDetails: {
            name: '',
            description: '',
            label_color: '',
        },
        HistoryModalExecTime: 5,
        HistoryModalAccuracy: 10,
        ManualPickerDetails: {
            name: '',
            description: ''
        },
        ManualModalExecTime: 5,
        ManualModalAccuracy: 10,
    };

    render() {
        library.add(faMinusSquareRegular, faPlusSquareRegular, faTimesCircle, faTimesCircleRegular);

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
                HistoryModalExecTime: 5,
                HistoryModalAccuracy: 10.00
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

        let ExecTime = `${Math.floor(this.state.HistoryModalExecTime / 60)} min : ${Math.floor(this.state.HistoryModalExecTime % 60)} sec`;
        const HistoryModalExecTime_Handler = (type) => {
            (type === "sub") ? this.setState(prevState => {
                return {
                    ...prevState,
                    HistoryModalExecTime: prevState.HistoryModalExecTime - 1
                }
            }) : this.setState(prevState => {
                return {
                    ...prevState,
                    HistoryModalExecTime: prevState.HistoryModalExecTime + 1
                }
            })
        };

        const MinimumExecutionTimeHandler = () => {
            alert("Minimum required time is 2 seconds");
            this.setState({HistoryModalExecTime: 5});
        };

        let Accuracy = `${(this.state.HistoryModalAccuracy).toFixed(2)} meters`;
        const HistoryModalAccuracy_Handler = (type) => {
            (type === "sub") ? this.setState(prevState => {
                return {
                    ...prevState,
                    HistoryModalAccuracy: prevState.HistoryModalAccuracy - .01
                }
            }) : this.setState(prevState => {
                return {
                    ...prevState,
                    HistoryModalAccuracy: prevState.HistoryModalAccuracy + .01
                }
            })
        };

        const historyPickerModalSubmitHandler = () => {
            let info = {
                Time: this.state.HistoryModalExecTime * 1000,
                Accuracy: this.state.HistoryModalAccuracy,
            };
            this.props.historyPickerPoint_SubmitInfo(info);
            // this.props.manualPickerPoint_SubmitInfo(info);
            this.setState({HistoryModalExecTime: 5, HistoryModalAccuracy: 10.00});
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
                                         onClick={() => {
                                             HistoryModalExecTime_Handler("sub")
                                         }}/>
                        <h3 className={classes.executionTime}>{ExecTime}</h3>
                        {(this.state.HistoryModalExecTime < 2) ? MinimumExecutionTimeHandler() : null}
                        <FontAwesomeIcon icon={['far', 'plus-square']} size='3x' className={classes.HistoryPickerIcon}
                                         onClick={() => {
                                             HistoryModalExecTime_Handler("add")
                                         }}/>
                    </div>
                    <div className={classes.HistoryPickerSubHeading}>
                        <h3 type="subheading1">Set Accuracy</h3>
                        <p>Set accuracy of this point</p>
                        <FontAwesomeIcon icon={['far', 'minus-square']} size='3x' className={classes.HistoryPickerIcon}
                                         onClick={() => {
                                             HistoryModalAccuracy_Handler("sub")
                                         }}/>
                        <h3 className={classes.accuracy}>{Accuracy}</h3>
                        <FontAwesomeIcon icon={['far', 'plus-square']} size='3x' className={classes.HistoryPickerIcon}
                                         onClick={() => {
                                             HistoryModalAccuracy_Handler("add")
                                         }}/>
                    </div>
                    <div type="playlistSubmit">
                        <button onClick={historyPickerModalSubmitHandler}>Add to Playlist</button>
                    </div>
                </div>
            )
        }


        const ManualPickerModalSubmitHandler = () => {
            let info = {
                Time: this.state.ManualModalExecTime * 1000,
                Accuracy: this.state.ManualModalAccuracy,
                PointName: this.state.ManualPickerDetails.name,
                PointDescription: this.state.ManualPickerDetails.description
            };
            // this.props.historyPickerPoint_SubmitInfo(info);
            this.props.manualPickerPoint_SubmitInfo(info);
            this.setState({
                ManualModalExecTime: 5,
                ManualModalAccuracy: 10.00,
                ManualPickerDetails: {
                    name: '',
                    description: '',
                }
            });
        };

        const ManualPickerDetailsHandler = (event) => {
            this.setState({
                ManualPickerDetails: {
                    ...this.state.ManualPickerDetails,
                    [event.target.name]: event.target.value
                }
            });
        };

        let ManualPickerExecTime = `${Math.floor(this.state.ManualModalExecTime / 60)} min : ${Math.floor(this.state.ManualModalExecTime % 60)} sec`;
        const ManualModalExecTime_Handler = (type) => {
            (type === "sub") ? this.setState(prevState => {
                return {
                    ...prevState,
                    ManualModalExecTime: prevState.ManualModalExecTime - 1
                }
            }) : this.setState(prevState => {
                return {
                    ...prevState,
                    ManualModalExecTime: prevState.ManualModalExecTime + 1
                }
            })
        };

        const MinimumManualModalExecutionTimeHandler = () => {
            alert("Minimum required time is 2 seconds");
            this.setState({ManualModalExecTime: 5});
        };

        let ManualPickerAccuracy = `${(this.state.ManualModalAccuracy).toFixed(2)} meters`;
        const ManualModalAccuracy_Handler = (type) => {
            (type === "sub") ? this.setState(prevState => {
                return {
                    ...prevState,
                    ManualModalAccuracy: prevState.ManualModalAccuracy - .01
                }
            }) : this.setState(prevState => {
                return {
                    ...prevState,
                    ManualModalAccuracy: prevState.ManualModalAccuracy + .01
                }
            })
        };

        if (this.props.display === 'ManualPickerModal') {
            modalData = (
                <div
                    className={classes.ManualPickerModal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div className={classes.ManualPickerHeading}>
                        <h2>Location From History</h2>
                        <FontAwesomeIcon icon={['fas', 'times-circle']} size='2x'
                                         className={classes.ManualPickerCloseIcon} onClick={ModalClosedHandler}/>
                    </div>
                    <div className={classes.ManualPickerName}>
                        <h3>Name:</h3>
                        <input type="text" name="name" value={this.state.ManualPickerDetails.name}
                               placeholder="Enter Name"
                               onChange={ManualPickerDetailsHandler} autoComplete="off" autoFocus/>
                    </div>
                    <div className={classes.ManualPickerDescription}>
                        <h3>Description:</h3>
                        <textarea name="description" value={this.state.ManualPickerDetails.description}
                                  placeholder="Enter Description"
                                  onChange={ManualPickerDetailsHandler}/>
                        {/*<input name="description" value={this.state.ManualPickerDetails.description} placeholder="Enter Description"
                        onChange={ManualPickerDetailsHandler}/>*/}
                    </div>
                    <div className={classes.ManualPickerSubHeading}>
                        <h3 type="subheading1">Set Execution Time</h3>
                        <p>Set running time for execution of this point</p>
                        <FontAwesomeIcon icon={['far', 'minus-square']} size='3x' className={classes.ManualPickerIcon}
                                         onClick={() => {
                                             ManualModalExecTime_Handler("sub")
                                         }}/>
                        <h3 className={classes.ManualExecutionTime}>{ManualPickerExecTime}</h3>
                        {(this.state.ManualModalExecTime < 2) ? MinimumManualModalExecutionTimeHandler() : null}
                        <FontAwesomeIcon icon={['far', 'plus-square']} size='3x' className={classes.ManualPickerIcon}
                                         onClick={() => {
                                             ManualModalExecTime_Handler("add")
                                         }}/>
                    </div>
                    <div className={classes.ManualPickerSubHeading}>
                        <h3 type="subheading1">Set Accuracy</h3>
                        <p>Set accuracy of this point</p>
                        <FontAwesomeIcon icon={['far', 'minus-square']} size='3x' className={classes.ManualPickerIcon}
                                         onClick={() => {
                                             ManualModalAccuracy_Handler("sub")
                                         }}/>
                        <h3 className={classes.ManualAccuracy}>{ManualPickerAccuracy}</h3>
                        <FontAwesomeIcon icon={['far', 'plus-square']} size='3x' className={classes.ManualPickerIcon}
                                         onClick={() => {
                                             ManualModalAccuracy_Handler("add")
                                         }}/>
                    </div>
                    <div type="playlistSubmit">
                        <button onClick={ManualPickerModalSubmitHandler}>Add to Playlist</button>
                    </div>
                </div>
            )
        }

        if (this.props.display === 'NewPlaylistDeleteAlertModal') {
            modalData = (
                <AlertMessageModal show={this.props.show}
                                   clickedYes={this.props.deleteList}
                                   clickedCancel={ModalClosedHandler}
                />
                );
        }

        if (this.props.display === 'playlistDeleteAlertModal') {
            modalData = (
                <AlertMessageModal show={this.props.show}
                                   clickedYes={this.props.deletePlaylist}
                                   clickedCancel={ModalClosedHandler}
                />
            );
        }

        if (this.props.display === 'StationaryPointDeleteAlertModal') {
            modalData = (
                <AlertMessageModal show={this.props.show}
                                   clickedYes={this.props.deleteStationaryPoint}
                                   clickedCancel={ModalClosedHandler}
                />
            );
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
