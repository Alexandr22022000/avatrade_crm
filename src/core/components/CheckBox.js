import React, {Component} from 'react';
import '../styles/checkbox.css';

class CheckBox extends Component{
    render() {
        return (
            <div>
                <div  className={'checkbox'}>
                    <input  className={'checkbox-input'}
                            type={'checkbox'}
                            checked={this.props.value}
                            onChange={(event) => this.onChange(event.target.checked)}
                    />
                </div>

                <div className={"header-m"}>{this.props.title}</div>
            </div>
        );
    }


    onChange(value) {
        this.props.onChange(value);
    }

}

export default CheckBox;