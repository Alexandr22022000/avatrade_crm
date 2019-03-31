import React, {Component} from 'react';
import PropTypes from 'prop-types';
import setToken from "../cookie/setToken";
import '../styles/LoginPage.css';
import {Link} from "react-router-dom";
import Form from "./Form";

class Login extends Component {
    render() {
        const style = window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1 ?
            {form: 'LoginForm-d LoginFormColors', logoHolder: 'logoHolder logoHolder-d'} :
            {form: 'LoginForm-t LoginFormColors', logoHolder: 'logoHolder-t logoHolder'};
        return (
            <div>
                <Form logoClassName={style.logoHolder}
                      formClassName={style.form}
                >
                    <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '0'}}>
                        Вход
                    </div>
                    <div className={'inputHolder'}>
                        <label>Email</label>
                        <br/>
                        <div><input placeholder={'email'}
                                    value={this.state.login}
                                    onChange={e => this.setState({login: e.target.value})}
                        /></div>

                    </div>
                    <div className={'inputHolder'}>
                        <label>Password</label>
                        <br/>
                        <div><input
                            type={'password'}
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                            placeholder={'password'}
                            onKeyDown={this.onEnter.bind(this)}
                        /></div>
                    </div>
                    <div style={{fontSize: '18px', textAlign: 'center', color:'#FF0000', height:'30px'}}>
                        {this.props.loginInfo.loginError}
                    </div>
                    <div id={'func-holder'} className={'LoginForm-func'}>
                        <button className={'btn-m blue-button'} onClick={this.login.bind(this)}>
                            Войти
                        </button>
                        <br/>
                        <Link onClick={() => this.props.cleanErrors()} to={'/start_recover_password'}>
                            <span className={'link-decor'}>Забыли пароль?</span>
                        </Link>
                    </div>
                </Form>
            </div>
        )
    }

    componentWillMount() {
        this.setState({
            password:"",
            login:"",
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.loginInfo.requestSuccess === true) {
            setToken(nextProps.loginInfo.token);
            this.context.router.history.push('/');
            return false;
        }
        return true;
    }

    login() {
        this.props.cleanErrors();
        if (this.state.login.trim() !== '' && this.state.password.trim() !== '') {
            this.props.onLogin(this.state.login, this.state.password);
        }
    }

    onEnter (e) {
        if (e.keyCode === 13) {
            this.login();
        }
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Login;