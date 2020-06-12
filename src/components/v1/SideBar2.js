import React, {useState} from 'react';
import '../../App.css';
import {Link, Redirect} from "react-router-dom";
import List from '@material-ui/core/List';
import {connect} from 'react-redux';
import * as actions from "../../store/actions/v1/Index";

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers,faEnvelope,faInbox,faPlayCircle} from '@fortawesome/free-solid-svg-icons'


import classes from './SideBar.css';
import {
    localConfig,
    set_cookies,
    load_cookies,
    remove_cookies,
    loadAll_cookies
} from '../../utils/SessionManager';

import Backdrop from './UI/Backdrop/Backdrop';

const SideBar = (props) => {

    library.add(faUsers,faEnvelope,faInbox,faPlayCircle);
    const [showSideDrawer, setshowSideDrawer] = useState(false);

    let attachClasses = [classes.SideDrawer, classes.Close];
    if (showSideDrawer) {
        attachClasses = [classes.SideDrawer, classes.Open];
    }

    const handleDrawerOpen = () => {
        setshowSideDrawer(!showSideDrawer);
    };

    const handleDrawerClose = () => {
        setshowSideDrawer(false);
    };

    const logoutHandler = () => {
        props.onLogout();
    };

    let list = null;
    // if (props.user_type === 'mobile') {
    if (load_cookies("Sidebar2.js", localConfig.user_type, false) === 'mobile') {
        list = (
            <List>
                <Link to="/notification" style={{textDecoration: "none"}}>
                    <div className={classes.ListItems}>
                        <FontAwesomeIcon icon="inbox" size="1x" transform="down-5 grow-7.5" style={{color: '#333333'}}/>
                        <p style={{color: "#333333"}}>Notifications</p>
                    </div>
                </Link>

                <Link to="/stationary-pointer" style={{textDecoration: "none"}}>
                    <div className={classes.ListItems}>
                        <FontAwesomeIcon icon="play-circle" size="1x" transform="down-5 grow-7.5" style={{color: '#333333'}}/>
                        <p style={{color: "#333333"}}>Playlist</p>
                    </div>
                </Link>

                <Link to="/queries" style={{textDecoration: "none"}}>
                    <div className={classes.ListItems}>
                        <FontAwesomeIcon icon="envelope" size="1x" transform="down-5 grow-7.5" style={{color: '#333333'}}/>
                        <p style={{color: "#333333"}}>Queries</p>
                    </div>
                </Link>
            </List>
        )
    } else if (load_cookies("Sidebar2.js", localConfig.user_type, false) === 'admin') {
        list = (
            <List>
                <Link to="/notification" style={{textDecoration: "none"}}>
                    <div className={classes.ListItems}>
                        <FontAwesomeIcon icon="inbox" size="1x" transform="down-5 grow-7.5" style={{color: '#333333'}}/>
                        <p style={{color: "#333333"}}>Notifications</p>
                    </div>
                </Link>

                <Link to="/queries" style={{textDecoration: "none"}}>
                    <div className={classes.ListItems}>
                        <FontAwesomeIcon icon="envelope" size="1x" transform="down-5 grow-7.5" style={{color: '#333333'}}/>
                        <p style={{color: "#333333"}}>Queries</p>
                    </div>
                </Link>

                <Link to="/users" style={{textDecoration: "none"}}>
                    <div className={classes.ListItems}>
                        <FontAwesomeIcon icon="users" size="1x" transform="down-5 grow-7.5" style={{color: '#333333'}}/>
                        <p style={{color: "#333333"}}>Users</p>
                    </div>
                </Link>
            </List>
        )
    }


    return (
        <div>
            <div className={classes.Toolbar}>
                <div className={classes.DrawerToggle}
                     onClick={handleDrawerOpen}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={classes.Mockloc}>
                    <h2>Mock-Loc</h2>
                </div>
                <div className={classes.logout}>
                    <h2 onClick={logoutHandler}>Logout</h2>
                </div>
            </div>
            {/*<div className={classes.iconBar}>*/}
            {/*    {list}*/}
            {/*</div>*/}
            <Backdrop show={showSideDrawer} clicked={handleDrawerClose}/>
            <div className={attachClasses.join(' ')}
                // onClick={handleDrawerOpen}
            >
                {/*<Backdrop show={showSideDrawer} clicked={handleDrawerClose}/>*/}
                {list}
            </div>

            <main className={classes.content}>

            </main>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        // user: state.auth.Admin_user,
        // authRedirect: state.auth.authRedirect,
        user_type: state.auth.user_type,
        user_token: state.auth.user_token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

