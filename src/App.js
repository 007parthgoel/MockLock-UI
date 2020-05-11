import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SideBar from "./components/v1/SideBar";
import Notification from "./components/v1/Notifications";
import StationaryPointer from "./containers/v1/StationaryPointer/StationaryPointer";
import Home from "./containers/v1/Home/Home";
import Queries from "./containers/v1/Queries/Queries";
import Auth from './containers/v1/Auth/Auth';
import {connect} from "react-redux";
import {get_localStorage,localStorageConfig} from './utils/SessionManager';
import * as actions from "./store/actions/v1/Index";

// import classes from './App.css';

function App(props) {

    // console.log(localStorage.getItem("is_Login"));
    // if(get_localStorage("App.js",localStorageConfig.is_login)===true){
    //     props.onSessionRefresh(JSON.parse(get_localStorage("App.js",localStorageConfig.Admin_user)));
    //     console.log(JSON.parse(get_localStorage("App.js",localStorageConfig.Admin_user)));
    // }

    let authPath = (
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/notification" component={Notification}/>
            <Route path="/stationary-pointer" component={StationaryPointer}/>
            <Route path="/queries" component={Queries}/>
            <Route path="/" exact component={Auth}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (Object.keys(props.user).length !== 0) {
    // if (get_localStorage("App.js",localStorageConfig.is_login)===true) {
        authPath = props.user.user_type==='mobile' ? (
            <Switch>
                {/*<Route path="/" exact component={Auth}/>*/}
                {/*<Route path="/home" component={Home}/>*/}
                <Route path="/notification" component={Notification}/>
                <Route path="/stationary-pointer" component={StationaryPointer}/>
                <Route path="/queries" component={Queries}/>
                {/*<Route path="/" exact component={Auth}/>*/}
                <Redirect to="/notification"/>
            </Switch>
        ) : (
            <Switch>
                <Route path="/notification" component={Notification}/>
                <Route path="/stationary-pointer" component={StationaryPointer}/>
                <Route path="/queries" component={Queries}/>
                {/*<Route path="/users" component={User}/>*/}
                <Redirect to="/notification"/>
            </Switch>
        );
    }
    else
    {
        // if (Object.keys(LoginUser).length === 0) {
        authPath = (
            <Switch>
                <Route path="/" exact component={Auth}/>
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <Router>
            {/* <div className={classes.App}> */}
            <div>
                <SideBar/>
                {authPath}
            </div>
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.Admin_user,
        authRedirect: state.auth.authRedirect,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onSessionRefresh: (details) => dispatch(actions.adminLoginSuccess(details)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

