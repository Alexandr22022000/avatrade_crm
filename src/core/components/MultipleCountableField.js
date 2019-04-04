import React, {Component, Fragment} from 'react';
import '../styles/mult-count-field.css';
import DropDown from "../../personal/components/DropDown";
import CountableField from "./CountableField";
import SearchDropdown from "./SearchDropdown";

class MultipleCountableField extends  Component {
    render() {
        let dd;
        if(this.props.needSearch) {
            dd = (
                <SearchDropdown options={this.props.options}
                                onSelect={(index)=>{this.selected(index)}}
                                value={+this.props.selectedId}
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
                          value={+this.props.selectedId}
                          onChange={(index)=>{this.selected(index)}}
                          disabled={this.props.disabled}
                />
            )
        }
        return (
            <div className={'mcf-holder ' + this.props.className} key={this.props.key} style={this.props.style}>
                {this.props.readOnly? (
                    this.props.readOnlyValue
                ): (
                    <Fragment>
                        {dd}
                        <CountableField
                            value={this.props.amount}
                            maxValue={this.props.maxCount}
                            onChange={v => {this.onCountChange(v)}}
                            withoutRange={this.props.withoutRange}
                            style={this.props.styleCountable}
                        />
                    </Fragment>
                )}
            </div>
        );
    }

    selected(index) {
        this.props.onSelected(index);
    }

    onCountChange(value) {
        this.props.onCountChange(value, this.props.selectedId);
    }
}

export default MultipleCountableField;