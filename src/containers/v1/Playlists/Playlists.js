import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import classes from './Playlists.css';
import PlaylistsGrid from '../../../components/v1/PlaylistsGrid/PlaylistsGrid';
import PlayboxGRID from "../../../components/v1/PlaylistsGrid/Playlist_Playbox/Playlist_Playbox";
import Maps from '../../../components/v1/UI/GoogleMaps/GoogleMaps';
// import Maps from '../../../components/v1/UI/MapBox/MapBox';
import * as actions from "../../../store/actions/v1/Index";
import Modal from '../../../components/v1/UI/Modal/Modal'
// import asyncComponent from '../../../hoc/asyncComponent/asyncComponent';
import {
    localConfig,
    // set_cookies,
    load_cookies,
    // remove_cookies,
    // loadAll_cookies
} from '../../../utils/SessionManager';
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";

// const Maps = asyncComponent(() => {
//     return import('../../../components/v1/UI/GoogleMaps/GoogleMaps');
// });


class Playlists extends Component {

    state = {
        show_playlist_PLAYBOX: false,
        show_newPlaylistModal: false,
    };

    componentDidMount() {
        if (load_cookies("Playlists", localConfig.user_type, false) === 'mobile') {
            this.props.fetchPlaylistsFor_MOBILE_USER(load_cookies("Playlists", localConfig.user_token, false));
        }

        if (load_cookies("Playlists", localConfig.user_type, false) === "admin") {
            this.props.fetchPlaylistsFor_ADMIN_USER(load_cookies("Playlists", localConfig.userID_selected, false));
        }

    };

    render() {

        const newPlaylistModalHandler = () => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    show_newPlaylistModal: !prevState.show_newPlaylistModal,
                };
            })
        };

        const playlist_PLAYBOX_handler = () => {
            console.log(this.state.show_playlist_PLAYBOX);
            this.setState({show_playlist_PLAYBOX: !this.state.show_playlist_PLAYBOX})
        };

        let attach_classes = [classes.playlist_PLAYBOX, classes.playlist_PLAYBOX_close];
        if (this.state.show_playlist_PLAYBOX) {
            attach_classes = [classes.playlist_PLAYBOX, classes.playlist_PLAYBOX_open];
        }

        // let selected_playlist_properties;
        let selected_playlist_points;
        let maps = (<div>Click on playlist to render Map</div>);
        let playbox = null;
        if (Object.keys(this.props.playlist_Selected).length > 0) {

            selected_playlist_points = this.props.playlist_Selected.playlist_points;
            maps = (
                <Maps
                    Mapcoordinates_Details={selected_playlist_points}
                />
            );

            playbox = (
                <div className={attach_classes.join(' ')}>
                    <PlayboxGRID
                        playlist_Selected={this.props.playlist_Selected}
                        togglePlaybox={playlist_PLAYBOX_handler}
                        show={this.state.show_playlist_PLAYBOX}
                    />
                </div>
            )
        }

        let EmptyData_statement = (this.props.playlists.length === 0) ? <p>There are no playlist</p> : null;

        let GridOFPlaylists = this.props.playlists.map(playlist => (
            <li key={playlist._id}>
                <PlaylistsGrid
                    playlist={playlist}
                    clicked={(_id) => {
                        this.props.onPlaylistSelected(_id);
                    }}
                    playlistid={playlist._id}
                />
            </li>
        ));

        return (
            <div className={classes.PlaylistsPage}>
                <div className={classes.Page_headings}>
                    <Link to="/stationary-pointer">
                        <h1>History</h1>
                    </Link>
                    <Link to="/playlists">
                        <h1 className={classes.Page_headings_active}>Playlists</h1>
                    </Link>
                </div>

                <div className={classes.Page_subheadings}>
                    <div className={classes.Page_subheading_left}>
                        <h2>Recent Executed Itenaries</h2>
                        {/*<Link to="/newPlaylist">*/}
                        <button onClick={newPlaylistModalHandler}>Create Playlist</button>
                        {/*</Link>*/}

                        <Modal display={"newPlaylistModal"} show={this.state.show_newPlaylistModal} ModalClosed={newPlaylistModalHandler}/>

                    </div>
                    <div className={classes.Page_subheading_right}>
                        <h3>settings</h3>
                        <h3>Help and guidlines</h3>
                    </div>
                </div>
                <div className={classes.Grid_MapContainer}>
                    <div className={classes.Grid}>
                        <div className={classes.GridList}>
                            {EmptyData_statement}
                            <ul className={classes.Lists}>
                                {GridOFPlaylists}
                            </ul>
                        </div>
                    </div>
                    <div className={classes.googleMaps}>
                        {/*<Maps*/}
                        {/*    // MapcoordinatesDetails={this.props.playlistSelected}*/}
                        {/*    Mapcoordinates_Details={selected_playlist_properties}*/}
                        {/*/>*/}
                        {maps}
                        {playbox}
                    </div>
                </div>
            </div>
        );
    }
}

const
    mapStateToProps = state => {
        return {
            playlists: state.playlists.playlists,
            error: state.playlists.error,
            playlist_Selected: state.playlists.playlistSelected,
        };
    };

const
    mapDispatchToProps = dispatch => {
        return {
            fetchPlaylistsFor_MOBILE_USER: (token) => dispatch(actions.initPlaylists(token)),
            onPlaylistSelected: (_id) => dispatch(actions.playlistSelected(_id)),
            fetchPlaylistsFor_ADMIN_USER: (_id) => dispatch(actions.initPlaylistsbyID_FOR_ADMIN(_id)),
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
