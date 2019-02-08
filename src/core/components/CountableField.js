import React, {Component} from 'react';
import StuffInput from "../../personal/components/StuffInput";

class CountableField extends Component {
    state = {
        amount: this.props.value,
    };
    render() {
        return (
            <div className={'countable-field ' + this.props.className}>
                <div className={'countable-field-title ' + this.props.titleClassName}>{this.props.title}</div>
                <div>
                    <button className={'inline sub-button'} onClick={()=> this.onDecrease()}>-</button>
                    <StuffInput value={this.state.amount}
                                onChange={v => this.onChange(v)}
                                numbers={true}
                    />
                    <button className={'inline add-button'} onClick={()=> this.onIncrease()}>+</button>
                </div>
            </div>
        );
    }

    onChange(value) {
        this.setState({amount: parseInt(value,10)});
        this.onChange(value);
    }

    onDecrease() {
        if(this.state.amount !== 0) {
            this.setState({amount: this.state.amount - 1});
        }
    }

    onIncrease() {
        this.setState({amount: this.state.amount + 1})
    }
}

export default CountableField;