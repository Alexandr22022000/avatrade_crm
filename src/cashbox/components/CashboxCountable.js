import React, {Component} from 'react';

class CashboxCountable extends Component {
    state = {
        count: 0,
    };
    render() {
        return (
            <div className={'cb-countable'}>
                <p className={'inline'}>{this.props.title}</p>
                <div className={'inline cb-c-box'}>
                    <button>+</button>
                    <input className={'cb-c-b-input'} onChange={}/>
                    <button>-</button>
                </div>
            </div>
        );
    }

    onIncrease() {
        this.setState({count: this.state.count + 1});
    }

    onDecrease() {
        if(this.state.count > 0) {
            this.setState({count: this.state.count - 1});
        }
    }

    onChange(value) {
        let regexp = /^\d*$/;
        if(regexp.test(value)){
            this.setState({count: value});
        }
    }
}
export default CashboxCountable;