import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import '../../core/styles/NavBar.css';
import '../styles/alert-box.css';
import NOTIFICATIONS from '../constants/notificationsTypes';


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
                {this.props.notifications.map((value, index) => {
                    return this.showMigrateMsg(value, index);
                })}
            </Modal>
        )
    }

    showMigrateMsg(migration, index) {
        return (
            <div className={'migration-msg'} onClick={() => this.onShowDetails(index)}>
                <h1>{migration.title}</h1>
                <plaintext>{migration.text}</plaintext>
            </div>
        )
    }

    onShowDetails (index) {
        const id = this.props.notifications[index].id,
            type = this.props.notifications[index].type;
        this.props.onOpenDetails(type);

        switch (type) {
            case NOTIFICATIONS.MIGRATION:
                this.props.getMigrate(id);
                break;

            case NOTIFICATIONS.MIGRATION_REQUESTS:
                this.props.getRequest(id);
                break;
        }
    }
}

export default AlertBox;