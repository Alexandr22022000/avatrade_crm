import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setToken from "../cookie/setToken";

class Login extends Component {
    render() {
        return (
            <div>
                <input type={'text'} ref={input => {this.loginInput = input}}/>
                <br/>
                <input type={'text'} ref={input => {this.passInput = input}}/>
                <br/>
                <button onClick={this.login.bind(this)}>Login</button>
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate login' ,nextProps.loginInfo.loginRequestSuccessful);
        if(nextProps.loginInfo.loginRequestSuccessful === true) {
            setToken(nextProps.loginInfo.token);
            console.log(`cookies: ${document.cookie}`);
            this.context.router.history.push('/');
            return false;
        }
        return true;
    }

    login() {
        if(this.loginInput.value !== '' && this.passInput.value !== '') {
            this.props.onLogin(this.loginInput.value, this.passInput.value);
        }
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Login;