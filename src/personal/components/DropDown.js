import React, {Component} from 'react';
import '../styles/dropdown.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


class DropDown extends Component{
    constructor (props) {
        super(props);
        this.state = {
            selected: ''
        };
    }


    state = {
        selected: ''
    };

    getRank() {
       for(let index in this.props.userTempData.ranks) {
           if(this.props.userTempData.ranks[index].id === this.props.userTempData.user.rank) {
               return this.props.userTempData.ranks[index].name;
           }
       }
        return undefined;
    }

    getListOfRanks(){
        let arr = [];
        for(let index in this.props.userTempData.ranks) {
                arr.push(this.props.userTempData.ranks[index].name);
        }
        return arr;
    }

    _onSelect(option) {
        this.setState((prevState, innerState)=>({selected: option}));
    }

    render() {
        let defaultOption = this.state.selected;
        return(
            <div>
                <Dropdown options={this.getListOfRanks()}
                          onChange={this._onSelect}
                          value={defaultOption}
                />
            </div>
        )
    }

}

export default DropDown;