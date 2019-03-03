import React, {Component} from 'react';
import StuffInput from "../../personal/components/StuffInput";
import '../styles/countable-field.css'

class CountableField extends Component {
    state = {
        amount: (this.props.value? this.props.value:0),
        maxAmount: this.props.maxValue,
        textAmount: '',
    };
    render() {
        return (
            <div className={'countable-field ' + this.props.className}>
                <div className={'countable-field-title ' + this.props.titleClassName}>{this.props.title}</div>
                <div>
                    <div  className={'countable-input-ctrl'}>
                        <button className={'inline sub-button blue-button'} onClick={()=> this.onDecrease()}>-</button>
                        <StuffInput value={this.state.textAmount}
                                    onChange={v => this.onChange(v)}
                                    placeholder={'Количество'}
                                    numbers={true}
                                    alwaysActive={true}
                                    style={{width: '200px', display: 'inline-block'}}
                                    inputStyle={{textAlign: 'center'}}
                        />
                        <button className={'inline add-button blue-button'}
                                onClick={()=> this.onIncrease()}
                        >
                            +
                        </button>
                    </div>
                    <div className={'rng-input'}>
                        <span style={{marginRight:'10px'}}>0</span>
                        <input type={'range'}
                               min={0}
                               defaultValue={0}
                               max={this.state.maxAmount}
                               value={this.state.amount}
                               onChange={(e)=> this.onChange(e.target.value)}
                        />
                        <span style={{marginLeft:'10px'}}>{this.state.maxAmount}</span>
                    </div>
                </div>
            </div>
        );
    }

    onChange(value) {
        if(value === '') {
            this.setState({amount: 0, textAmount: ''});
            this.props.onChange(0);
        }else if(this.state.maxAmount >= parseInt(value, 10)) {
            this.setState({amount: parseInt(value, 10),textAmount: value});
            this.props.onChange(parseInt(value, 10));
        }
    }

    onDecrease() {
        if(this.state.amount !== 0) {
            this.setState({
                amount: this.state.amount - 1,
                textAmount: (this.state.amount - 1) + '',
            })
        }
        this.props.onChange(this.state.amount - 1);
    }

    onIncrease() {
        if(this.state.amount !== this.state.maxAmount) {
            this.setState({
                amount: this.state.amount + 1,
                textAmount: (this.state.amount + 1) + '',
            })
        }
        this.props.onChange(this.state.amount + 1);
    }
}

export default CountableField;