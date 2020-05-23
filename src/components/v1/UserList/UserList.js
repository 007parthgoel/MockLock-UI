import React from 'react';
import {Link, Redirect} from "react-router-dom"

import classes from './UserList.css'

const UserList = (props) => {
    return (
        <div className={classes.UserList}>
            <div className={classes.UserList_top}>
                <div className={classes.Name}>
                    <h4>Name:</h4>
                    <p>{props.userDetails.user_name}</p>
                </div>
                <div className={classes.Email}>
                    <h4>Email:</h4>
                    <p>{props.userDetails.user_email}</p>
                </div>
            </div>
            <div className={classes.UserList_bottom}>
                <div className={classes.UserID}>
                    <h4>User ID:</h4>
                    <p>{props.userDetails._id}</p>
                </div>
                <div className={classes.UserListButton}>
                    <Link to="/stationary-pointer">
                        <button className={classes.stnPointButton}
                                onClick={() => props.stnPointButtonClicked(props.userDetails._id)}>
                            Stationary Points
                        </button>
                    </Link>
                    <button className={classes.playlistButton}
                            // onClick={() => props.stnPointButtonClicked(props.userDetails._id)}
                    > Playlists
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserList;