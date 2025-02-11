import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import CashboxCountable from "./CashboxCountable";

class CashboxModal extends Component{
    render() {
        let canSell = this.props.store !== -1 && this.props.sellServices.length !== 0;
        if (+this.props.store === 0) canSell = false;

        const controls = (
            <div>
                <button className={'btn-m cb-btn-w' + (canSell ? ' blue-button' : '')}
                        onClick={() => this.onSell(false)}
                >
                    Наличные
                </button>
                <button className={'btn-m cb-btn-w' + (canSell ? ' blue-button' : '')}
                        onClick={() => this.onSell(true)}
                >
                    Карта
                </button>
                <button className={'btn-m action-button cb-btn-w'}
                        onClick={() => this.props.onServicesChange([])}
                >
                    Отмена
                </button>
            </div>
        );

        let price = 0, salls = '';
        if (this.props.sellServices) {
            salls = this.props.sellServices.map((value, index)=> {
                price += value.price * value.count;

                return <CashboxCountable
                    title={value.name}
                    count={value.count}
                    onClose={() => this.onDel(index)}
                    key={index + ''}
                    onChange={(v) => this.onChangeCount(v, index)}
                />
            });
        }

        return (
            <Modal bgClassName={"cb-modalHolder"}
                   windowClassName={"cb-modal cb-modal-sz"}
                   header={'Стоимость: ' + price + ' ₽'}
                   childClassName={'cb-child'}
                   controls={controls}
                   onClose={()=>{}}
                   withoutCross={true}
            >
                {salls}
            </Modal>
        );
    }

    onSell(is_card) {
        if (this.props.store <= 0) return;

        if(this.props.sellServices.length !== 0) {
            this.props.onSell(is_card, this.props.sellServices.filter(value => value.count > 0));
        }
    }

    onDel(index) {
        let tmp = Object.assign([], this.props.sellServices);
        tmp.splice(index,1);
        this.props.onServicesChange(tmp);
    }

    onChangeCount(value, index) {
        let tmp = Object.assign([], this.props.sellServices);
        tmp[index].count = value;
        this.props.onServicesChange(tmp);
    }
}

export default CashboxModal;