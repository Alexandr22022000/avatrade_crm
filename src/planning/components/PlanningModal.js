import React, {Component, Fragment} from 'react';
import Modal from "../../core/components/Modal";
import StuffInput from "../../personal/components/StuffInput";
import TextArea from "../../core/components/TextArea";
import DateInput from "../../core/components/DateInput";
import {getStores} from "../../warehouse/async-actions/getStores";
import CheckBox from "../../core/components/CheckBox";


class PlanningModal extends Component {
    state = {
        isChanged: false,
        customer: this.props.order? this.props.order.customer: '',
        contacts: this.props.order? this.props.order.contacts: '',
        ready: this.props.order? this.props.order.ready: Date.now(),
        store_id: 0,
        return_store_id: 0,
        isByBudget: this.props.order? this.props.order.isbybudget : false,
        manager_id: this.props.order? this.props.order.manager_id: 0,
        name: this.props.order? this.props.order.name: '',
        description: this.props.order? this.props.order.description: '',
        price: this.props.order? this.props.order.price: 0,
        paid: this.props.order? this.props.order.paid: 0,
        note: this.props.order? this.props.order.note: '',
        status: this.props.order? this.props.order.status: 0,
        type: this.props.order? this.props.order.type: 0,
    };
    render() {
        let saveBtn = (
            <div style={{float:'right', paddingRight: '5px'}}>
                <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")}
                        style={{float: 'right'}}
                        onClick={() => {this.onClose(true)}}
                >
                    {this.props.isEditing? 'Изменить': 'Создать'}
                </button>
            </div>
        );
        return (
            <Modal header={(this.props.isEditing? 'Изменение' : 'Создание')}
                   windowClassName={"plan-modal"}
                   childClassName={'plan-chd'}
                   controls={saveBtn}
                   onClose={() => this.onClose(false)}
            >
                {this.getEditor()}
            </Modal>
        );
    }

    canSave() {
        if(this.state.customer.trim() === '') return false;
        if(this.state.name.trim() === '') return false;
        if(this.state.price <= 0) return false;
        return true;
    }

    onClose(isSave) {
        if(isSave) {
            if(this.canSave()) {
                if(this.props.isEditing) {
                    this.props.onPostOrder({
                        id: this.props.order.date,
                        customer: this.state.customer,
                        contacts: this.state.contacts,
                        ready: this.state.ready,
                        store_id: this.getStores()[this.state.store_id].id,
                        return_store_id: this.getStores()[this.state.return_store_id].id,
                        manager_id: this.props.managers[this.state.manager_id].id,
                        name: this.state.name,
                        description: this.state.description,
                        price: this.state.price,
                        paid: this.state.paid,
                        isByBudget: this.state.isByBudget,
                        note: this.state.note,
                        status: this.state.status,
                        type: this.state.type,
                    })
                } else {
                    this.props.onPostNewOrder({
                        customer: this.state.customer,
                        contacts: this.state.contacts,
                        ready: this.state.ready,
                        store_id: this.getStores()[this.state.store_id].id,
                        return_store_id: this.getStores()[this.state.return_store_id].id,
                        manager_id: this.props.managers[this.state.manager_id].id,
                        name: this.state.name,
                        description: this.state.description,
                        price: this.state.price,
                        paid: this.state.paid,
                        isByBudget: this.state.isByBudget,
                        note: this.state.note,
                        status: this.state.status,
                        type: this.state.type,
                    })
                }
                this.props.onClose();
            }
        } else {
            if(this.state.isChanged) {
                if(window.confirm('Вы уверены? Все не сохраненые изменения будут потеряны!')){
                    this.props.onClose();
                }
            } else {
                this.props.onClose();
            }
        }
    }

    getStores() {
        let stores = this.props.stores.map(value => ({id: value.id, name: value.name}));
        stores.shift();
        return stores;
    }

