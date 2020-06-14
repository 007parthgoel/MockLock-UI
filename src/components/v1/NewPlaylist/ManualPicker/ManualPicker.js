import React, {useEffect, useState} from 'react';
import classes from './ManualPicker.css';

const ManualPicker=(props)=>{
    const [state,setState]=useState({
        latitude:null,
        longitude:null,
    });

    useEffect(()=>{
        if(props.resetLatLog===false){
            setState({
                latitude:'',
                longitude:'',
            })
        }
    },[props.resetLatLog]);

    const LatLogHandler=(event)=>{
            setState({
                ...state,
                [event.target.name]:event.target.value });
            // console.log(event.target.name,event.target.value);
    };

    const plotLatLogHandler=()=>{
        let latlog={
            latitude:state.latitude,
            longitude:state.longitude,
        };
        props.plotLatLog(latlog);
    };

    const submitLatLogHandler=()=>{
        let point={
            latitude:state.latitude,
            longitude:state.longitude,
            geographic_address:'',
            timeZone:"NA"
        };
        console.log(point);
        props.AddLatLog(point);
    };

    return(
        <div className={classes.ManualPickerPage}>
            <div className={classes.placePicker}>
                <input type="text" placeholder="Enter place you want to search"/>
                <button>Search</button>
            </div>
            <div className={classes.latitude}>
                <h2>Latitude:</h2>
                <input type="Number" value={state.latitude} name="latitude" onChange={LatLogHandler} placeholder="Enter Latitude"/>
            </div>
            <div className={classes.longitude}>
                <h2>Longitude:</h2>
                <input type="Number" value={state.longitude} name="longitude" onChange={LatLogHandler} placeholder="Enter Longitude"/>
            </div>
            <div className={classes.ManualPickerButton}>
                <button type="plot" onClick={plotLatLogHandler}>Plot Lat-log</button>
                <button type="addPlaylist" onClick={submitLatLogHandler}>Add to Playlist</button>
            </div>
        </div>
    )
};

export default ManualPicker;