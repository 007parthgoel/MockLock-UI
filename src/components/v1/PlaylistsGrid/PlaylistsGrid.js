import React from 'react';
import classes from './PlaylistsGrid.css'

const PlaylistGrid = (props) => {
    let Total_time = props.playlist.time/1000;
    let hours_playback;
    if(Total_time>3600){
        hours_playback=`${Math.floor(Total_time/3600)}:${Math.floor((Total_time%3600)/60)}:${Total_time%60} seconds`;
    }
    if(0<Total_time && Total_time<3600){
        hours_playback=` 00:${Math.floor((Total_time%3600)/60)}:${Total_time%60} seconds`;
    }

    // let latitude_longitude = `${props.stationaryPoint.latitude} , ${props.stationaryPoint.longitude} `;
    let points_count = `${props.playlist.points_count} points`;

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
                <div className={classes.playlistMenu}>
                    <div className={classes.dot}></div>
                    <div className={classes.dot}></div>
                    <div className={classes.dot}></div>
                </div>
            </div>
            <div className={classes.playlistGrid_bottom}>
                <p className={classes.count}>{points_count}</p>
                <p className={classes.hours_playback}>{hours_playback}</p>
            </div>
        </div>
    )
};

export default PlaylistGrid;




