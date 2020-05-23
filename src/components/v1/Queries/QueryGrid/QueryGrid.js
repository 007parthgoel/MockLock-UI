import React from 'react';
import moment from 'moment'
import classes from './QueryGrid.css';

const queryGrid = (props) => {
    
    let QueryGrid_QueryStatus = (props.query.status === "RESOLVED") ? classes.QueryGrid_QueryStatus_Resolved : classes.QueryGrid_QueryStatus_Pending;

    return (
        <div className={classes.QueryGrid}
            onClick={() => props.clicked(props.query._id)}>

            <div className={classes.QueryGrid_top}>
                <div className={classes.QueryGrid_image}></div>

                <div className={classes.QueryGrid_UserDetails}>
                    <h3 className={classes.QueryGrid_Username}>UserName</h3>
                    <p className={classes.QueryGrid_Email}>{props.query.user_email}</p>
                    <p className={classes.QueryGrid_phone}>{props.query.user_phone}</p>
                </div>

                <div className={classes.QueryGrid_Date_Status}>
                    {/*<p className={classes.QueryGrid_Date}>{new Intl.DateTimeFormat('en-US').format(Date.now())}</p>*/}
                    <p className={classes.QueryGrid_Date}>{moment(props.query.updatedAt).format('DD-MMMM-YYYY | h:mm A')}</p>
                    {/* <p>{date}</p> */}
                    <p className={QueryGrid_QueryStatus}>{props.query.status}</p>
                </div>
            </div>

            <div className={classes.QueryGrid_bottom}>
                <p className={classes.QueryGrid_UserQueryTitle}>Query</p>
                <p className={classes.QueryGrid_UserQuery}>{props.query.user_query}</p>
            </div>
        </div>
    );
}

export default queryGrid;