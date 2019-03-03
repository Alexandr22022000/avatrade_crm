import React, {Component} from 'react';
import '../styles/mult-count-field.css';
import DropDown from "../../personal/components/DropDown";
import CountableField from "./CountableField";

class MultipleCountableField extends  Component {
	state = {
		count: this.props.amount,
		maxCount: this.props.maxCount,
		selectedOption: this.props.selectedId,
	};
	render() {
		return (
			<div className={'mcf-holder'}>
				<DropDown className={'dropdownPlaceholder mcf-dropdown'}
				          options={this.props.options}
				          value={this.state.selectedOption}
				          onChange={(index)=>{this.selected(index)}}
				/>
				<CountableField
					value={this.state.count}
					maxValue={this.state.maxCount}
					onChange={v => {this.onCountChange(v)}}
				/>
			</div>
		);
	}

	selected(index) {
		this.setState({selectedOption: index});
		this.props.onSelected(index);
	}

	onCountChange(value) {
		this.setState({count:value});
		this.props.onCountChange(value, this.state.selectedOption);
	}
}

export default MultipleCountableField;