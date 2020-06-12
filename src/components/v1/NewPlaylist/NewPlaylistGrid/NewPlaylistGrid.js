import React, {useEffect, useState} from 'react';
import classes from './NewPlaylistGrid.css'
import {connect} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faBars} from '@fortawesome/free-solid-svg-icons'
import textarea from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/textarea";

const PlaylistGrid = (props) => {
    library.add(faSortUp, faSortDown, faBars);

    const [state, setState] = useState({
        state_playlist: {...props.playlist},
    });

    useEffect(() => {
        console.log(props.playlist);
        setState({state_playlist: props.playlist})
    }, [props.playlist]);

    useEffect(()=>{
        if(Object.keys(props.historyPickerAdded).length>0) {
            console.log(props.historyPickerAdded);
            let playlistArray=[...state.state_playlist.playlist_points];
            playlistArray.push(props.historyPickerAdded);

            setState({
                state_playlist: {
                    ...state.state_playlist,
                    points_count:state.state_playlist.points_count+1,
                    playlist_points: [...playlistArray]
                }
            })
        }
    },[props.historyPickerAdded]);

    useEffect(()=>{
        if(props.historyPickerRemoved){
            console.log(props.historyPickerRemoved);
            let playlistArray=[...state.state_playlist.playlist_points];
            playlistArray=playlistArray.filter(point=>point._id!==props.historyPickerRemoved);
            setState({
                state_playlist: {
                    ...state.state_playlist,
                    points_count:state.state_playlist.points_count-1,
                    playlist_points: [...playlistArray]
                }
            });
        }
    },[props.historyPickerRemoved]);

    const timeString_Handler = (time) => {
        let Total_time = time / 1000;
        let hours_playback;
        if (Total_time > 3600) {
            hours_playback = `${Math.floor(Total_time / 3600)}:${Math.floor((Total_time % 3600) / 60)}:${Total_time % 60} hrs`;
        }
        if (0 < Total_time && Total_time < 3600) {
            hours_playback = ` 00:${Math.floor((Total_time % 3600) / 60)}:${Total_time % 60} min`;
        }
        else {
            hours_playback= `00:00:00 sec`
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

    let list;
    let playlistInfo;
    // if (Object.keys(props.playlist_Selected).length > 0) {
    if (Object.keys(state.state_playlist).length > 0) {

        playlistInfo=(
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
                    <select name="color" value={state.state_playlist.color}
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
                    <h3 className={classes.time}>{timeString_Handler(state.state_playlist.time)}</h3>
                    <h3 className={classes.points}>{`${state.state_playlist.points_count} points`}</h3>
                </div>
            </div>
        );

        // let points_count = `${points.points_count} points`;
        list = state.state_playlist.playlist_points.map((point, index) => (
            <div key={point._id} className={classes.list}>
                <div className={classes.list_arrowButton}>
                    {(index === 0) ?
                        <FontAwesomeIcon icon="sort-down" size='3x'
                                         className={classes.fontIconIndex0} onClick={() => {
                            shiftDOWN_handler(index)
                        }}/>
                        : (index === (state.state_playlist.points_count - 1)) ?
                            <FontAwesomeIcon icon="sort-up" size='3x'
                                             className={classes.fontIconIndexLast} onClick={() => {
                                shiftUP_handler(index)
                            }}/>
                            :
                            <div>
                                < FontAwesomeIcon icon="sort-up" size='3x' transform="right-6 down-6" onClick={() => {
                                    shiftUP_handler(index)
                                }}/>
                                <FontAwesomeIcon icon="sort-down" size='3x' transform="left-4 down-9" onClick={() => {
                                    shiftDOWN_handler(index)
                                }}/>
                            </div>
                    }
                </div>
                <div className={classes.list_description}>
                    <div>
                        <div className={classes.list_description_name}>{point.PointName || point.name}</div>
                        <div className={classes.list_description_time}>{timeString_Handler(point.Time)}</div>
                    </div>
                    <div>
                        <div className={classes.list_description_desc}>{point.PointDescription || point.description}</div>
                    </div>
                    <div className={classes.list_description_latLng}>{`${point.Latitude || point.latitude},${point.Longitude || point.longitude}`}</div>
                </div>
            </div>

        ));
    }




    return (
        <div className={classes.PlayListGRID}>
            {playlistInfo}
            <div className={classes.ListView}>
                {console.log(state.state_playlist.playlist_points)}
                {list}
            </div>
            {/*<div className={classes.savePlaylist}>*/}
                <button className={classes.savePlaylist}>Save Playlist</button>
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
            // fetchPlaylistsFor_MOBILE_USER: (token) => dispatch(actions.initPlaylists(token)),
            // onPlaylistSelected: (_id) => dispatch(actions.playlistSelected(_id)),
            // fetchPlaylistsFor_ADMIN_USER: (_id) => dispatch(actions.initPlaylistsbyID_FOR_ADMIN(_id)),
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistGrid);