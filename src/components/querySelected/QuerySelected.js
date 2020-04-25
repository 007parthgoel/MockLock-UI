import React from 'react';
import classes from './QuerySelected.css';

const QuerySelected = (props) => {

    // let timestamp = props.query._id.toString().substring(0, 8);
    // let date = new Date(parseInt(timestamp, 16) * 1000)
    // let date=props.query

    return (
        <div className={classes.QueryGrid}>

            <div className={classes.QueryGrid_top}>
                <div className={classes.QueryGrid_image}></div>
                <div className={classes.QueryGrid_UserDetails}>
                    <h3 className={classes.QueryGrid_Username}>UserName</h3>
                    <p className={classes.QueryGrid_Email}>{props.queryDetails.user_email}</p>
                    <p className={classes.QueryGrid_phone}>{props.queryDetails.user_phone}</p>
                </div>
            </div>
            
            <div className={classes.QueryGrid_bottom}>
                {/* <p>{new Intl.DateTimeFormat('en-US').format(Date.now())}</p> */}
                {/* <p>{date}</p> */}
                {/* <p className={QueryGrid_QueryStatus}>{props.queryDetails.status}</p> */}
                <p className={classes.QueryGrid_UserQueryTitle}>Query</p>
                <p className={classes.QueryGrid_UserQuery}>{props.queryDetails.user_query}</p>
            </div>
        </div>
    );
}

export default QuerySelected;