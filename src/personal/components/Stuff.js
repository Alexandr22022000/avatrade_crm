import React, { Component } from "react";
import "../../core/styles/buttons.css";
import "../styles/Stuff.css";
import cross from "../../images/cross-icon.png";
import DropDown from "../containers/DropDown";

class Stuff extends Component {
  getModal(userTempData) {
    return (
      <div
        className={"modalHolder"}
        onClick={() => {
          this.props.onCloseModal();
          this.props.onChangeBlockStatus(-1);
        }}
      >
        <div
          className={"borders"}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div id={"cross"}>
            <img
              src={cross}
              onClick={() => {
                this.props.onCloseModal();
                this.props.onChangeBlockStatus(-1);
              }}
              alt={"cross"}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={"modal"}>{this.showCurrentPerson(userTempData)}</div>
          <div className={"saveButtonHolder"}>
            <button
              className={"btn-m"}
              onClick={() => {
                if (this.props.currentPersonId !== -1) {
                  this.props.onUpdateUserData({
                    ...userTempData.user,
                    id: this.props.currentPersonId
                  });
                } else {
                  this.props.onAddNewUser(userTempData.user);
                }
                this.props.onCloseModal();
                this.props.onChangeBlockStatus(-1);
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    );
  }

  showCurrentPerson(userTempData) {
    let dropDownOptions = [];
    for (let index in userTempData.ranks) {
      dropDownOptions.push(userTempData.ranks[index].name);
    }
    let newDocName;
    return (
      <div>
        {userTempData !== null ? (
          <div>
            <div className={"header-m"}>ФИО:</div>
            <div className={"body-m"}>
              {this.props.blockStatuses[0] === true ? (
                <div>
                  <input
                    onChange={e => (userTempData.user.name = e.target.value)}
                    defaultValue={userTempData.user.name}
                    onBlurCapture={() => {
                      this.props.onChangeBlockStatus(-1);
                      this.props.onFetchUserData(userTempData);
                    }}
                    autoFocus
                    className={"inline fixed"}
                  />
                  <div className={"write-icon inline"} />
                </div>
              ) : (
                <div>
                  <div className={"inline fixed"}>{userTempData.user.name}</div>
                  <div
                    className={"write-icon"}
                    onClick={() => this.props.onChangeBlockStatus(0)}
                  />
                </div>
              )}
            </div>
            <div className={"header-m"}>Адрес:</div>
            <div className={"body-m"}>
              {this.props.blockStatuses[1] === true ? (
                <div>
                  <input
                    onChange={e => (userTempData.user.address = e.target.value)}
                    defaultValue={userTempData.user.address}
                    onBlurCapture={() => {
                      this.props.onChangeBlockStatus(-1);
                      this.props.onFetchUserData(userTempData);
                    }}
                    autoFocus
                    className={"inline fixed"}
                  />
                  <div className={"write-icon"} />
                </div>
              ) : (
                <div>
                  <div className={"inline fixed"}>
                    {userTempData.user.address}
                  </div>
                  <div
                    className={"write-icon"}
                    onClick={() => this.props.onChangeBlockStatus(1)}
                  />
                </div>
              )}
            </div>
            <div className={"header-m"}>Email:</div>
            <div className={"body-m"}>
              {this.props.blockStatuses[2] === true ? (
                <div>
                  <input
                    onChange={e => (userTempData.user.email = e.target.value)}
                    defaultValue={userTempData.user.email}
                    onBlurCapture={() => {
                      this.props.onChangeBlockStatus(-1);
                      this.props.onFetchUserData(userTempData);
                    }}
                    autoFocus
                    className={"inline fixed"}
                  />
                  <div className={"write-icon"} />
                </div>
              ) : (
                <div>
                  <div className={"inline fixed"}>
                    {userTempData.user.email}
                  </div>
                  <div
                    className={"write-icon"}
                    onClick={() => this.props.onChangeBlockStatus(2)}
                  />
                </div>
              )}
            </div>
            <div className={"header-m"}>Телефон:</div>
            <div className={"body-m"}>
              {this.props.blockStatuses[3] === true ? (
                <div>
                  <input
                    onChange={e => (userTempData.user.phone = e.target.value)}
                    defaultValue={userTempData.user.phone}
                    onBlurCapture={() => {
                      this.props.onChangeBlockStatus(-1);
                      this.props.onFetchUserData(userTempData);
                    }}
                    autoFocus
                    className={"inline fixed"}
                  />
                  <div className={"write-icon"} />
                </div>
              ) : (
                <div>
                  <div className={"inline fixed"}>
                    {userTempData.user.phone}
                  </div>
                  <div
                    className={"write-icon"}
                    onClick={() => this.props.onChangeBlockStatus(3)}
                  />
                </div>
              )}
            </div>
            <div className={"header-m"}>VK:</div>
            <div className={"body-m"}>
              {this.props.blockStatuses[4] === true ? (
                <div>
                  <input
                    onChange={e => (userTempData.user.vk = e.target.value)}
                    defaultValue={userTempData.user.vk}
                    onBlurCapture={() => {
                      this.props.onChangeBlockStatus(-1);
                      this.props.onFetchUserData(userTempData);
                    }}
                    autoFocus
                    className={"inline fixed"}
                  />
                  <div className={"write-icon"} />
                </div>
              ) : (
                <div>
                  <div className={"inline fixed"}>{userTempData.user.vk}</div>
                  <div
                    className={"write-icon"}
                    onClick={() => this.props.onChangeBlockStatus(4)}
                  />
                </div>
              )}
            </div>
            <div className={"header-m"}>Ранг:</div>
            <div className={"body-m"}>
              <div>
                <DropDown
                  onSelected={value => {
                    userTempData.user.rank = value;
                    this.props.onFetchUserData(userTempData);
                  }}
                />
              </div>
            </div>
            <div className={"header-m"}>Документы:</div>
            <div className={"body-m"}>
              {console.log(userTempData)}
              {userTempData.user.docs.map((value, index) => {
                return (
                  <div className={"docHolder"} key={index}>
                    <a href={value} target={"_blank"}>
                      <div className={"inline"}>
                        {value.length >= 25
                          ? value.substring(0, 25) + "..."
                          : value}
                      </div>
                    </a>
                    <div
                      style={{
                        display: "inline-block",
                        float: "right",
                        marginTop: "9px"
                      }}
                    >
                      <img
                        src={cross}
                        alt={"cross"}
                        style={{ cursor: "pointer", float: "left" }}
                        onClick={() => {
                          userTempData.user.docs.splice(index, 1);
                          this.props.onFetchUserData(userTempData);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className={"addDocButton"}
              onClick={() => this.props.onChangeBlockStatus(5)}
            >
              Добавить
            </button>
            {this.props.blockStatuses[5] === true ? (
              <div>
                <input
                  onChange={e => (newDocName = e.target.value)}
                  onBlurCapture={() => {
                    this.props.onChangeBlockStatus(-1);
                    userTempData.user.docs.push(newDocName);
                    this.props.onFetchUserData(userTempData);
                  }}
                  autoFocus
                  className={"inline fixed"}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  render() {
    const style = {
      holder: "stuffHolder"
    };
    return (
      <div>
        <div id={"controlButtons"}>
          <button
            className={"btn-m"}
            onClick={() => {
              this.showPerson(null);
            }}
          >
            Добавить
          </button>
        </div>
        <div className={style.holder}>
          <div id={"stuffList-holder"}>
            <div id={"stuffHolder"}>
              {this.props.stuff.map((value, index) => {
                return (
                  <table
                    onClick={() => this.showPerson(value)}
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    key={index}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <div className={"iconHolder"} />
                        </td>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    textAlign: "left",
                                    fontSize: "25px"
                                  }}
                                >
                                  {value.name}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  {value.phone} - {value.rank}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
          <hr color={"#1f1f1f"} />
          {this.props.modalStatus ? (
            this.getModal(this.props.currentPerson)
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }

  showPerson(personInfo) {
    if (personInfo !== null) {
      this.props.onGetCurrentUser(personInfo.id);
      this.props.onOpenModal(personInfo.id);
    } else {
      this.props.onSetEmptyUser(this.props.currentPerson.ranks);
      this.props.onOpenModal(-1);
    }
  }

  componentDidMount() {
    this.props.onGetUsers();
    this.props.onGetCurrentUser(0);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }
}

export default Stuff;
