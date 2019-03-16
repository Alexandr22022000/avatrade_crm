import React, {Component, Fragment} from 'react';
import Modal from "../../core/components/Modal";
import CountableField from "../../core/components/CountableField";
import StuffInput from "../../personal/components/StuffInput";
import DropDown from "../../personal/components/DropDown";
import ServiceMCFEditor from "../containers/ServiceMCFEditor";
import '../../core/styles/buttons.css'

class ServicesModal extends Component{
    state = {
        price: this.props.addNew? 0: this.props.currentService.price,
        name: this.props.addNew? '': this.props.currentService.name,
        is_product: this.props.addNew? true: this.props.currentService.is_product,
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
        return (
            <Fragment>
                <div style={{marginLeft:'6%',fontSize:'24px'}}>Имя</div>
                <StuffInput placeholder={'Название услуги'}
                            onChange={v => {this.setState({name: v})}}
                            value={this.state.name}
                            style={{marginLeft: '6%'}}
                            alwaysActive={addNew}
                />
                <div style={{marginLeft:'6%',fontSize:'24px', marginTop:'20px'}}>Цена</div>
                <StuffInput placeholder={'Название услуги'}
                            onChange={v => {this.setState({price: +v})}}
                            value={this.state.price}
                            style={{marginLeft: '6%'}}
                            alwaysActive={addNew}
                            numbers={true}
                />
                <div style={{marginLeft:'6%',fontSize:'24px', marginTop:'20px'}}>Тип</div>
                <DropDown className={'dropdownPlaceholder sv-ctrl-dp'}
                          options={['Товар','Услуга']}
                          holderStyle={{display: 'inline-block'}}
                          onChange={v => {this.servTypeChange(v)}}
                          value={this.getServTypeValue()}
                />
                <div style={{marginLeft:'6%',fontSize:'24px', marginTop:'20px'}}>Расходные материалы</div>
                <ServiceMCFEditor/>
            </Fragment>
        )
    }

    getChangeStatusBtn() {
        return (
            <div style={{float:'left'}}>
                {this.props.addNew?
                    '':
                    (this.props.currentService?
                        <div className={'link-decor'}
                             onClick={()=>{
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
        console.log('1');
        if(isSave){
            console.log('2');
            if(this.canSave()) {
                console.log('3');
                if(this.props.addNew) {
                    console.log('4');
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps);
        return true;
    }
}

export default ServicesModal;