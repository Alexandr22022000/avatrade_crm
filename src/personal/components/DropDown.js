import React, { Component } from "react";
import "../styles/dropdown.css";

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    let tempUserData = { user: null, ranks: null };
    if (this.props.currentPerson !== null) {
      tempUserData.user = Object.assign({}, this.props.currentPerson.user);
      tempUserData.ranks = Object.assign({}, this.props.currentPerson.ranks);
    }
    let options = [];
    for (let key in this.props.currentPerson.ranks) {
      if (
        this.props.currentPerson.ranks[key].id ===
        this.props.currentPerson.user.rank
      ) {
        options.push(
          <option selected key={key}>
            {this.props.currentPerson.ranks[key].name}
          </option>
        );
      } else {
        options.push(
          <option key={key}>{this.props.currentPerson.ranks[key].name}</option>
        );
      }
    }

    return (
      <div className={this.props.style}>
        <select
          className={"dropdownPlaceholder"}
          onChange={e => {
            this.props.onSelected(
              (() => {
                for (let key in this.props.currentPerson.ranks) {
                  if (
                    this.props.currentPerson.ranks[key].name === e.target.value
                  ) {
                    return this.props.currentPerson.ranks[key].id;
                  }
                }
              })()
            );
          }}
        >
          {options}
        </select>
      </div>
    );
  }
}

export default DropDown;
