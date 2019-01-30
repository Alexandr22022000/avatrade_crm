import React, {Component} from 'react';
import '../styles/dropdown.css'
import cross from "../../images/cross-icon.png";


class MultiInput extends Component {
    render() {
        let value = <div className={'inline'}>{this.props.value}</div>;
        if (this.props.link) {
            value = (
                <a href={this.props.link} target={'_blank'} className={'link'}>
                    {value}
                </a>
            );
        }

        return(
            <div className={'docHolder'} onMouseOver={() => this.setShowIcon(true)} onMouseOut={() => this.setShowIcon(false)}>
                {value}
                {!this.state.showIcon ? "" :
                    <div style={{display: 'inline-block', float:'right', marginTop: '9px'}}>
                        <img src={cross}
                             alt={'cross'}
                             style={{cursor: 'pointer', float:'left'}}
                             onClick={()=> this.props.onDel()}
                        />
                    </div>
                }
            </div>
        )
    }

    componentWillMount () {
        this.inInput = false;
        this.setState({
            showIcon: false,
        });
    }

    setShowIcon (showIcon) {
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

export default MultiInput;