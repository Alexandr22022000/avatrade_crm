import React, {Component} from 'react';
import '../styles/dropdown.css'


class DropDown extends Component {
    render() {
        let options = [];
        for(let key in this.props.options) {
            if (+key === this.props.value) {
                options.push(<option selected key={key}>{this.props.options[key]}</option>)
            } else {
                options.push(<option key={key}>{this.props.options[key]}</option>)
            }
        }

        return(
            <div className={this.props.style}>
                <select className={'dropdownPlaceholder'} onChange={(e) => this.onChange(e.target.value)}>
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