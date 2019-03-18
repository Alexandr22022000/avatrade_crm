import React, { Component } from "react";
import getToken from "../cookie/getToken";
import getStore from "../cookie/getStore";
import PropTypes from "prop-types";
import "../styles/NavBar.css";
import "../styles/buttons.css";
import getCleanUrl from "../HTTPS/getCleanUrl";
import getButtonsInfo from "../constants/getButtonsInfo";
import AlertBoxWrapper from "../../alerts/containers/AlertBoxWrapper";
import clearCookies from "../cookie/clearCookies";
import CashboxStorePrompt from "../containers/CashboxStorePrompt";

class NavBar extends Component {

    state = {
        showStorePrompt: false,
    };

    render() {
        const style = {
            holder: "",
            imgHolder: "imgHolder",
            buttons: "btn-m navbar-btn"
        };
        style.holder =
            window.navigator.userAgent.toLocaleLowerCase().indexOf("android") === -1
                ? "MainPageHolder-d"
                : "MainPageHolder-t";

        let buttons = getButtonsInfo(this.props.tokenInfo.permissions);

        let store = 'Нет';
        if (this.props.storeId !== null) {
            for (let key in this.props.stores) {
                if (+this.props.stores[key].id === +this.props.storeId) {
                    store = this.props.stores[key].name;
                    break;
                }
            }
        }
        store = "Подразделение: " + store;

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
                    <div className={'navbar-curStore'}>
                        {store}<br/>
                        {store}
                    </div>
                    <button
                        className={"navbar-chngStore"}
                        style={{boxShadow:'none'}}
                        onClick={() => this.setState({showStorePrompt: true})}
                    >
                        Сменить подразделение
                    </button>
                    <button
                        className={"btn-m " + style.buttons}
                        id={"exitButton"}
                        onClick={() => {
                            clearCookies();
                            document.location.href = getCleanUrl() + "/login";
                        }}
                    >
                        Выйти
                    </button>
                </div>
                <AlertBoxWrapper/>

                {this.props.tokenInfo.token === null ? (
                    <div />
                ) : (
                    <div id={"children"}>{this.props.children}</div>
                )}

                {this.state.showStorePrompt?
                    <CashboxStorePrompt onClose={() => this.setState({showStorePrompt: false})}/>
                    :''
                }
            </div>
        );
    }

    componentDidMount() {
        if (this.props.tokenInfo.permissions === null) {
            let token = getToken();
            if (token === '') {
                this.context.router.history.push("/login");
            }
            this.props.onTokenDispatch(token);
            this.props.onPermissionsGet(token);
        }

        this.props.onGetStores();
        if (this.props.storeId === null) {
            let storeId = getStore();
            if (storeId === '') {
                this.setState({showStorePrompt: true})
            }
            else {
                this.props.onSetStoreId(+storeId);
            }
        }
    }
}

NavBar.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NavBar;
