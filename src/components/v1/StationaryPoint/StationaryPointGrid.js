import React from 'react';
import classes from './StationaryPointGrid.css';

const stationaryPointGrid = (props) => {
    let hours_playback = `${(props.stationaryPoint.hours_playback / 60000).toFixed(2)} minutes`;
    let latitude_longitude = `${props.stationaryPoint.latitude} , ${props.stationaryPoint.longitude} `;
    let launches = `${props.stationaryPoint.launches} launches`;

    return (
        <div className={classes.stationaryPointGrid}
             onClick={() => props.clicked(props.stationaryPoint._id)}>
            <div className={classes.stationaryPointGrid_top}>
                <p className={classes.latitude_longitude}>{latitude_longitude}</p>
                <p className={classes.timezone}>{props.stationaryPoint.timezone}</p>
            </div>
            <div className={classes.stationaryPointGrid_middle}>
                <h4 className={classes.address}>{props.stationaryPoint.geographic_address}</h4>
                <div className={classes.stationaryPointMenu}>
                    <div className={classes.dot}></div>
                    <div className={classes.dot}></div>
                    <div className={classes.dot}></div>
                </div>
            </div>
            <div className={classes.stationaryPointGrid_bottom}>
                <p className={classes.launches}>{launches}</p>
                <p className={classes.hours_playback}>{hours_playback}</p>
            </div>
        </div>
    )
};

export default stationaryPointGrid;