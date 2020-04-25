import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideBar from "./components/SideBar";
import Notification from "./components/Notifications";
import StationaryPointer from "./components/StationaryPointer";
import Home from "./containers/Home/Home";
import Queries from "./containers/Queries/Queries";

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
