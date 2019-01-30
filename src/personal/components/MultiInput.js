import React, {Component} from 'react';
import '../styles/dropdown.css'
import DropDown from './DropDown';
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

            input = (
                <div onBlurCapture={() => this.setInputShow(false)}>
                    <DropDown
                        className={'dropdownPlaceholder'}
                        options={this.props.options}
                        value={0}
                        onChange={(v) => this.onChangeInput(v)}/>
                </div>
            );
        }
        else {
            for (let key in this.props.values) {
                let text = this.props.values[key];
                if (text.length >= 25) text = text.substring(0,25) + '...';

                values.push(<MultiInputItem value={text} onDel={()=> this.onDel(key)} link={text} onlyRead={this.props.onlyRead}/>)
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
                {this.props.onlyRead ? "" : (
                    this.state.showInput ?
                        <div style={{position: 'relative', top: '-20px'}}>{input}</div>
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
                    value = 0;
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