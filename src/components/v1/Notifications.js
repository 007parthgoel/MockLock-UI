import React from 'react';
import '../../App.css';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

function Notification() {
    return (
        <Grid container style={{background:"#ffbbbb", height:"100%", marginTop:"18px"}}>
            <Typography>soem text goes here </Typography>
        </Grid>
    );
}

export default Notification;
