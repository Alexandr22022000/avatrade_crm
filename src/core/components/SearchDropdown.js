import React, {Component} from 'react';
import '../styles/searchdropdown.css'

class SearchDropdown extends Component {
    state = {
        showOptions: false,
        inputValue:'',
    };

    getOptions(){
        return(
            <div id={'options'}>
                {this.props.options.filter(value => { return this.state.inputValue? value.indexOf(this.state.inputValue)!== -1:true})
                    .map((value, index)=> <div key={index} onClick={()=> this.onSelect(index)}>
                    {value}
                </div>)}
            </div>
        )
    }

    render() {
        return(
            <div>
                <input className={'search-input'}
                       value={this.state.inputValue}
                       onChange={event => this.setState({inputValue: event.target.value})}
                       onBlurCapture={()=> {setTimeout(()=>this.setState({showOptions: false}),125)}}
                       onClickCapture={()=> this.setState({showOptions:true})}
                />
                {this.state.showOptions?this.getOptions():''}
            </div>
        )
    }
    onSelect(id) {
        this.setState({inputValue: this.props.options[id]});
        this.props.onSelect(id);
    }
}

export default SearchDropdown; 