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

// import classes from './App.css';

function App(props) {
    // let authRedirectPath = props.user ? (
    //     <Switch>
    //         <Route path="/home" component={Home}/>
    //         <Route path="/notification" component={Notification}/>
    //         <Route path="/stationary-pointer" component={StationaryPointer}/>
    //         <Route path="/queries" component={Queries}/>
    //         <Route path="/" exact component={Auth}/>
    //     </Switch>
    // ) : (
    //     <switch>
    //         <Route path="/" exact component={Auth}/>
    //         <Redirect to="/"/>
    //     </switch>
    // );

    let authRedirectPath = (
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/notification" component={Notification}/>
            <Route path="/stationary-pointer" component={StationaryPointer}/>
            <Route path="/queries" component={Queries}/>
            <Route path="/" exact component={Auth}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (Object.keys(props.user).length != 0) {
        authRedirectPath = (
            <Switch>
                {/*<Route path="/" exact component={Auth}/>*/}
                <Route path="/home" component={Home}/>
                <Route path="/notification" component={Notification}/>
                <Route path="/stationary-pointer" component={StationaryPointer}/>
                <Route path="/queries" component={Queries}/>
                <Redirect to="/home"/>
            </Switch>
        );
    }
    ;

    if (Object.keys(props.user).length == 0) {
        authRedirectPath = (
            <switch>
                <Route path="/" exact component={Auth}/>
                <Redirect to="/"/>
            </switch>);
    }

    return (
        <Router>
            {/* <div className={classes.App}> */}
            <div>
                <SideBar/>
                {authRedirectPath}
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
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

