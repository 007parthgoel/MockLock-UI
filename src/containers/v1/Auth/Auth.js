import React, {Component} from 'react';
import {connect} from 'react-redux';
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
        this.setState({password:""});
    };

    render() {

        let error;
        if(this.props.error) {
            // this.setState({password:""});
            error=(<p className={classes.loginError}>Invalid Username and Password</p>);
        }
        else {error=null;}

        return (
            <div className={classes.Auth}>
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
                {error}
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
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandler: (details) => dispatch(actions.initAdminLogin(details)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);