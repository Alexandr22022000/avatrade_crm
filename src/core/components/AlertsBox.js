import React, {Component} from 'react';
import Modal from "./Modal";
import '../styles/NavBar.css'

class AlertsBox extends Component {
    render() {
        return(
            <Modal bgClassName={`alertbox-bg ${this.props.closed? 'alertbox-bg-hidden' : ''}`}
                   windowClassName={`alertbox ${this.props.closed? 'alertbox-hidden':''}`}
                   childClassName={'alterbox-content'}
                   onClose={() => {this.props.onClose()}}
                   leftCross={true}
                   borders={true}
                   header={'Уведомления'}
            >
                {this.props.migrates? this.props.migrates.map((value, index) => {
                    return <div key={index}>{this.showMigrateMsg(value)}</div>
                }) : ''}
            </Modal>
        )
    }

    onApproveMigrateClick(id) {
        this.props.onApproveMigrate(id);
    }

    showMigrateMsg(migration) {
        return (
            <div className={'migration-msg'}>
                <div className={'title'}><h1>Логистика</h1></div>
                <div className={'from'}>
                    <h2>Отправитель:</h2>
                    <span>{migration.from}</span>
                </div>
                <div className={'to'}>
                    <h2>Получатель:</h2>
                    <span>{migration.to}</span>
                </div>
                <div className={'id'}>
                    <h2>Идентификатор:</h2>
                    <span>{migration.id}</span>
                </div>
                <div className={'stocks-list inline'}>
                    <h2>Содержимое:</h2>
                    {migration.stocks.map((value, index) => {
                        let cargo = this.getCargoById(value.id);
                        if(cargo) return <span>{cargo.name} - {value.count}</span>
                        else  return ''
                    })}
                </div>
                <div className={'migration-confirm inline'}>
                    <button className={'btn-m blue-button'}
                            onClick={()=>this.onApproveMigrateClick(migration.id)}
                    >
                        Подтвердить
                    </button>
                </div>
            </div>
        )
    }

    getCargoById(id) {
        console.log(id);
        console.log(this.props.cargos);
        for(let key in this.props.cargos) {
            if(this.props.cargos[key].id === id){
                return this.props.cargos[key];
            }
        }
    }
}

export default AlertsBox;