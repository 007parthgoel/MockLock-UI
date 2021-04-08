import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

// import SideBar from "./components/v1/SideBar";
import SideBar from "./components/v1/SideBar2";
import Notification from "./components/v1/Notifications";
import StationaryPointer from "./containers/v1/StationaryPointer/StationaryPointer";
import Users from './containers/v1/Users/Users';
// import Home from "./containers/v1/Home/Home";
import Queries from "./containers/v1/Queries/Queries";
import Auth from './containers/v1/Auth/Auth';
import Playlists from './containers/v1/Playlists/Playlists';
import NewPlaylist from './containers/v1/Playlists/NewPlaylist/NewPlaylist';
import {connect} from "react-redux";
import * as actions from "./store/actions/v1/Index";

import {
    localConfig,
    load_cookies,
    // set_cookies,
    // remove_cookies,
    // loadAll_cookies
} from "./utils/SessionManager";

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {

        let authPath;

        if (load_cookies("App.js", localConfig.user_token, false)) {
            authPath = this.props.user_type === 'mobile' ? (
            // authPath = load_cookies("App.js", localConfig.user_type, false) === 'mobile' ? (
                <Switch>
                    {/*<Route path="/" exact component={Auth}/>*/}
                    {/*<Route path="/home" component={Home}/>*/}
                    <Route path="/notification" component={Notification}/>
                    <Route path="/stationary-pointer" component={StationaryPointer}/>
                    <Route path="/playlists" component={Playlists}/>
                    <Route path="/newPlaylist" component={NewPlaylist}/>
                    <Route path="/queries" component={Queries}/>
                    {/*<Route path="/" exact component={Auth}/>*/}
                    <Redirect to="/notification"/>
                </Switch>
            ) : (
                <Switch>
                    <Route path="/notification" component={Notification}/>
                    <Route path="/stationary-pointer" component={StationaryPointer}/>
                    <Route path="/queries" component={Queries}/>
                    <Route path="/playlists" component={Playlists}/>
                    <Route path="/newPlaylist" component={NewPlaylist}/>
                    <Route path="/users" component={Users}/>
                    {/*<Route path="/users" component={User}/>*/}
                    <Redirect to="/notification"/>
                </Switch>
            );
        } else {
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
//             <Router basename="/v1">
                {/* <div className={classes.App}> */}
                <div>
                    <SideBar/>
                    {authPath}
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        // user: state.auth.Admin_user,
        authRedirect: state.auth.authRedirect,
        user_token: state.auth.user_token,
        user_type: state.auth.user_type,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
        // onSessionRefresh: (details) => dispatch(actions.adminLoginSuccess(details)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

