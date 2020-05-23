import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link,Redirect} from "react-router-dom"

import classes from './Users.css'
import UserList from '../../../components/v1/UserList/UserList';
import * as actions from '../../../store/actions/v1/Index';

class Users extends Component {

    componentDidMount() {
        this.props.onFetchAllUsers();
    }

    stnPointBtnClickHandler=(id)=>{
        this.props.onStnPointBtnClick(id);
        // <Redirect to="/stationary-pointer"/>
    };


    render() {

        const userList = this.props.usersList.map(user => (
            <UserList userDetails={user}
                      stnPointButtonClicked={(_id)=>this.stnPointBtnClickHandler(_id)}/>
        ));


        return (

            <div className={classes.UserPage}>
                <div>
                    {userList}
                </div>
            </div>
        )
            ;
    }
}

const mapStateToProps = state => {
    return {
        usersList: state.usersList.Users_list,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllUsers: () => dispatch(actions.initAllUsersList()),
        onStnPointBtnClick:(id)=>dispatch(actions.intiStationaryPointsbyID_FOR_ADMIN(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);