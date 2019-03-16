import React, {Component} from 'react';
import MigrateDetails from "../containers/MigrateDetails";
import AlertBox from "../containers/AlertBox";


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
                {this.props.selectedObjectType === null ? (
                    ""
                ) : (
                    <MigrateDetails
                        onClose={() => {
                            this.props.onCloseWindow();
                        }}
                    />
                )}
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

    showAlertBox() {
        this.setState({ showAlerts: true });
        this.props.getNotifications();
    }
}

export default AlertBoxWrapper;