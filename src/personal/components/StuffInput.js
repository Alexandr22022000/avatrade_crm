import React, { Component } from "react";
import DropDown from "./DropDown";
import "../../core/styles/buttons.css";
import "../styles/Stuff.css";

class StuffInput extends Component {
  render() {
    let input, value;
    if (this.props.options) {
      input = (
        <div onBlurCapture={() => this.setActive(false)}>
          <DropDown
            options={this.props.options}
            value={this.props.value}
            onChange={v => this.props.onChange(v)}
            className={'dropdownPlaceholder'}
          />
        </div>
      );
      value = this.props.options[this.props.value];
    } else {
      input = (
        <input
          onChange={e => this.onChange(e.target.value)}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onBlurCapture={() => this.setActive(false)}
          autoFocus
          className={"inline fixed"}
          onKeyDown={this.onEnter.bind(this)}
        />
      );
      value = this.props.value;
    }

    if (this.props.link) {
      value = (
        <a href={this.props.link} target={"_blank"} className={"link"}>
          <div className={"inline"}>{value}</div>
        </a>
      );
    }

    if (this.state.isActive || this.props.alwaysActive) {
      return (
        <div style={this.props.style}>
          <div className={"header-m"}>{this.props.title}</div>
          <div
            className={"body-m"}
            onMouseOver={() => this.setIconShow(true)}
            onMouseOut={() => this.setIconShow(false)}
          >
            <div>{input}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={this.props.style}>
          <div className={"header-m"}>{this.props.title}</div>
          <div
            className={"body-m"}
            onMouseOver={() => this.setIconShow(true)}
            onMouseOut={() => this.setIconShow(false)}
          >
            <div>
              <div className={"inline fixed"}>{value? value: this.props.placeholder}</div>
              {!this.state.showIcon ? (
                ""
              ) : (
                <div
                  className={"write-icon"}
                  onClick={() => this.setActive(true)}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  componentWillMount() {
    this.setState({
      isActive: false,
      showIcon: false,
      inIcon: false
    });
    this.inInput = false;
  }

  setActive(isActive) {
    this.setState({ isActive });
  }

  setIconShow(showIcon) {
    if (this.props.onlyRead) return;

    if (showIcon) {
      this.setState({ showIcon });
      this.inInput = true;
    } else {
      this.inInput = false;
      setTimeout(() => {
        if (!this.inInput) {
          this.setState({ showIcon: false });
          this.inInput = false;
        }
      }, 500);
    }
  }

  onEnter(e) {
    if (e.keyCode === 13) {
      this.setActive(false);
    }

  }

  onChange(value) {
    if(this.props.numbers === true){
      let regexp = /^\d+$/;
      if(regexp.test(value)){
        this.props.onChange(value);
      }
    } else {
      this.props.onChange(value);
    }
  }
}

export default StuffInput;
