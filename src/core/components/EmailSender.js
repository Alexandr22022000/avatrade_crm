import React, { Component } from "react";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

class EmailSender extends Component {
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

    if (this.props.requestSuccess) {
      return (
        <div>
          <div className={style.logoHolder} />
          <div className={style.form}>
            <div
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginBottom: "0"
              }}
            >
              Перейдите по ссылке, отправленной на почту
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={style.logoHolder} />
        <div className={style.form}>
          <div
            style={{ textAlign: "center", fontSize: "30px", marginBottom: "0" }}
          >
            Востоновить пароль
          </div>
          <div className={"inputHolder"}>
            <label>Email</label>
            <br />
            <div>
              <input
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder={"email"}
                onKeyDown={this.onEnter.bind(this)}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: "18px",
              textAlign: "center",
              color: "#FF0000",
              height: "30px"
            }}
          >
            {this.props.loginError}
          </div>
          <div id={"func-holder"} className={"LoginForm-func"}>
            <button className={"btn-m blue-button"} onClick={this.sendEmail.bind(this)}>
              Востоновить
            </button>
            <br />
            <Link onClick={() => this.props.cleanErrors()} to={"/login"}>
              <span className={"link-decor"}>Вход</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.setState({
      email: ""
    });
  }

  sendEmail() {
    this.props.onSendEmail(this.state.email);
  }

  onEnter(e) {
    if (e.keyCode === 13) {
      this.sendEmail();
    }
  }
}

export default EmailSender;
