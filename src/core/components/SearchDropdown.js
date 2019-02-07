import React, { Component } from "react";
import "../styles/searchdropdown.css";
import cross from "../../images/cross-icon.png";

class SearchDropdown extends Component {
  state = {
    showOptions: false,
    inputValue: ""
  };

  getOptions() {
    return (
      <div id={"options"}>
        {this.props.options
          .filter(value => {
            return this.state.inputValue
              ? value
                  .toLocaleLowerCase()
                  .indexOf(this.state.inputValue.toLocaleLowerCase()) !== -1
              : true;
          })
          .map((value, index) => (
            <div
              key={index}
              onClick={e => {
                this.onSelect(value);
                this.setState({ showOptions: false });
              }}
            >
              {value}
            </div>
          ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          <input
            className={"search-input"}
            value={this.state.inputValue}
            onChange={event => this.onChange(event.target.value)}
            onKeyDown={e => this.onKeyDown(e)}
            onClickCapture={() => this.setState({ showOptions: true })}
          />
          <button
              className={'cross-dropdown'}
          />
          {this.state.showOptions ? this.getOptions() : ""}
        </div>
      </div>
    );
  }

  onSelect(value) {
    let id;
    for (let key in this.props.options) {
      if (this.props.options[key] === value) {
        id = +key;
      }
    }
    console.log(id);
    this.setState({ inputValue: this.props.options[id] });
    this.props.onSelect(id);
  }

  onChange(value) {
    this.setState({ inputValue: value, showOptions: true});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({ showOptions: false });
    }
  }
}

export default SearchDropdown;
