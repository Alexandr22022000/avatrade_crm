import React, { Component } from "react";
import getToken from "../cookie/getToken";
import PropTypes from "prop-types";
import "../styles/NavBar.css";
import "../styles/buttons.css";
import { PERMISSIONS } from "../constants";
import getCleanUrl from "../HTTPS/getCleanUrl";

class NavBar extends Component {
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

    let buttons = {};
    if (this.props.tokenInfo.permissions !== null) {
      for (let perm in this.props.tokenInfo.permissions) {
        switch (this.props.tokenInfo.permissions[perm]) {
          case PERMISSIONS.OWNER:
          case PERMISSIONS.TOP_MANAGER:
            buttons["planning"] = {
              name: "планинг",
              isActive: false,
              route: "planning"
            };
            buttons["warehouse"] = {
              name: "склад",
              isActive: false,
              route: "warehouse"
            };
            buttons["turnovers"] = {
              name: "обороты",
              isActive: false,
              route: "turnovers"
            };
            buttons["events"] = {
              name: "движуха",
              isActive: false,
              route: "events"
            };
            buttons["stuff"] = {
              name: "персонал",
              isActive: false,
              route: "stuff"
            };
            buttons["cabinet"] = {
              name: "кабинет",
              isActive: false,
              route: "cabinet"
            };
            buttons["prices"] = {
              name: "прайс",
              isActive: false,
              route: "prices"
            };
            break;
          case PERMISSIONS.STORE_MANAGER:
            buttons["cash"] = {
              name: "касса",
              isActive: false,
              route: "cash"
            };
            buttons["warehouse"] = {
              name: "склад",
              isActive: false,
              route: "warehouse"
            };
            buttons["planning"] = {
              name: "планинг",
              isActive: false,
              route: "planning"
            };
            buttons["cabinet"] = {
              name: "кабинет",
              isActive: false,
              route: "cabinet"
            };
            buttons["contacts"] = {
              name: "контакты",
              isActive: false,
              route: "contacts"
            };
            buttons["prices"] = {
              name: "прайс",
              isActive: false,
              route: "prices"
            };
            break;
          case PERMISSIONS.WAREHOUSE_MANAGER:
            buttons["planning"] = {
              name: "планинг",
              isActive: false,
              route: "planning"
            };
            buttons["warehouse"] = {
              name: "склад",
              isActive: false,
              route: "warehouse"
            };
            buttons["cabinet"] = {
              name: "кабинет",
              isActive: false,
              route: "cabinet"
            };
            buttons["contacts"] = {
              name: "контакты",
              isActive: false,
              route: "contacts"
            };
            buttons["prices"] = {
              name: "прайс",
              isActive: false,
              route: "prices"
            };
            break;
          default:
            break;
        }
      }
    }
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
        {this.props.tokenInfo.token === null ? (
          <div />
        ) : (
          <div id={"children"}>{this.props.children}</div>
        )}
      </div>
    );
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
