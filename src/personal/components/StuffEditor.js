import React, { Component } from "react";
import "../../core/styles/buttons.css";
import "../styles/Stuff.css";
import { PERMISSIONS_TEXT, PERMISSIONS } from "../../core/constants";
import StuffInput from "./StuffInput";
import MultiInput from "./MultiInput";
import validator from 'validator';
import Modal from "../../core/components/Modal";
import TextArea from "../../core/components/TextArea";

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
            title={"Адрес:"}
            value={this.props.currentUser.address}
            onChange={v => this.updateUserData(v, "address")}
            alwaysActive={isNew}
            onlyRead={onlyRead}
          />


          <TextArea
              title="Контакты:"
              value={this.props.currentUser.contacts}
              onChange={v => this.updateUserData(v, "contacts")}
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
            title={"Должности:"}
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
    let controlButtons = (
        <div>
            {!this.props.currentUser || this.isOwner() || !this.props.currentUser.id ? "" :
                <div className={"inline sackButton link-decor pointed"} onClick={() => this.onChangeUserStatus()}>{this.props.currentUser.status === 0 ? "Уволить" : "Восстановить"}</div>
            }
            <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")} onClick={() => this.onClose(true)}>Сохранить</button>
        </div>
    );
    return (
        <div>
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"borders"}
                   childClassName={"modal"}
                   controlClassName={"saveButtonHolder"}
                   controls={controlButtons}
                   onClose={() => this.onClose(false)}
            >
                {editor}
            </Modal>
        </div>
    );
  }

  canSave () {
      if (!this.props.currentUser) return false;
      if (!validator.isEmail(this.props.currentUser.email)) return false;
      if (this.props.currentUser.name.trim() === '') return false;
      if (this.props.currentUser.phone.trim() === '') return false;
      if (!this.canEdit()) return false;
      return true;
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
          if (!this.canSave()) return;

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
