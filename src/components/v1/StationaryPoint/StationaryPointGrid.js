import React from 'react';
import classes from './StationaryPointGrid.css';
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faSortUp, faSortDown, faBars, faCircle as faCircleSolid} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt, faEdit, faCircle as faCircleRegular} from '@fortawesome/free-regular-svg-icons'


const stationaryPointGrid = (props) => {
    library.add(faTrashAlt, faEdit);

    let Total_time = props.stationaryPoint.hours_playback/1000;
    let hours_playback;
    if(Total_time>=3600){
        hours_playback=`${Math.floor(Total_time/3600)}:${Math.floor((Total_time%3600)/60)}:${Total_time%60} hours`;
    }
    if(60<=Total_time && Total_time<3600){
        hours_playback=` 00:${Math.floor((Total_time%3600)/60)}:${Total_time%60} minutes`;
    }
    if(0<Total_time && Total_time<60){
        hours_playback=` 00:00:${Total_time%60} seconds`;
    }

    // let hours_playback = `${(props.stationaryPoint.hours_playback / 60000).toFixed(2)} minutes`;
    let latitude_longitude = `${props.stationaryPoint.latitude} , ${props.stationaryPoint.longitude} `;
    let launches = `${props.stationaryPoint.launches} launches`;

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
        <div className={classes.stationaryPointGrid}
             onClick={() => props.clicked(props.stationaryPoint._id)}>
            <div className={classes.stationaryPointGrid_top}>
                <p className={classes.latitude_longitude}>{latitude_longitude}</p>
                <p className={classes.timezone}>{props.stationaryPoint.timezone}</p>
            </div>
            <div className={classes.stationaryPointGrid_middle}>
                <h4 className={classes.address}>{props.stationaryPoint.geographic_address}</h4>
                {/*<div className={classes.stationaryPointMenu}>*/}
                {/*    <div className={classes.dot}></div>*/}
                {/*    <div className={classes.dot}></div>*/}
                {/*    <div className={classes.dot}></div>*/}
                {/*</div>*/}
            </div>
            <div className={classes.stationaryPointGrid_bottom}>
                <p className={classes.launches}>{launches}</p>
                <p className={classes.hours_playback}>{hours_playback}</p>
            </div>
            <div className={classes.list_MenuOptions}>
                <LightTooltip title="Edit" placement="top" arrow>
                    <div type="edit">
                        <FontAwesomeIcon icon={['far', 'edit']} size="2x" transform="shrink-4"/>
                    </div>
                </LightTooltip>
                <LightTooltip title="Delete" placement="top" arrow>
                    <div type="delete" onClick={() => {props.deleteIconClicked(props.stationaryPoint._id)}}>
                        <FontAwesomeIcon icon={['far', 'trash-alt']} size="2x" transform="shrink-4"/>
                    </div>
                </LightTooltip>
            </div>
        </div>
    )
};

export default stationaryPointGrid;