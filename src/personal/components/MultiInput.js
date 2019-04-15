import React, {Component} from 'react';
import '../../core/styles/dropdown.css'
import DropDown from '../../core/components/DropDown';
import MultiInputItem from './MultiInputItem';
import {PERMISSIONS_TEXT, PERMISSIONS} from '../../core/constants';


class MultiInput extends Component {
    render() {
        const values = [];
        let input;
        if (this.props.options) {
            for (let key in this.props.values) {
                let text = this.props.options[this.props.values[key]];
                const readOnly = text === PERMISSIONS_TEXT[PERMISSIONS.OWNER].name;
                values.push(<MultiInputItem value={text} onDel={()=> this.onDel(key)} onlyRead={this.props.onlyRead || readOnly}/>)
            }
            let disabled = this.props.options.map((option,index) => this.props.values.indexOf(index,0) !== -1);
            this.inputValue = -1;
            for(let disKey in disabled) {
                if(!disabled[disKey]){
                    this.inputValue = disKey;
                    break;
                }
            }

            input = (
                <div onBlurCapture={() => this.setInputShow(false)}>
                    <DropDown
                        className={'dropdownPlaceholder dropdown-sizes'}
                        options={this.props.options}
                        disabled={disabled}
                        value={this.inputValue}
                        onChange={(v) => this.onChangeInput(v)}/>
                </div>
            );
        }
        else {
            for (let key in this.props.values) {
                let text = this.props.values[key];
                if (text.length >= 25) text = text.substring(0,25) + '...';

                values.push(<MultiInputItem value={text} onDel={()=> this.onDel(key)} link={this.props.values[key]} onlyRead={this.props.onlyRead}/>)
            }

            input = (
                <input
                    onChange={e => this.onChangeInput(e.target.value)}
                    onBlurCapture={() => this.setInputShow(false)}
                    autoFocus
                    className={'inline fixed'}
                    value={this.state.inputValue}
                    onKeyDown={this.onEnter.bind(this)}
                />
            );
        }

        return(
            <div>
                <div className={'header-m'}>{this.props.title}</div>
                <div className={'body-m'}>{values}</div>
                {this.props.onlyRead || this.inputValue === -1 ? "" : (
                    this.state.showInput ?
                        <div style={{position: 'relative', top: '-20px'}} className={'body-m'}>{input}</div>
                        :
                        <button className={'addDocButton'} onClick={() => this.setInputShow(true)}>Добавить</button>
                )}
            </div>
        )
    }

    componentWillMount () {
        this.setState({
            showInput: false,
            inputValue: "",
        });
    }

    onChangeInput (inputValue) {
        this.setState({inputValue});
    }

    onDel (index) {
        const values = this.props.values;
        values.splice(index, 1);
        this.props.onChange(values);
    }

    setInputShow (showInput) {
        if (showInput) {
            this.setState({showInput, inputValue: ""});
        }
        else {
            let value = this.state.inputValue;
            if (value === "") {
                if (this.props.options) {
                    value = this.inputValue;
                }
                else {
                    return this.setState({showInput});
                }
            }

            const values = this.props.values;
            values.push(value);
            this.props.onChange(values);

            this.setState({showInput});
        }
    }

    onEnter (e) {
        if (e.keyCode === 13) {
            this.setInputShow(false);
        }
    }
}

export default MultiInput;