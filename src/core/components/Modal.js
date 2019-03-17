import React, {Component} from 'react';
import cross from "../../images/cross-icon.png";

class Modal extends Component {

    render() {
        const borderParams = this.props.borders ? '#555555 solid 1px' : '';
        const crossBorders = {borderBottom:borderParams};
        const styles = {
            cross: crossBorders,
        };
        return(
            <div className={this.props.bgClassName} onClick={() => this.props.onClose()}>
                <div className={this.props.windowClassName} onClick={e => e.stopPropagation()}>
                    <div id={'modalHeader'} style={{borderBottom:borderParams}}>
                        <div id={'headerName'}>{this.props.header? this.props.header: ''}</div>
                        {this.props.withoutCross?'': <img
                            src={cross}
                            onClick={() => this.props.onClose()}
                            alt={"cross"}
                            style={{ cursor: "pointer", ...styles.cross}}
                            className={`${this.props.leftCross? 'left':'right'}`}
                        />}
                    </div>

                    <div className={this.props.childClassName}>{this.props.children}</div>
                    <div className={this.props.controlClassName}>{this.props.controls}</div>
                </div>
            </div>
        )
    }
}

export default Modal;