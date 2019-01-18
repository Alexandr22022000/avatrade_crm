import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getToken from "../cookie/getToken";

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
        console.log(nextProps.loginInfo);
        if(nextProps.loginInfo.loginSuccessful === false) {
            this.context.router.history.push('/test');
            return false;
        }
        return true;
    }

    componentWillMount() {
        let token = getToken();
        if(token !== 'none') {

        }

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