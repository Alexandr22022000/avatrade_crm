import React, {Component, Fragment} from 'react';
import Modal from "../../core/components/Modal";
import CountableField from "../../core/components/CountableField";
import StuffInput from "../../personal/components/StuffInput";
import DropDown from "../../personal/components/DropDown";
import ServiceMCFEditor from "../containers/ServiceMCFEditor";

class ServicesModal extends Component{
    state = {
        price: 0,
        name:'',
        is_product: true,
    };
    render() {
        return (
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"sv-modal sv-modal-sz"}
                   header={this.props.addNew? 'Добавить' : 'Изменить'}
                   childClassName={'sv-child'}
                   controls={/*addButton*/''}
                   onClose={()=>this.onClose(false)}
            >
                {this.getEditor(this.props.addNew)}
            </Modal>
        );
    }

    getEditor(addNew) {
        return (
            <Fragment>

                <CountableField onChange={(v) => {console.log(v); this.setState({price: v})}}
                                value={this.state.price}
                                withoutRange={true}
                                styleInput={{textAlign: 'left', marginLeft: '6%'}}
                                placeHolder={'Цена'}
                                title={addNew?
                                    <StuffInput placeholder={'Название услуги'}
                                                onChange={v => {this.setState({name: v})}}
                                                value={this.state.name}
                                                alwaysActive={true}
                                                style={{marginLeft: '6%'}}
                                    /> :
                                    <div style={{marginLeft:'6%',fontSize:'24px'}}>{this.props.currentService.name}</div>
                                }
                />
                <div style={{marginLeft:'6%',fontSize:'24px'}}>Тип</div>
                <DropDown className={'dropdownPlaceholder sv-ctrl-dp'}
                          options={['Товар','Услуга']}
                          holderStyle={{display: 'inline-block'}}
                          onChange={v => {this.servTypeChange(v)}}
                          value={this.getServTypeValue()}
                />
                <ServiceMCFEditor/>
            </Fragment>
        )
    }

    getServTypeValue() {
        return this.state.is_product? 0: 1;
    }

    servTypeChange(value) {
        this.setState({is_product: value === 0})
    }

    onClose(isSave) {
        this.props.onClose();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps);
        return true;
    }
}

export default ServicesModal;