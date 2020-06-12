import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";
import {Link} from "react-router-dom";
import * as actions from "../../../../store/actions/v1/Index";
import {load_cookies, localConfig} from "../../../../utils/SessionManager";

class Modal extends Component {

    state = {
        newPlaylistDetails: {
            name: '',
            description: '',
            label_color: '',
        },
    };

    render() {
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
                }
            });
            this.props.ModalClosed();
        };

        const createPlaylistHandler=()=>{
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
            createPlaylist_FOR_ADMIN:(user_id,playlist)=>dispatch(actions.createPlaylist_FOR_ADMIN(user_id,playlist)),
            createPlaylist_FOR_USER:(token,playlist)=>dispatch(actions.createPlaylist(token,playlist)),
            // fetchPlaylistsFor_MOBILE_USER: (token) => dispatch(actions.initPlaylists(token)),
            // onPlaylistSelected: (_id) => dispatch(actions.playlistSelected(_id)),
            // fetchPlaylistsFor_ADMIN_USER: (_id) => dispatch(actions.initPlaylistsbyID_FOR_ADMIN(_id)),

        };
    };


export default connect(mapStateToProps,mapDispatchToProps)(Modal);