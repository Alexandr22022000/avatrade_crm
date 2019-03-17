import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import CashboxCountable from "./CashboxCountable";

class CashboxModal extends Component{
    render() {
        const controls = (
            <div>
                <button className={'btn-m blue-button cb-btn-w'}
                        onClick={() => this.onSell(false)}
                >
                    Наличные
                </button>
                <button className={'btn-m blue-button cb-btn-w'}
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
                   borders={true}
            >
                {salls}
            </Modal>
        );
    }

    onSell(is_card) {
        if(this.props.sellServices.length !== 0) {
            this.props.onSell(is_card, this.props.sellServices.filter(value => value.count > 0));
            this.props.onServicesChange([])
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