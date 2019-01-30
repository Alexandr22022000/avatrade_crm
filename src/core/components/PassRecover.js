import React, {Component} from 'react';
import '../styles/LoginPage.css';
import {getTokenFromUrl} from "../HTTPS/getTokenFromUrl";
import getCleanUrl from "../HTTPS/getCleanUrl";

class PassRecover extends Component{
    dataValid = true;
    render() {
        const style = window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1 ?
            {form: 'LoginForm-d LoginFormColors', logoHolder: 'logoHolder logoHolder-d'} :
            {form: 'LoginForm-t LoginFormColors', logoHolder: 'logoHolder-t logoHolder'};
        return(
            <div>
                <div className={style.logoHolder}>
                </div>
                <div className={style.form}>
                    <div style={{textAlign: 'center', fontSize: '30px', marginBottom: '0'}}>
                        Создание пароля
                    </div>
                    <div className={'inputHolder'}>
                        <label>Пароль</label>
                        <br/>
                        <div><input type={'password'} ref={(input) => {this.passInput = input}} placeholder={'password'}/></div>
                    </div>
                    <div id={'func-holder'}
                         className={'LoginForm-func'}
                    >
                        <button className={'btn-m'}
                                onClick={()=>{this.sendPass()}}
                        >
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    sendPass() {
        let token = getTokenFromUrl();
        if(this.passInput.value || /[^\s]+/.test(this.passInput.value)) {
            console.log('token: ', token);
            console.log('passInput: ', this.passInput.value);
            this.props.onSendPassword(token,this.passInput.value);
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.reqStatus) {
            this.dataValid = true;
            document.location.href = getCleanUrl() + '/login';
        } else if(nextProps.errorStatus !== null) {
            this.dataValid = false;
        }
    }
}

export default PassRecover;