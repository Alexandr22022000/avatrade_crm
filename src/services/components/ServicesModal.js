import React, {Component, Fragment} from 'react';
import Modal from "../../core/components/Modal";
import StuffInput from "../../personal/components/StuffInput";
import DropDown from "../../personal/components/DropDown";
import ServiceMCFEditor from "../containers/ServiceMCFEditor";
import '../../core/styles/buttons.css'
import {PERMISSIONS} from "../../core/constants";

class ServicesModal extends Component{
    state = {
        price: this.props.addNew? 0: this.props.currentService.price,
        name: this.props.addNew? '': this.props.currentService.name,
        is_product: this.props.addNew? true: this.props.currentService.is_product,
        canEdit: this.canEdit()
    };
    render() {
        let controls = (
            <div style={{textAlign: 'center', marginRight:'20px',marginLeft:'20px'}}>
                {this.getChangeStatusBtn()}
                <button className={'btn-m ' + (this.canSave()? 'blue-button':'')}
                        onClick={()=>this.onClose(true)}
                        style={{float:'right'}}
                >
                    {this.props.addNew? 'Добавить' : 'Сохранить'}
                </button>
            </div>);

        if (!this.state.canEdit) controls = '';
        return (
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"sv-modal sv-modal-sz"}
                   header={this.props.addNew? 'Добавить' : 'Изменить'}
                   childClassName={'sv-child'}
                   controls={controls}
                   onClose={()=>this.onClose(false)}
            >
                {this.getEditor(this.props.addNew)}
            </Modal>
        );
    }

    getEditor(addNew) {
        let list = <ServiceMCFEditor/>;
        if (!this.state.canEdit) {
            list = this.props.currentConsumables.map(item => {
                return <p style={{marginLeft: '30px', 'font-size': '30px'}}>{item.name + ' - ' + item.article + ': ' + item.count}</p>;
            });
        }

        return (
            <Fragment>
                <div style={{marginLeft:'6%',fontSize:'24px'}}>Имя</div>
                <StuffInput placeholder={'Название услуги'}
                            onChange={v => {this.setState({name: v})}}
                            value={this.state.name}
                            style={{marginLeft: '6%'}}
                            alwaysActive={addNew}
                            onlyRead={!this.state.canEdit}
                />
                <div style={{marginLeft:'6%',fontSize:'24px', marginTop:'20px'}}>Цена ₽</div>
                <StuffInput placeholder={'Цена услуги'}
                            onChange={v => {this.setState({price: +v})}}
                            value={this.state.price}
                            style={{marginLeft: '6%'}}
                            alwaysActive={addNew}
                            numbers={true}
                            onlyRead={!this.state.canEdit}
                />
                <div style={{marginLeft:'6%',fontSize:'24px', marginTop:'20px'}}>Тип</div>
                <DropDown className={'dropdownPlaceholder sv-ctrl-dp'}
                          options={['Товар','Услуга']}
                          holderStyle={{display: 'inline-block'}}
                          onChange={v => {this.servTypeChange(v)}}
                          value={this.getServTypeValue()}
                          onlyRead={!this.state.canEdit}
                />
                <div style={{marginLeft:'6%',fontSize:'24px', marginTop:'20px'}}>Расходные материалы</div>
                {list}
            </Fragment>
        )
    }

    getChangeStatusBtn() {
        if (!this.state.canEdit) return '';

        return (
            <div style={{float:'left'}}>
                {this.props.addNew?
                    '':
                    (this.props.currentService?
                        <div className={'link-decor'} style={{cursor: 'pointer'}}
                             onClick={()=>{
                                 if (!window.confirm("Вы уверены?")) return;

                                 this.props.onChangeServiceStatus(
                                     this.props.currentService.id,
                                     this.props.currentService.status === 1? 0: 1
                                 );
                                 this.props.onClose();
                             }}
                        >
                            {this.props.currentService.status===1? 'Восстановить' : 'Удалить'}
                        </div> :
                        ''
                    )
                }
            </div>
        )
    }

    getServTypeValue() {
        return this.state.is_product? 0: 1;
    }

    setConsumablesIds() {
        let currentConsumables = Object.assign([], this.props.currentConsumables);
        for (let i = 0; i < currentConsumables.length;) {
            if(currentConsumables[i].cargoIndex === -1) {
                currentConsumables.splice(i,1);
            } else {
                currentConsumables[i].id = this.props.cargos[currentConsumables[i].cargoIndex].id;
                ++i;
            }
        }
        this.props.onSetConsumables(currentConsumables);
    }

    servTypeChange(value) {
        this.setState({is_product: value === 0})
    }

    canSave () {
        if (this.state.name === '') return false;
        if (this.state.price === 0) return false;
        return true;
    }

    onClose(isSave) {
        this.setConsumablesIds();
        if(isSave){
            if(this.canSave()) {
                if(this.props.addNew) {
                    this.props.onAddNewService(
                        this.state.name,
                        this.state.price,
                        this.state.is_product,
                        this.props.currentConsumables
                    );
                    this.props.onClose();
                } else {
                    this.props.onChangeCurrentService(
                        this.props.currentService.id,
                        this.state.name,
                        this.state.price,
                        this.state.is_product,
                        this.props.currentConsumables
                    );
                    this.props.onClose();
                }
            }
        } else {
            this.props.onClose();
        }
    }

    componentDidMount() {
        this.props.onGetCargos();
        if(!this.props.addNew) {
            this.props.onSetConsumables(this.props.currentService.consumables);
        } else {
            this.props.onSetConsumables([]);
        }
    }

    canEdit () {
        let isCan = false;
        this.props.permissions.forEach(permission => {
            if (permission === PERMISSIONS.OWNER || permission === PERMISSIONS.TOP_MANAGER)
                isCan = true;
        });

        return isCan;
    }
}

export default ServicesModal;