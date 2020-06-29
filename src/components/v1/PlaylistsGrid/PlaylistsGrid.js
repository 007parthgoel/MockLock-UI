import React from 'react';
import classes from './PlaylistsGrid.css'
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
// import {faBars, faCircle as faCircleSolid, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {faCircle as faCircleRegular, faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const PlaylistGrid = (props) => {
    library.add(faTrashAlt, faEdit);

    let Total_time = props.playlist.time / 1000;
    let hours_playback;
    if (Total_time >= 3600) {
        hours_playback = `${Math.floor(Total_time / 3600)}:${Math.floor((Total_time % 3600) / 60)}:${Total_time % 60} hours`;
    }
    if (60 <= Total_time && Total_time < 3600) {
        hours_playback = ` 00:${Math.floor((Total_time % 3600) / 60)}:${Total_time % 60} minutes`;
    }
    if (0 < Total_time && Total_time < 60) {
        hours_playback = ` 00:00:${Total_time % 60} seconds`;
    }

    // let latitude_longitude = `${props.stationaryPoint.latitude} , ${props.stationaryPoint.longitude} `;
    let points_count = `${props.playlist.points_count} points`;

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

    return (
        <div className={classes.playlistGrid}
             onClick={() => props.clicked(props.playlist._id)}>
            <div className={classes.playlistGrid_top}>
                <p>{props.playlist.name}</p>
                {/*<p className={classes.latitude_longitude}>{latitude_longitude}</p>*/}
                {/*<p className={classes.timezone}>{props.stationaryPoint.timezone}</p>*/}
            </div>
            <div className={classes.playlistGrid_middle}>
                <h4 className={classes.description}>{props.playlist.description}</h4>
                {/*<div className={classes.playlistMenu}>*/}
                {/*    <div className={classes.dot}></div>*/}
                {/*    <div className={classes.dot}></div>*/}
                {/*    <div className={classes.dot}></div>*/}
                {/*</div>*/}
            </div>
            <div className={classes.playlistGrid_bottom}>
                <p className={classes.count}>{points_count}</p>
                <p className={classes.hours_playback}>{hours_playback}</p>
            </div>
            <div className={classes.list_MenuOptions}>
                <LightTooltip title="Edit" placement="top" arrow>
                    <div type="edit">
                        <Link to="/newPlaylist">
                            <FontAwesomeIcon icon={['far', 'edit']} size="2x" transform="shrink-4"
                                             onClick={()=>{props.editIconClicked(props.playlist._id)}}/>
                        </Link>
                    </div>
                </LightTooltip>
                <LightTooltip title="Delete" placement="top" arrow>
                    <div type="delete" onClick={() => {props.deleteIconClicked(props.playlist._id)}}>
                        <FontAwesomeIcon icon={['far', 'trash-alt']} size="2x" transform="shrink-4"/>
                    </div>
                </LightTooltip>
            </div>
        </div>
    )
};

export default PlaylistGrid;




