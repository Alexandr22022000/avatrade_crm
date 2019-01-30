import React, {Component} from 'react';
import setToken from "../cookie/setToken";
import '../styles/LoginPage.css';

class PassRecover extends Component{
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
                        <div><input ref={(input) => {this.loginInput = input}} placeholder={'password'}/></div>
                    </div>
                    <div id={'func-holder'}
                         className={'LoginForm-func'}
                    >
                        <button className={'btn-m'}
                                onClick={()=>{}}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        )
    }


}

export default PassRecover;