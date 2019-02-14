import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import '../../core/styles/NavBar.css';


class AlertBox extends Component {
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
                    return this.showMigrateMsg(value, index);
                }) : ''}
            </Modal>
        )
    }

    showMigrateMsg(migration, index) {
        return (
            <div className={'migration-msg'} onClick={() => this.props.onShowMigrate(index)}>
                <h1>Логистика</h1>
                <p>{'Со склада: ' + migration.from}</p>
                <p>{'На склад: ' + migration.to}</p>
                <p>{'Отправитель: ' + migration.sender}</p>
                <p>Грузы:</p>
                <div>
                    {migration.stocks.map(stock => <p>{stock.name + " - " + stock.count}</p>)}
                </div>
            </div>
        )
    }
}

export default AlertBox;