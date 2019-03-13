import React, {Component} from 'react';

class CashboxCountable extends Component {
    state = {
        count: this.props.count? +this.props.count: 0,
    };
    render() {
        return (
            <div className={'cb-countable'}>
                <p className={'inline'}>{this.props.title}</p>
                <div className={'inline cb-c-box'}>
                    <button onClick={() => this.onIncrease()} className={'cb-c-inc cb-c-btn'}>+</button>
                    <input className={'cb-c-b-input'}
                           onChange={(e) => this.onChange(e.target.value)}
                           value={this.state.count.toString(10)}
                    />
                    <button onClick={() => this.onDecrease()} className={'cb-c-dec cb-c-btn'}>-</button>
                </div>
            </div>
        );
    }

    onIncrease() {
        this.onChange(this.state.count + 1);
    }


    onDecrease() {
        if(this.state.count > 0) {
            this.onChange(this.state.count - 1);
        }
    }

    onChange(value) {
        let regexp = /^\d*$/;
        console.log(value);
        if(regexp.test(+value)){
            this.setState({count: +value});
        }
    }
}
export default CashboxCountable;