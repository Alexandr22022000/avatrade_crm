import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <input type={'text'} ref={input => {this.loginInput = input}}/>
                <br></br>
                <input type={'text'} ref={input => {this.passInput = input}}/>
                <br></br>
                <button onClick={this.login.bind(this)}>Login</button>
            </div>
        )
    }

    login() {
        if(this.loginInput.value !== '' && this.passInput.value !== '') {
            this.props.onLogin(this.loginInput.value, this.passInput.value);
        }
        this.loginInput.value = '';
        this.passInput.value = '';
    }
}

export default Login;