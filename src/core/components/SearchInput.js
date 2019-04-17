import React, {Component} from 'react';

class SearchInput extends Component {
    state = {
        placeholder: this.props.placeholder
    };
    render() {
        return(
            <div className={this.props.className}>
                {this.props.haveIcon === true? <button className={this.props.iconClassName} onClick={this.props.onClickIcon}/> : ''}
                <input value={this.props.value}
                       placeholder={this.state.placeholder}
                       className={this.props.inputClassName}
                       style={this.props.inputStyle}
                       onChange={(e) => this.props.onChange(e.target.value)}
                />
            </div>
        )
    }
}

export default SearchInput;