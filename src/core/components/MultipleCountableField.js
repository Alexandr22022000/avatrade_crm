import React, {Component} from 'react';
import '../styles/mult-count-field.css';
import DropDown from "../../personal/components/DropDown";
import CountableField from "./CountableField";
import SearchDropdown from "./SearchDropdown";

class MultipleCountableField extends  Component {
    state = {
        count: this.props.amount,
        maxCount: this.props.maxCount,
        selectedOption: this.props.selectedId,
    };
    render() {
        let dd;
        if(this.props.needSearch) {
            dd = (
                <SearchDropdown options={this.props.options}
                                onSelect={(index)=>{this.selected(index)}}
                                value={this.props.value}
                                disabled={this.props.disabled}
                                inputStyle={this.props.inputStyle}
                                inputClassName={this.props.inputClassName}
                                optionsClassName={this.props.optionsClassName}
                                freeFirstOption={this.props.withoutFirstCell}
                />
            )
        } else {
            dd = (
                <DropDown className={'dropdownPlaceholder mcf-dropdown'}
                          options={this.props.options}
                          value={this.state.selectedOption}
                          onChange={(index)=>{this.selected(index)}}
                          disabled={this.props.disabled}
                />
            )
        }
        return (
            <div className={'mcf-holder ' + this.props.className} key={this.props.key} style={this.props.style}>
                {dd}
                <CountableField
                    value={this.state.count}
                    maxValue={this.state.maxCount}
                    onChange={v => {this.onCountChange(v)}}
                    withoutRange={this.props.withoutRange}
                />
            </div>
        );
    }

    selected(index) {
        this.setState({selectedOption: index});
        this.props.onSelected(index);
    }

    onCountChange(value) {
        this.setState({count: value});
        this.props.onCountChange(value, this.state.selectedOption);
    }
}

export default MultipleCountableField;