    getEditor() {
        let statuses    = [
            'В работу', 'Принят в работу', 'Готов на производстве',
                'В логистике', 'На подраздении', 'Выдан',
                'Отказ', 'На согласовании', 'На Яндекс диске',
                'В расчет', 'Расчитанно', 'Клиент оповещен'
            ],
            types       = ['Внутреннее производство (Желтый)', 'Работа менеджера (Синий)', 'Расчет (Оранжевый)', 'Перезаказ (Голубой)', 'Частичный перезаказ (Фиолетовый)', 'Работа дизайнера (Розовый)'];
        if(this.state) {
            return (
                <Fragment>
                    <StuffInput title={'Клиент:'}
                                alwaysActive={!this.props.isEditing}
                                value={this.state.customer}
                                onChange={(v) => this.setState({customer: v, isChanged: true})}
                    />
                    <TextArea title={'Контакты:'}
                              alwaysActive={!this.props.isEditing}
                              value={this.state.contacts}
                              onChange={(v) => this.setState({contacts: v, isChanged: true})}
                    />
                    <StuffInput title={'Подразделение:'}
                                value={this.state.store_id}
                                options={this.getStores().map(value =>  value.name)}
                                alwaysActive={!this.props.isEditing}
                                onChange={v => this.setState({store_id: v, isChanged: true})}
                    />
                    <StuffInput title={'Место выдачи:'}
                                value={this.state.return_store_id}
                                options={this.getStores().map(value =>  value.name)}
                                alwaysActive={!this.props.isEditing}
                                onChange={v => this.setState({return_store_id: v, isChanged: true})}
                    />
                    <div className={'header-m'}>Дата выдачи</div>
                    <DateInput date={new Date(+this.state.ready)}
                               onChange={date => this.setState({ready: date.getTime(), isChanged: true})}
                    />
                    <StuffInput title={'Заказ принял:'}
                                value={this.state.manager_id}
                                options={this.props.managers.map(value => value.name)}
                                alwaysActive={!this.props.isEditing}
                                onChange={v => this.setState({manager_id: v, isChanged: true})}
                    />
                    <StuffInput title={'Наименование:'}
                                alwaysActive={!this.props.isEditing}
                                value={this.state.name}
                                onChange={(v) => this.setState({name: v, isChanged: true})}
                    />
                    <TextArea title={'ТЗ:'}
                              alwaysActive={!this.props.isEditing}
                              value={this.state.description}
                              onChange={(v) => this.setState({description: v, isChanged: true})}
                    />
                    <StuffInput title={'Сумма ₽:'}
                                alwaysActive={!this.props.isEditing}
                                value={this.state.price}
                                onChange={(v) => this.setState({price: v === ''? 0 : +v, isChanged: true})}
                                numbers={true}
                    />

                    <CheckBox title={'Из бюджета'}
                              value={this.state.isByBudget}
                              onChange={(v) => this.setState({isByBudget: v===true})}
                    />

                    {this.state.isByBudget === false ? <StuffInput title={'Оплачено ₽:'}
                                alwaysActive={!this.props.isEditing}
                                value={this.state.paid}
                                onChange={(v) => this.setState({paid: v === ''? 0 : +v, isChanged: true})}
                                numbers={true}
                    /> : ''}
                    <TextArea title={'Примечание:'}
                              alwaysActive={!this.props.isEditing}
                              value={this.state.note}
                              onChange={(v) => this.setState({note: v, isChanged: true})}
                    />
                    <StuffInput title={'Статус:'}
                                value={this.state.status}
                                options={statuses}
                                alwaysActive={!this.props.isEditing}
                                onChange={v => this.setState({status: v, isChanged: true})}
                    />
                    <StuffInput title={'Тип:'}
                                value={this.state.type}
                                options={types}
                                alwaysActive={!this.props.isEditing}
                                onChange={v => this.setState({type: v, isChanged: true})}
                    />
                </Fragment>
            )
        }
        return '';
    }

    componentDidMount() {
        let store_id = 0,
            return_store_id = 0,
            manager_id = 0;

        if(this.props.order !== null) {
            this.getStores().forEach((value, index) => {
                if(+this.props.order.store_id === +value.id) {
                    store_id = index;
                }
                if(+this.props.order.return_store_id === + value.id) {
                    return_store_id = index;
                }
            });
            this.props.managers.forEach((value, index) => {
                if(+this.props.order.manager_id === +value.id) {
                    manager_id = index;
                }
            });
        }

        this.setState({
            store_id,
            return_store_id,
            manager_id,
        })
    }
}

export default PlanningModal;