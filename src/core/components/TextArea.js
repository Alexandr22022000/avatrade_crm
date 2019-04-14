import React, {Component} from 'react';
import '../styles/TextArea.css';


class TextArea extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            showIcon: false,
        };
        this.inInput = false;
    }

    render() {
        const field = this.state.isActive || this.props.alwaysActive ? (

                <textarea
                    onChange={e => this.onChange(e.target.value)}
                    style={this.props.inputStyle}
                    onKeyDown={(e)=>(this.onEscape(e))}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onBlurCapture={() => this.setActive(false)}
                    autoFocus={!this.props.alwaysActive}
                    rows={this.props.rows || 3}
                    maxlength={this.props.maxlength}
                >

                </textarea>
            ) :  (
                <div
                    onMouseOver={() => this.setIconShow(true)}
                    onMouseOut={() => this.setIconShow(false)}
                >
                    <div className={"inline fixed"}>{(this.props.value||this.props.placeholder || '').split('').map(char=>(char === '\n'?<br/>:char))}</div>
                    {!this.state.showIcon ? ("") : (
                    <div
                            className={"write-icon"}
                            onClick={() => this.setActive(true)}
                        />
                    )}
                </div>
            );

            return (
                <div  style={this.props.style} className={this.props.className || 'text-area'} >
                    <div>{this.props.title}</div>
                    <div className='ta-body'>{field}</div>
                </div>
            );
    }

    onChange(value) {
        this.props.onChange(value);
    }

    setActive(isActive) {
        this.setState({ isActive })
    }

    onEscape(e) {
        if (e.keyCode === 27)
            this.setActive(false);
    }

    setIconShow(showIcon) {
        if (this.props.onlyRead) return;

        if (showIcon) {
            this.setState({ showIcon });
            this.inInput = true;
        } else {
            this.inInput = false;
            setTimeout(() => {
                if (!this.inInput) {
                    this.setState({ showIcon: false });
                    this.inInput = false;
                }
            }, 500);
        }
    }
}

export default TextArea;