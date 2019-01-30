import React, { Component } from "react";
import PropTypes from "prop-types";
import setToken from "../cookie/setToken";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

class Login extends Component {
  dataValid = true;

  render() {
    const style =
      window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1
        ? {
            form: "LoginForm-d LoginFormColors",
            logoHolder: "logoHolder logoHolder-d"
          }
        : {
            form: "LoginForm-t LoginFormColors",
            logoHolder: "logoHolder-t logoHolder"
          };
    return (
      <div>
        <div className={style.logoHolder} />
        <div className={style.form}>
          <div
            style={{ textAlign: "center", fontSize: "30px", marginBottom: "0" }}
          >
            Вход
          </div>
          <div className={"inputHolder"}>
            <label>Email</label>
            <br />
            <div>
              <input
                ref={input => {
                  this.loginInput = input;
                }}
                placeholder={"email"}
              />
            </div>
          </div>
          <div className={"inputHolder"}>
            <label>Password</label>
            <br />
            <div>
              <input
                type={"password"}
                ref={input => {
                  this.passInput = input;
                }}
                placeholder={"password"}
              />
            </div>
          </div>
          {this.dataValid ? (
            <div style={{ height: "30px" }} />
          ) : (
            <div
              style={{
                fontSize: "22px",
                textAlign: "center",
                color: "#FF0000"
              }}
            >
              Неверный логин или пароль
            </div>
          )}
          <div id={"func-holder"} className={"LoginForm-func"}>
            <button className={"btn-m blue-button"} onClick={this.login.bind(this)}>
              Войти
            </button>
            <br />
            <Link to={"/start_recover_password"}>
              <span className={'link-decor'}>Забыли пароль?</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(
      "shouldComponentUpdate login",
      nextProps.loginInfo.requestSuccessful
    );
    if (nextProps.loginInfo.requestSuccessful === true) {
      this.dataValid = true;
      setToken(nextProps.loginInfo.token);
      this.context.router.history.push("/");
      return false;
    } else {
      this.dataValid = false;
    }
    return true;
  }

  login() {
    console.log({ val: this.loginInput, val1: this.passInput });
    if (this.loginInput.value !== "" && this.passInput.value !== "") {
      this.props.onLogin(this.loginInput.value, this.passInput.value);
    }
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Login;
