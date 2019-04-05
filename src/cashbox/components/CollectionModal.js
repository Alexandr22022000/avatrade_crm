import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import StuffInput from "../../personal/components/StuffInput";

class CollectionModal extends Component {
    state = {
        value: 0,
    };
    render() {
        let controls = (
            <div style={{textAlign: 'right', marginRight: '4%'}}>
                <button className={'btn-m ' + (this.canSave()? 'blue-button' : '')}
                        onClick={() => this.onClose(true)}
                >
                    Забрать
                </button>
            </div>
        );
        return (
            <Modal  bgClassName={"col-modalHolder"}
                    windowClassName={"col-modal col-sz"}
                    header={'Инкассация'}
                    childClassName={'col-child'}
                    controls={controls}
                    onClose={()=> this.onClose(false)}
            >
                <StuffInput title={"Сумма, ₽:"}
                            value={this.state.value}
                            onChange={v => {this.onChange(v)}}
                            alwaysActive={true}
                />
            </Modal>
        );
    }

    onChange(v) {
        let regexp = /^\d*\.*\d*$/;
        if (regexp.test(v)) {
            this.setState({value: +v});
        }
    }

    canSave() {
        return this.state.value !== 0;
    }

    onClose(isSave) {
        if(isSave) {
            if(this.canSave() && window.confirm('Вы уверены, что хотите продолжить?')) {
                this.props.onCollect(this.props.storeId,this.state.value);
                this.props.onClose();
            }
        } else {
            this.props.onClose();
        }
    }
}

export default CollectionModal;