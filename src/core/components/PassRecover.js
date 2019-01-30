import React, {Component} from 'react';
import '../styles/LoginPage.css';
import {getTokenFromUrl} from "../HTTPS/getTokenFromUrl";
import {Link} from "react-router-dom";

class PassRecover extends Component{
    render() {
        const style = window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1 ?
            {form: 'LoginForm-d LoginFormColors', logoHolder: 'logoHolder logoHolder-d'} :
            {form: 'LoginForm-t LoginFormColors', logoHolder: 'logoHolder-t logoHolder'};

        if (this.props.requestSuccess) {
            return (
                <div>
                    <div>
                        <div className={style.logoHolder}>
                        </div>
                        <div className={style.form}>
                            <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '0'}}>
                                Пароль успешно изменен
                            </div>
                            <div id={'func-holder'} className={'LoginForm-func'}>
                                <Link onClick={() => this.props.cleanErrors()} to={'/login'}>
                                    <button className={'btn-m blue-button'}>
                                        Перейти к входу
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return(
            <div>
                <div>
                    <div className={style.logoHolder}>
                    </div>
                    <div className={style.form}>
                        <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '0'}}>
                            Задать новый пароль
                        </div>
                        <div className={'inputHolder'}>
                            <label>Пароль:</label>
                            <br/>
                            <div><input value={this.state.password1} onChange={(e) => this.setState({password1: e.target.value})} placeholder={'password'}/></div>

                        </div>
                        <div className={'inputHolder'}>
                            <label>Повторить пароль:</label>
                            <br/>
                            <div>
                                <input
                                    type={'password'}
                                    value={this.state.password2}
                                    onChange={(e) => this.setState({password2: e.target.value})}
                                    placeholder={'password'}
                                    onKeyDown={this.onEnter.bind(this)}/>
                            </div>
                        </div>
                        <div style={{fontSize: '18px', textAlign: 'center', color:'#FF0000', height:'30px'}}>
                            {this.props.loginError}
                        </div>
                        <div id={'func-holder'} className={'LoginForm-func'}>
                            <button className={'btn-m blue-button'} onClick={this.sendPass.bind(this)}>
                                Задать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount () {
        this.setState({
            password1: "",
            password2: "",
        });
    }

    sendPass() {
        this.props.cleanErrors();

        if (this.state.password1 !== this.state.password2) {
            this.props.setError("Пароли не совпадают");
            return;
        }

        if (this.state.password1.trim() === '') {
            this.props.setError("Пароль не может быть пустым");
            return;
        }

        let token = getTokenFromUrl();
        this.props.onSendPassword(token, this.state.password2);
    }

    onEnter (e) {
        if (e.keyCode === 13) {
            this.sendPass();
        }
    }
}

export default PassRecover;