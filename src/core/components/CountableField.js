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
                    <button className={'inline'}>-</button>
                    <StuffInput value={this.state.amount}
                                onChange={v => this.setState({amount: parseInt(v,10)})}
                                numbers={true}
                    />
                    <button className={'inline'}>+</button>
                </div>
            </div>
        );
    }
}