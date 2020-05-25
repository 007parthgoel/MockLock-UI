import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Playlists.css';
import PlaylistsGrid from '../../../components/v1/PlaylistsGrid/PlaylistsGrid';
import Maps from '../../../components/v1/UI/GoogleMaps/GoogleMaps';
// import Maps from '../../../components/v1/UI/MapBox/MapBox';
import * as actions from "../../../store/actions/v1/Index";
import {
    localConfig,
    set_cookies,
    load_cookies,
    remove_cookies,
    loadAll_cookies
} from '../../../utils/SessionManager';
import {Link} from "react-router-dom";

class Playlists extends Component {

    componentDidMount() {
        if (load_cookies("Playlists", localConfig.user_type, false) === 'mobile') {
            this.props.fetchPlaylistsFor_MOBILE_USER(load_cookies("Playlists", localConfig.user_token, false));
        }

        if (load_cookies("Playlists", localConfig.user_type, false) === "admin") {
            this.props.fetchPlaylistsFor_ADMIN_USER(load_cookies("Playlists", localConfig.userID_selected, false));
        }

    };

    render() {

        let selected_playlist_properties;
        let maps=(<div>Click on playlist to render Map</div>);
        if(Object.keys(this.props.playlist_Selected).length>0){
            selected_playlist_properties=this.props.playlist_Selected.playlist_points;
            // alert(selected_playlist_properties[0].Longitude);
            maps=(<Maps
                // MapcoordinatesDetails={this.props.playlistSelected}
                Mapcoordinates_Details={selected_playlist_properties}
            />)
        }

        const GridOFPlaylists = this.props.playlists.map(playlist => (
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
                    </div>
                    <div className={classes.Page_subheading_right}>
                        <h3>settings</h3>
                        <h3>Help and guidlines</h3>
                    </div>
                </div>
                <div className={classes.Grid_MapContainer}>
                    <div className={classes.Grid}>
                        <div className={classes.GridList}>
                            <ul className={classes.Lists}>
                                {GridOFPlaylists}
                            </ul>
                        </div>
                        {/*<div className={classes.SubMenu}>*/}
                        {/*    <p>submenu</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className={classes.googleMaps}>
                        {/*{this.props.playlist_Selected.points_count}*/}
                        {/*{this.props.playlist_Selected.name}*/}
                        {/*{funt}*/}

                        {/*{playlistpoints[0].Longitude}*/}
                        {/*{this.props.playlistSelected.playlist_points[0].Longitude}*/}
                        {/*{this.props.playlistSelected.playlist_points.map((point)=>(*/}
                        {/*    <p>point.Latitude</p>*/}
                        {/*    ))}*/}
                        {/*<Maps*/}
                        {/*    // MapcoordinatesDetails={this.props.playlistSelected}*/}
                        {/*    Mapcoordinates_Details={selected_playlist_properties}*/}
                        {/*/>*/}
                        {maps}
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
