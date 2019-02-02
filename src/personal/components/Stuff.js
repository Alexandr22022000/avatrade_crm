import React, { Component } from "react";
import "../../core/styles/buttons.css";
import "../styles/Stuff.css";
import StuffEditor from "../containers/StuffEditor";
import DropDown from "./DropDown";

class Stuff extends Component {
  render() {
    const users = [];
    this.props.users.map(item => {
      users.push(
        <table
          onClick={() => this.showPerson(item.id)}
          style={{ cursor: "pointer", marginLeft: "8px" }}
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
                      <td style={{ textAlign: "left", fontSize: "25px" }}>
                        {item.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>
                        {item.phone} - {item.rank}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      );
    });

    return (
      <div>
        <div id={"controlButtons"}>
          <button
            className={"btn-m blue-button inline"}
            onClick={() => this.showPerson(null)}
          >
            Добавить
          </button>
          <div
            className={"inline"}
            style={{ width: "250px", marginLeft: "40px" }}
          >
            <DropDown
              className={"dropDown"}
              options={["Действующие", "Все"]}
              value={this.props.showAll ? 1 : 0}
              onChange={(v) => {this.props.setUsersFilter(v === 1); this.props.onGetUsers();}}
            />
          </div>
        </div>
        <div className={"stuffHolder"}>
          <div id={"stuffList-holder"}>
            <div id={"stuffHolder"}>
              <div style={{ minHeight: "4px" }} />
              {users}
            </div>
          </div>
          {!this.state.showEditor ? (
            ""
          ) : (
            <StuffEditor onClose={() => this.setState({ showEditor: false })} />
          )}
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.onGetUsers();
    this.setState({
      showEditor: false
    });
  }

  showPerson(personId) {
    if (personId) {
      this.props.onGetCurrentUser(personId);
    } else {
      this.props.onSetEmptyUser();
      this.props.getRanks();
    }
    this.setState({ showEditor: true });
  }
}

export default Stuff;
