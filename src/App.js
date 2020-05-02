import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideBar from "./components/v1/SideBar";
import Notification from "./components/v1/Notifications";
import StationaryPointer from "./components/v1/StationaryPointer";
import Home from "./containers/v1/Home/Home";
import Queries from "./containers/v1/Queries/Queries";

// import classes from './App.css';

function App() {
  return (
   <Router>
       {/* <div className={classes.App}> */}
       <div>
           <SideBar/>
           <Switch >
               <Route path="/" exact component={Home}/>
               <Route path="/notification"  component={Notification}/>
               <Route path="/stationary-pointer"  component={StationaryPointer}/>
               <Route path="/queries"  component={Queries}/>
           </Switch>
       </div>
   </Router>
  );
}

export default App;
