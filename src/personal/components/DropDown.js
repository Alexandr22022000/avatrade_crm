import React, {Component} from 'react';
import '../styles/dropdown.css'


class DropDown extends Component {
    render() {
        let options = [];
        let disabled = this.props.disabled;
        if (!disabled) {
            disabled = [];
            for (let i = 0; i < this.props.options.length; i++) disabled.push(false);
        }
        for(let key in this.props.options) {
            if(disabled[key]) {
                options.push(<option disabled key={key}>{this.props.options[key]}</option>)
            } else if (+key === this.props.value) {
                options.push(<option selected key={key}>{this.props.options[key]}</option>)
            } else {
                options.push(<option key={key}>{this.props.options[key]}</option>)
            }
        }

        return(
            <div className={this.props.holderClassName} style={this.props.holderStyle}>
                <select className={this.props.className} onChange={(e) => this.onChange(e.target.value)}>
                    {options}
                </select>
            </div>
        )
    }

    onChange (value) {
        for (let key in this.props.options) {
            if (this.props.options[key] === value) {
                this.props.onChange(+key);
                break;
            }
        }
    }
}

export default DropDown;