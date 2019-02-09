import React, {Component} from 'react';
import StuffInput from "../../personal/components/StuffInput";

class CountableField extends Component {
    state = {
        amount: (this.props.value? this.props.value:0),
        maxAmount: this.props.maxValue,
    };
    render() {
        return (
            <div className={'countable-field ' + this.props.className}>
                <div className={'countable-field-title ' + this.props.titleClassName}>{this.props.title}</div>
                <div>
                    <button className={'inline sub-button'} onClick={()=> this.onDecrease()}>-</button>
                    <div style={{display: 'inline-block', minWidth: '350px'}}>
                        <StuffInput value={this.state.amount}
                                    onChange={v => this.onChange(v)}
                                    placeholder={'Количество'}
                                    numbers={true}
                        />
                    </div>
                    <button className={'inline add-button'} onClick={()=> this.onIncrease()}>+</button>
                    <div style={{width: '80%'}}>
                        <input type={'range'} min={1} max={this.state.maxAmount} style={{width: '90%',marginLeft:'12%'}}/>
                    </div>
                </div>
            </div>
        );
    }

    onChange(value) {
        if(value === '') {
            this.setState({amount: 0});
            this.props.onChange(0);
        }else if(this.state.maxAmount >= parseInt(value, 10)) {
            this.setState({amount: parseInt(value, 10)});
            this.props.onChange(value);
        }
    }

    onDecrease() {
        if(this.state.amount !== 1) {
            this.setState({amount: this.state.amount - 1});
        }
    }

    onIncrease() {
        if(this.state.amount !== this.state.maxAmount) {
            this.setState({amount: this.state.amount + 1})
        }
    }
}

export default CountableField;