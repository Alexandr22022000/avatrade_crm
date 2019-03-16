import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import CashboxCountable from "./CashboxCountable";

class CashboxModal extends Component{
    render() {
        const controls = (
            <div>
                <button className={'btn-m blue-button cb-btn-w'}>Наличные</button>
                <button className={'btn-m blue-button cb-btn-w'}>Карта</button>
                <button className={'btn-m action-button cb-btn-w'}>Отмена</button>
            </div>
        );
        return (
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"cb-modal cb-modal-sz"}
                   header={'Продажа'}
                   childClassName={'cb-child'}
                   controls={controls}
                   onClose={()=>{this.props.onClose()}}
            >
                {this.props.sellServices? this.props.sellServices.map((value, index)=>
                    <CashboxCountable title={value.name}
                                      count={value.count}
                                      onClose={() => this.onDel(index)}
                                      key={index + ''}
                                      onChange={(v) => this.onChangeCount(v, index)}
                    />
                ): ''}
            </Modal>
        );
    }

    onDel(index) {
        let tmp = Object.assign([], this.props.sellServices);
        tmp.splice(index,1);
        this.props.onServicesChange(tmp);
    }

    componentDidMount() {
        this.props.onServicesChange([
            {name:'1', count:10},
            {name:'2', count:10},
            {name:'3', count:10},
        ]);
    }
    onChangeCount(value, index) {
        let tmp = Object.assign([], this.props.sellServices);
        tmp[index].count = value;
        this.props.onServicesChange(tmp);
    }
}

export default CashboxModal;