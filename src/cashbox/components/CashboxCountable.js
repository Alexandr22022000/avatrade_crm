import React, {Component} from 'react';
import cross from "../../images/cross-icon.png";

class CashboxCountable extends Component {
    state = {
        count: this.props.count? +this.props.count: 0,
    };
    render() {
        return (
            <div className={'cb-countable'}>
                <div className={'inline cb-c-title'}>{this.props.title}</div>
                <div className={'inline cb-c-box'}>
                    <button onClick={() => this.onIncrease()} className={'cb-c-inc cb-c-btn'}>+</button>
                    <input className={'cb-c-b-input'}
                           onChange={(e) => this.onChange(e.target.value)}
                           value={this.state.count.toString(10)}
                    />
                    <button onClick={() => this.onDecrease()} className={'cb-c-dec cb-c-btn'}>-</button>
                </div>
                <img
                    src={cross}
                    onClick={() => this.props.onClose()}
                    alt={"cross"}
                    style={{ cursor: "pointer"}}
                    className={'cb-c-cross'}
                />
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
            this.props.onChange(value);
        }
    }
}
export default CashboxCountable;