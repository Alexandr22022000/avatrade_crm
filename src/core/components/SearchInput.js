import React, {Component} from 'react';
import '../styles/searchInput.css'

class SearchInput extends Component {
    state = {
        placeholder: this.props.placeholder || 'поиск'
    };
    render() {
        return(
            <div className={`ssearch-input ${this.props.className}` }>
                {this.props.haveIcon === true? <button className={`ssearch-input-icon ${this.props.iconClassName}`} onClick={this.props.onClickIcon}/> : ''}
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