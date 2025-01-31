import React, { Component } from "react";
import "../styles/searchdropdown.css";

class SearchDropdown extends Component {
    state = {
        showOptions: false,
        inputValue: '',
    };

    getOptions() {
        return (
            <div className={"options " + this.props.optionsClassName}>
                {this.props.options
                    .filter((value, index) => {
                        return this.state.inputValue && (this.props.freeFirstOption? true: index !== 0)?
                            value.toLocaleLowerCase()
                            .indexOf(this.state.inputValue.toLocaleLowerCase()) !== -1
                            : true;
                    })
                    .map((value, index) => (
                        <div
                            key={index}
                            onClick={() => {
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
                <div className='search-dropdown'>
                    <input
                        style={this.props.inputStyle}
                        className={"search-input " + this.props.inputClassName}
                        value={this.props.value === -1 ? this.state.inputValue : this.props.options[this.props.value]}
                        onChange={event => this.onChange(event.target.value)}
                        onKeyDown={e => this.onKeyDown(e)}
                        ref={(i) => this.input = i}
                        onClickCapture={() => this.setState({ showOptions: true })}
                        onBlurCapture={() => setTimeout(() => this.setState({showOptions: false}),150)}
                    />
                    <button
                        className={'cross-dropdown ' + (this.state.inputValue === ''? '' : 'cross-dropdown-active')}
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

    componentDidMount() {
        let val = this.props.value === -1? '': this.props.options[+this.props.value];
        this.setState({inputValue: val})
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
        let disabled = [];
        if(this.props.disabled) {
            disabled = this.props.disabled;
        }
        if(disabled.indexOf(id) !== -1) return this.props.onSelect(-1);
        this.props.onSelect(id);
        this.setState({ inputValue: this.props.options[id] });
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
