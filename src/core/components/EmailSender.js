import React, {Component} from 'react';
import '../styles/LoginPage.css';
import {getTokenFromUrl} from "../HTTPS/getTokenFromUrl";
import getCleanUrl from "../HTTPS/getCleanUrl";

class EmailSender extends Component {
    state = {
        dataValid: null
    };

    emailInputMsg() {
        const style = window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1 ?
            {form: 'LoginForm-d LoginFormColors', logoHolder: 'logoHolder logoHolder-d'} :
            {form: 'LoginForm-t LoginFormColors', logoHolder: 'logoHolder-t logoHolder'};
        return (
            <div>
                <div className={style.logoHolder}>
                </div>
                <div className={style.form}>
                    <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '0'}}>
                        Смена пароля
                    </div>
                    <div className={'inputHolder'}>
                        <label>Email</label>
                        <br/>
                        <div><input type={'password'} ref={(input) => {this.emailInput = input}} placeholder={'password'}/></div>
                    </div>
                    {this.state.dataValid === false?
                        <div style={{height:'30px'}}/>:
                        <div style={{fontSize: '22px', textAlign: 'center', color:'#FF0000'}}>
                            Неверный email
                        </div>}
                    <div id={'func-holder'}
                         className={'LoginForm-func'}
                    >
                        <button className={'btn-m'}
                                onClick={()=>{this.sendEmail()}}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    emailSendedMsg() {
        const style = window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1 ?
            {form: 'LoginForm-d LoginFormColors', logoHolder: 'logoHolder logoHolder-d'} :
            {form: 'LoginForm-t LoginFormColors', logoHolder: 'logoHolder-t logoHolder'};
        return (
            <div>
                <div className={style.logoHolder}>
                </div>
                <div className={style.form}>
                    Перейдите по ссылке, отправленной на почту
                </div>
            </div>
        )
    }

    render() {

        return(
            <div>
                {this.state.dataValid === null ?
                    this.emailInputMsg():
                    this.emailSendedMsg()
                }
            </div>
        )
    }

    sendEmail() {
        let token = getTokenFromUrl();
        if(this.emailInput.value || /[^\s]+/.test(this.emailInput.value)) {
            console.log('token: ', token);
            console.log('passInput: ', this.emailInput.value);
            this.props.onSendEmail(token,this.emailInput.value);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.reqStatus) {
            this.setState({dataValid: true});
            document.location.href = getCleanUrl() + '/login';
        } else if(nextProps.errorStatus !== null) {
            console.log(nextProps.errorStatus);
            this.setState({dataValid: false});
        }
        return true
    }
}

export default EmailSender;