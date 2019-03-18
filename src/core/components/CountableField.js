import React, {Component} from 'react';
import StuffInput from "../../personal/components/StuffInput";
import '../styles/countable-field.css'

class CountableField extends Component {
    render() {
        if (this.props.value > this.props.maxValue && this.props.maxValue !== null)  this.props.onChange(this.props.maxValue);

        let range = '';
        if(!this.props.withoutRange && this.props.maxValue !== null) {
            range = (
                <div className={'rng-input'}>
                    <span style={{marginRight:'10px'}}>0</span>
                    <input type={'range'}
                           min={0}
                           defaultValue={0}
                           max={this.props.maxValue}
                           value={this.props.value}
                           onChange={(e)=> this.onChange(e.target.value)}
                    />
                    <span style={{marginLeft:'10px'}}>{this.props.maxValue}</span>
                </div>
            )
        }

        let textValue = this.props.value ? this.props.value : 0;

        return (
            <div className={'countable-field ' + this.props.className}>
                <div className={'countable-field-title ' + this.props.titleClassName}>{this.props.title}</div>
                <div className={this.props.className} style={this.props.style}>
                    <div  className={'countable-input-ctrl'}>
                        <button className={'inline sub-button blue-button'} onClick={()=> this.onDecrease()}>-</button>
                        <StuffInput value={textValue}
                                    onChange={v => this.onChange(v)}
                                    placeholder={this.props.placeHolder?this.props.placeHolder : 'Количество'}
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
                    {range}
                </div>
            </div>
        );
    }

    onChange(value) {
        if (value === '') {
            this.props.onChange(0);
        }
        else {
            const numberValue = parseInt(value, 10);
            if ((numberValue > this.props.maxValue && this.props.maxValue !== null) || numberValue < 0) return;

            this.props.onChange(numberValue);
        }
    }

    onDecrease() {
        if (this.props.value === 0) return;
        this.props.onChange(this.props.value - 1);
    }

    onIncrease() {
        if (this.props.value === this.props.maxValue && this.props.maxValue !== null) return;
        this.props.onChange(this.props.value + 1);
    }
}

export default CountableField;