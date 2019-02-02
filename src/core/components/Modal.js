import React, {Component} from 'react';
import cross from "../../images/cross-icon.png";

class Modal extends Component {

    render() {
        return(
            <div className={this.props.bgClassName} onClick={() => this.props.onClose()}>
                <div className={this.props.windowClassName} onClick={e => e.stopPropagation()}>
                    <div id={"cross"}>
                        <img
                            src={cross}
                            onClick={() => this.props.onClose()}
                            alt={"cross"}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div className={this.props.childClassName}>{this.props.children}</div>
                    <div className={this.props.controlClassName}>{this.props.controls}</div>
                </div>
            </div>
        )
    }
}

export default Modal;