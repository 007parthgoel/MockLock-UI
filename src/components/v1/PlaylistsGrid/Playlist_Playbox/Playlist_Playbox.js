import React, {useEffect, useState} from 'react';
import classes from './Playlist_Playbox.css'
import {connect} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortUp, faSortDown, faBars} from '@fortawesome/free-solid-svg-icons'

const Playlist_Playbox = (props) => {
    library.add(faSortUp, faSortDown, faBars);

    const [state, setState] = useState({
        state_playlist: {...props.playlist_Selected},
    });

    useEffect(() => {
        setState({state_playlist: props.playlist_Selected})
    }, [props.playlist_Selected]);

    // useEffect(()=>{
    //     setState({state_playlist:{}});
    // },[]);

    const timeString_Handler = (time) => {
        let Total_time = time / 1000;
        let hours_playback;
        if (Total_time > 3600) {
            hours_playback = `${Math.floor(Total_time / 3600)}:${Math.floor((Total_time % 3600) / 60)}:${Total_time % 60} sec`;
        }
        if (0 < Total_time && Total_time < 3600) {
            hours_playback = ` 00:${Math.floor((Total_time % 3600) / 60)}:${Total_time % 60} sec`;
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

    let points;
    let playbox = null;
    // if (Object.keys(props.playlist_Selected).length > 0) {
    if (Object.keys(state.state_playlist).length > 0) {
        points = props.playlist_Selected;

        let points_count = `${points.points_count} points`;
        let list = state.state_playlist.playlist_points.map((point, index) => (
            <div key={point.id} className={classes.list}>
                <div className={classes.list_arrowButton}>
                    {(index === 0) ?
                        <FontAwesomeIcon icon="sort-down" size='3x'
                                         className={classes.fontIconIndex0}  onClick={() => {shiftDOWN_handler(index)}}/>
                        : (index === (points.points_count - 1)) ?
                            <FontAwesomeIcon icon="sort-up" size='3x'
                                           className={classes.fontIconIndexLast}  onClick={() => {shiftUP_handler(index)}}/>
                            :
                            <div>
                                < FontAwesomeIcon icon="sort-up" size='3x'  transform="right-6 down-6" onClick={() => {shiftUP_handler(index)}}/>
                                <FontAwesomeIcon icon="sort-down" size='3x' transform="left-4 down-9" onClick={() => {shiftDOWN_handler(index)}}/>
                            </div>
                    }
                    {/*{(index === 0)?*/}
                    {/*    <FontAwesomeIcon icon="sort-up" size='3x' cursor='not-allowed'  transform="right-6 down-6"*/}
                    {/*                     // className={classes.fontawsomeiconUP}*/}
                    {/*                     style={{color: 'grey'}}*/}
                    {/*    /> :*/}
                    {/*    <FontAwesomeIcon icon="sort-up" size='3x' transform="right-6 down-6" onClick={() => {shiftUP_handler(index)}}/>}*/}
                    {/*{(index === (points.points_count - 1) )?*/}
                    {/*    <FontAwesomeIcon icon="sort-down" size='3x' cursor='not-allowed'  transform="left-4 down-9" style={{color: 'grey'}}/>:*/}
                    {/*    <FontAwesomeIcon icon="sort-down" size='3x' transform="left-4 down-9" onClick={() => {shiftDOWN_handler(index)}}/>}*/}
                </div>
                <div className={classes.list_description}>
                    <div>
                        <div className={classes.list_description_name}>{point.PointName}</div>
                        <div className={classes.list_description_time}>{timeString_Handler(point.Time)}</div>
                    </div>
                    <div>
                        <div className={classes.list_description_desc}>{point.PointDescription}</div>
                    </div>
                    <div className={classes.list_description_latLng}>{`${point.Latitude},${point.Longitude}`}</div>
                </div>
            </div>

        ));

        playbox = (
            <div>
                <div className={classes.playboxToggle} onClick={props.togglePlaybox}>
                    <div className={classes.playboxToggle_icon}>
                        {/*<FontAwesomeIcon icon="sort-up" size='1x'/>*/}
                        {props.show ? <FontAwesomeIcon icon="sort-down" size='1x' transform="up-8"/> :
                            <FontAwesomeIcon icon="sort-up" size='1x'/>}
                    </div>
                    <div className={classes.playboxToggle_div}>
                        {/*<span></span>*/}
                        {/*<span></span>*/}
                        {/*<span></span>*/}
                        {/*<FontAwesomeIcon icon="bars" size='1x' style={{width:'100%'}} />*/}
                        {/*<div></div>*/}
                        {/*<div></div>*/}
                        {/*<div></div>*/}
                    </div>
                    <div className={classes.playboxToggle_icon}>
                        {/*<FontAwesomeIcon icon="sort-up" size='1x'/>*/}
                        {props.show ? <FontAwesomeIcon icon="sort-down" size='1x' transform="up-8"/> :
                            <FontAwesomeIcon icon="sort-up" size='1x'/>}
                    </div>
                </div>
                <div className={classes.heading}>
                    <h3 className={classes.heading_name}>{props.playlist_Selected.name}</h3>
                    <h3 className={classes.heading_time}>{timeString_Handler(props.playlist_Selected.time)}</h3>
                    <h3 className={classes.heading_points}>{points_count}</h3>
                    <button className={classes.SaveButton}>Save</button>
                </div>

                {list}
            </div>

        );
    }

    return (
        <div className={classes.PlayboxGRID}>
            {playbox}
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

export default connect(mapStateToProps, mapDispatchToProps)(Playlist_Playbox);


// export default Playlist_Playbox;