import React, {Component} from 'react';
import MigrateDetails from "../containers/MigrateDetails";
import RequestDetails from "../containers/RequestDetails";
import AlertBox from "../containers/AlertBox";
import '../styles/alert-box.css';
import NOTIFICATIONS from '../constants/notificationsTypes';


class AlertBoxWrapper extends Component {
    state = {
        showAlerts: false,
    };
    render() {
        return (
            <div id={"alerts"}>
                <div
                    className={`alert-icon`}
                    onClick={() => {
                        this.showAlertBox();
                    }}
                />
                <div className={"alert-box"}>{this.getAlertsBox()}</div>
                {this.props.selectedObjectType === null ? '' : this.getDetails()}
            </div>
        );
    }

    getAlertsBox() {
        return (
            <AlertBox
                onClose={() => {
                    this.setState({ showAlerts: false });
                }}
                closed={!this.state.showAlerts}
            />
        );
    }

    getDetails () {
        switch (this.props.selectedObjectType) {
            case NOTIFICATIONS.MIGRATION:
                return <MigrateDetails onClose={() => this.props.onCloseWindow()}/>;

            case NOTIFICATIONS.MIGRATION_REQUESTS:
                return <RequestDetails onClose={() => this.props.onCloseWindow()}/>;
        }
    }

    showAlertBox() {
        this.setState({ showAlerts: true });
        this.props.getNotifications();
    }
}

export default AlertBoxWrapper;