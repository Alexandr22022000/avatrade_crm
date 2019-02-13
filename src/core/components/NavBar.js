import React, { Component } from "react";
import getToken from "../cookie/getToken";
import PropTypes from "prop-types";
import "../styles/NavBar.css";
import "../styles/buttons.css";
import getCleanUrl from "../HTTPS/getCleanUrl";
import getButtonsInfo from "../constants/getButtonsInfo";
import AlertsBox from "./AlertsBox";
import MigrateDetails from "../containers/MigrateDetails";

class NavBar extends Component {
  state = {
    showAlerts: false,
    showMigrateDetails: false,
  };
  render() {
    const style = {
      holder: "",
      imgHolder: "imgHolder",
      buttons: "btn-m"
    };
    style.holder =
      window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1
        ? "MainPageHolder-d"
        : "MainPageHolder-t";

    let buttons = getButtonsInfo(this.props.tokenInfo.permissions);

    let buttonsArray = [];
    for (let key in buttons) {
      if (
        "/" + buttons[key].route ===
        this.context.router.history.location.pathname
      ) {
        buttons[key].isActive = true;
      }
      buttonsArray.push(buttons[key]);
    }
    return (
      <div>
        <div className={style.holder}>
          <div className={style.imgHolder} />
          <div id={"buttons"} style={{ display: "inline-block" }}>
            {buttonsArray.map((value, index) => {
              if (!value.isActive) {
                return (
                  <button
                    key={index}
                    className={`${style.buttons} ${
                      value.isActive ? "checked" : ""
                    }`}
                    onClick={e => {
                      this.context.router.history.push(value.route);
                    }}
                    style={{ paddingBottom: "17px", paddingTop: "15px" }}
                  >
                    {value.name}
                  </button>
                );
              } else {
                return (
                  <button
                    key={index}
                    className={`${style.buttons} ${
                      value.isActive ? "checked" : ""
                    }`}
                    onClick={e => {
                      this.context.router.history.push(value.route);
                    }}
                    style={{ paddingBottom: "0px", paddingTop: "15px" }}
                  >
                    {value.name}
                    <hr color={"#9c00b8"} />
                  </button>
                );
              }
            })}
          </div>
          <button
            className={"btn-m " + style.buttons}
            id={"exitButton"}
            onClick={() => {
              this.clearCookies();
              document.location.href = getCleanUrl() + "/login";
            }}
          >
            Выйти
          </button>
        </div>
        <div id={'alerts'}>
          <div className={`alert-icon`} onClick={() => {this.showAlertBox()}}/>
          <div className={'alert-box'}>{this.getAlertsBox()}</div>
        </div>
        {this.props.tokenInfo.token === null ? (
          <div/>
        ) : (
          <div id={"children"}>{this.props.children}</div>
        )}
        {!this.state.showMigrateDetails ? '' : (
            <MigrateDetails onClose={() => {
              this.setState({showMigrateDetails: false});
            }} />
        )}
      </div>
    );
  }

  showAlertBox(){
    this.setState({showAlerts: true});
    this.props.onLoadCargos();
    this.props.onLoadMigrates();
  }

  getAlertsBox(){
    return <AlertsBox onClose={()=> {this.setState({showAlerts: false})}}
                      onShowMigrate={(index) => {
                        this.props.setActiveMigrate(this.props.migrates[index]);
                        this.setState({showMigrateDetails: true});
                      }}
                      migrates={this.props.migrates}
                      cargos={this.props.cargos}
                      closed={!this.state.showAlerts}
    />
  }


  clearCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  componentDidMount() {
    if (this.props.tokenInfo.permissions === null) {
      let token = getToken();
      if (token === null) {
        this.context.router.history.push("/login");
      }
      this.props.onTokenDispatch(token);
      this.props.onPermissionsGet(token);
    }
  }
}

NavBar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NavBar;
