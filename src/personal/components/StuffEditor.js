import React, { Component } from "react";
import "../../core/styles/buttons.css";
import "../styles/Stuff.css";
import { PERMISSIONS_TEXT, PERMISSIONS } from "../../core/constants";
import cross from "../../images/cross-icon.png";
import StuffInput from "./StuffInput";
import MultiInput from "./MultiInput";

class StuffEditor extends Component {
  render() {
    const permissions = this.createPermissions();

    let editor = "";
    if (this.props.currentUser) {
      const isNew = !this.props.currentUser.id,
        onlyRead = !this.canEdit();

      editor = (
        <div>
          <StuffInput
            title={"ФИО:"}
            value={this.props.currentUser.name}
            onChange={v => this.updateUserData(v, "name")}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />

          <StuffInput
            title={"Email:"}
            link={"mailto:" + this.props.currentUser.email}
            value={this.props.currentUser.email}
            onChange={v => this.updateUserData(v, "email")}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />

          <StuffInput
            title={"Телефон:"}
            link={"tel:" + this.props.currentUser.phone}
            value={this.props.currentUser.phone}
            onChange={v => this.updateUserData(v, "phone")}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />

          <StuffInput
            title={"VK:"}
            link={this.props.currentUser.vk}
            value={this.props.currentUser.vk}
            onChange={v => this.updateUserData(v, "vk")}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />

          <StuffInput
            title={"Адресс:"}
            value={this.props.currentUser.address}
            onChange={v => this.updateUserData(v, "address")}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />

          <StuffInput
            title={"Ранг:"}
            value={
              this.listProcessorVales(
                [this.props.currentUser.rank],
                this.props.ranks
              )[0]
            }
            onChange={v =>
              this.updateUserData(
                this.listProcessorWriter([v], this.props.ranks)[0],
                "rank"
              )
            }
            options={this.props.ranks.map(v => v.name)}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />

          <MultiInput
            title={"Должность:"}
            values={this.listProcessorVales(
              this.props.currentUser.permissions,
              permissions
            )}
            onChange={v =>
              this.updateUserData(
                this.listProcessorWriter(v, permissions),
                "permissions"
              )
            }
            options={permissions.map(v => v.name)}
            onlyRead={onlyRead}
          />

          <MultiInput
            title={"Документы:"}
            values={this.props.currentUser.docs}
            onChange={v => this.updateUserData(v, "docs")}
            onlyRead={onlyRead}
          />
        </div>
      );
    }

    return (
      <div className={"modalHolder"} onClick={() => this.onClose(false)}>
        <div
          className={"borders"}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div id={"cross"}>
            <img
              src={cross}
              onClick={() => this.onClose(false)}
              alt={"cross"}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={"modal"}>{editor}</div>
          <div className={"saveButtonHolder"}>
              {!this.props.currentUser || this.isOwner() ? "" :
                  <div className={"inline sackButton link-decor pointed"} onClick={() => this.onChangeUserStatus()}>{this.props.currentUser.status === 0 ? "Уволить" : "Востоновить"}</div>
              }
              <button className={"btn-m inline blue-button"} onClick={() => this.onClose(true)}>Сохранить</button>
          </div>
        </div>
      </div>
    );
  }

  onChangeUserStatus() {
      if (!window.confirm("Вы уверены?")) return;
      this.props.delCurrentUser();
      this.props.onClose();
      this.props.changeCurrentUserStatus(this.props.currentUser.status === 0 ? 1 : 0 , this.props.currentUser.id);
  }

    updateUserData (value, name) {
        this.changed = true;
        this.props.updateUserData(value, name);
    }

  onClose(isSave) {
    if (this.changed && !isSave && !window.confirm("Вы уверены? Все не сохраненые изменения будут потеряны!")) return;

    if (isSave && this.props.currentUser) {
      console.log(this.props.currentUser);
      if (this.props.currentUser.id) {
        this.props.updateUser(this.props.currentUser);
      } else {
        this.props.onAddNewUser(this.props.currentUser);
      }
    }

    this.props.delCurrentUser();
    this.props.onClose();
  }

  createPermissions() {
    if (!this.props.currentUser) return;

    const permissions = [...PERMISSIONS_TEXT];

    if (!this.isOwner()) {
      for (let key in permissions) {
        if (permissions[key].id === PERMISSIONS.OWNER) {
          permissions.splice(key, 1);
          break;
        }
      }
    }

    return permissions;
  }

  canEdit() {
    if (!this.isOwner()) return true;

    let can = false;
    this.props.permissions.map(permission => {
      if (permission === PERMISSIONS.OWNER) can = true;
    });

    return can;
  }

  isOwner() {
    let isOwner = false;
    this.props.currentUser.permissions.map(permission => {
      if (permission === PERMISSIONS.OWNER) isOwner = true;
    });

    return isOwner;
  }

  listProcessorVales(values, options) {
    return values.map(value => {
      for (let key in options) {
        if (options[key].id === value) return +key;
      }
    });
  }

  listProcessorWriter(values, options) {
    return values.map(value => options[value].id);
  }
}

export default StuffEditor;
