import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './Auth.css'
import * as actions from '../../../store/actions/v1/Index';

class Auth extends Component {
    state = {
        email: "",
        password: ""
    };

    emailChangeHandler = (event) => {
        this.setState({email: event.target.value});
    };

    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value});
    };

    formSubmitHandler = () => {
        const details = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.onSubmitHandler(details);
        // console.log(this.props.user);
    };

    render() {

        let authRedirect = null;
        if (this.props.user) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <input
                    type={"text"}
                    value={this.state.email}
                    placeholder={"Email"}
                    className={classes.Email}
                    autoFocus={true}
                    onChange={(event) => this.emailChangeHandler(event)}/>
                <input
                    type={"password"}
                    value={this.state.password}
                    placeholder={"Password"}
                    className={classes.Password}
                    onChange={(event) => this.passwordChangeHandler(event)}/>
                <button
                    className={classes.button}
                    onClick={this.formSubmitHandler}>Submit
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.Admin_user,
        authRedirect: state.auth.authRedirect,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandler: (details) => dispatch(actions.initAdminLogin(details)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);