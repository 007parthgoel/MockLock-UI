import React, {useState} from 'react';
import '../../App.css';
import {Link, Redirect} from "react-router-dom";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {connect} from 'react-redux';
import * as actions from "../../store/actions/v1/Index";

import classes from './SideBar.css';
import {localConfig,
    set_cookies,
    load_cookies,
    remove_cookies,
    loadAll_cookies} from '../../utils/SessionManager';

import Backdrop from './UI/Backdrop';
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import {yellow} from "@material-ui/core/colors";

const SideBar = (props) => {

    const [showSideDrawer, setshowSideDrawer] = useState(false);

    let attachClasses = [classes.SideDrawer, classes.Close];
    if (showSideDrawer) {
        attachClasses = [classes.SideDrawer, classes.Open];
    }

    const handleDrawerOpen = () => {
        setshowSideDrawer(!showSideDrawer);
    };

    // const handleDrawerClose = () => {
    //     setshowSideDrawer(false);
    // };

    const logoutHandler = () => {
        props.onLogout();
    };

    let list = null;
    // if (props.user_type === 'mobile') {
    if (load_cookies("Sidebar2.js",localConfig.user_type,false) === 'mobile') {
        list = (
            <List>
                <Link to="/notification" style={{textDecoration: "none"}}>
                    <ListItem button style={{padding:'3px 0px'}}>
                        <ListItemIcon style={{minWidth:'40px'}}><InboxIcon/> </ListItemIcon>
                        <Typography style={{color: "#333333"}}> Notifications</Typography>
                    </ListItem>
                </Link>

                <Link to="/stationary-pointer" style={{textDecoration: "none"}}>
                    <ListItem button style={{padding:'3px 0px'}}>
                        <ListItemIcon style={{minWidth:'40px'}}><MailIcon/> </ListItemIcon>
                        <Typography style={{color: "#333333"}}> Stationary Pointer</Typography>
                    </ListItem>
                </Link>

                <Link to="/queries" style={{textDecoration: "none"}}>
                    <ListItem button style={{padding:'5px 0px'}}>
                        <ListItemIcon style={{minWidth:'40px'}}><MailIcon/> </ListItemIcon>
                        <Typography style={{color: "#333333"}}> Queries</Typography>
                    </ListItem>
                </Link>
            </List>
        )
    } else if (load_cookies("Sidebar2.js",localConfig.user_type,false) === 'admin') {
        list = (
            <List>
                <Link to="/notification" style={{textDecoration: "none"}} >
                    <ListItem button style={{padding:'0px'}}>
                        <ListItemIcon style={{minWidth:'40px'}}><InboxIcon/> </ListItemIcon>
                        <Typography style={{color: "#333333"}}> Notifications</Typography>
                    </ListItem>
                </Link>

                <Link to="/queries" style={{textDecoration: "none"}}>
                    <ListItem button style={{padding:'0px'}}>
                        <ListItemIcon style={{minWidth:'40px'}}><MailIcon/> </ListItemIcon>
                        <Typography style={{color: "#333333"}}> Queries</Typography>
                    </ListItem>
                </Link>

                <Link to="/users" style={{textDecoration: "none"}}>
                    <ListItem button style={{padding:'0px'}}>
                        <ListItemIcon style={{minWidth:'40px'}}><PermIdentityIcon/> </ListItemIcon>
                        <Typography style={{color: "#333333"}}> Queries</Typography>
                    </ListItem>
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
                <div className={classes.logout}
                     onClick={logoutHandler}>
                    <h2>Logout</h2>
                </div>
            </div>
            {/*<div className={classes.iconBar}>*/}
            {/*    {list}*/}
            {/*</div>*/}
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

