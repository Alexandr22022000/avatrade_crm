import React, { Component } from "react";
import "../styles/searchdropdown.css";

class SearchDropdown extends Component {
    state = {
        showOptions: false,
        inputValue: this.props.value,
    };

    getOptions() {
        return (
            <div>
                <div id={"options"}>
                    {this.props.options
                        .filter((value, index) => {
                            return this.state.inputValue && index !== 0
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
            </div>
        );
    }

    render() {
        return (
            <div>
                {!this.state.showOptions ? '' :
                    <div className={'dropdown-back'} onClick={() => this.setState({showOptions: false})}/>
                }
                <div>
                    <input
                        className={"search-input"}
                        value={this.state.inputValue}
                        onChange={event => this.onChange(event.target.value)}
                        onKeyDown={e => this.onKeyDown(e)}
                        ref={(i) => this.input = i}
                        onClickCapture={() => this.setState({ showOptions: true })}
                    />
                    <button
                        className={'cross-dropdown ' + (!this.state.inputValue ? '' : 'cross-dropdown-active')}
                        onClick={this.onDel.bind(this)}
                    />
                    {this.state.showOptions ? this.getOptions() : ""}
                </div>
            </div>
        );
    }

    componentDidUpdate () {
        if (this.state.showOptions) {
            this.input.focus();
        }
    }


    onDel () {
        this.setState({inputValue: ''});
        this.props.onSelect(-1);
    }

    onSelect(value) {
        let id = null;
        for (let key in this.props.options) {
            if (this.props.options[key] === value) {
                id = +key;
            }
        }

        if (id === null) return this.props.onSelect(-1);

        this.setState({ inputValue: this.props.options[id] });
        this.props.onSelect(id);
    }

    onChange(value) {
        this.setState({ inputValue: value, showOptions: true});
        this.onSelect(value);
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.setState({ showOptions: false });
        }
    }
}

export default SearchDropdown;
