import React, {Component} from 'react';

class Form extends Component {
    render() {
        return (
            <div>
                <div className={this.props.logoClassName}>
                </div>
                <div className={this.props.formClassName}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Form;