import React, {Component} from 'react';
import DropDown from './DropDown';
import '../../core/styles/buttons.css';
import '../styles/Stuff.css';

class StuffInput extends  Component {
    render() {
        let input, value;
        if (this.props.options) {
            input = (
                <div onBlurCapture={() => this.setActive(false)}>
                    <DropDown options={this.props.options} value={this.props.value} onChange={(v) => this.props.onChange(v)}/>
                </div>
            );
            value = this.props.options[this.props.value];
        }
        else {
            input = (
                <input
                    onChange={e => this.props.onChange(e.target.value)}
                    value={this.props.value}
                    onBlurCapture={() => this.setActive(false)}
                    autoFocus
                    className={'inline fixed'}
                />
            );
            value = this.props.value;
        }

        if (this.props.link) {
            value = (
                <a href={this.props.link} target={'_blank'} className={'link'}>
                    <div className={'inline'}>{value}</div>
                </a>
            );
        }

        if (this.state.isActive || this.props.alwaysActive) {
            return (
                <div>
                    <div className={'header-m'}>{this.props.title}</div>
                    <div className={'body-m'} onMouseOver={() => this.setIconShow(true)} onMouseOut={() => this.setIconShow(false)}>
                        <div>
                            {input}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className={'header-m'}>{this.props.title}</div>
                    <div className={'body-m'} onMouseOver={() => this.setIconShow(true)} onMouseOut={() => this.setIconShow(false)}>
                        <div>
                            <div className={'inline fixed'}>
                                {value}
                            </div>
                            {!this.state.showIcon ? "" :
                                <div className={'write-icon'} onClick={() => this.setActive(true)}/>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }

    componentWillMount () {
        this.setState({
            isActive: false,
            showIcon: false,
            inIcon: false,
        });
        this.inInput = false;
    }

    setActive (isActive) {
        this.setState({isActive});
    }

    setIconShow (showIcon) {
        if (this.props.onlyRead) return;

        if (showIcon) {
            this.setState({showIcon});
            this.inInput = true;
        }
        else {
            this.inInput = false;
            setTimeout(() => {
                if (!this.inInput) {
                    this.setState({showIcon: false});
                    this.inInput = false;
                }
            }, 500);
        }
    }
}

export default StuffInput;