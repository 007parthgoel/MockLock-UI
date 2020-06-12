import React, {useState} from 'react';
import classes from './HistoryPicker.css';

const historyPicker = (props) => {

    const [checked,setchecked]=useState(false);

    let hours_playback = `${(props.stationaryPoint.hours_playback / 60000).toFixed(2)} minutes`;
    let latitude_longitude = `${props.stationaryPoint.latitude} , ${props.stationaryPoint.longitude} `;
    let launches = `${props.stationaryPoint.launches} launches`;

    const checkBoxHandler=(event)=>{
        if(checked===false){
            props.checkBoxAdd(event.target.value);
            setchecked(true);
        }
        if(checked===true){
            props.checkBoxRemove(event.target.value);
            console.log(event.target.value);
            setchecked(false);
        }
    };

    return (
        <div className={classes.stationaryPointGrid}>
            <div className={classes.stationaryPointGrid_top}>
                <p className={classes.latitude_longitude}>{latitude_longitude}</p>
                <p className={classes.timezone}>{props.stationaryPoint.timezone}</p>
            </div>
            <div className={classes.stationaryPointGrid_middle}>
                <h4 className={classes.address}>{props.stationaryPoint.geographic_address}</h4>
                <div className={classes.checkboxContainer}>
                    <input type='checkbox' checked={checked}  value={props.stationaryPoint._id}
                           onClick={checkBoxHandler}/>
                </div>
            </div>
            <div className={classes.stationaryPointGrid_bottom}>
                <p className={classes.launches}>{launches}</p>
                <p className={classes.hours_playback}>{hours_playback}</p>
            </div>
        </div>
    )
};

export default historyPicker;