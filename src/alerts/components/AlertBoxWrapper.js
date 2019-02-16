import React, {Component} from 'react';
import MigrateDetails from "../../core/containers/MigrateDetails";
import AlertBox from "./AlertBox";


class AlertBoxWrapper extends Component {
    state = {
        showAlerts: false,
        showMigrateDetails: false
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
                {!this.state.showMigrateDetails ? (
                    ""
                ) : (
                    <MigrateDetails
                        onClose={() => {
                            this.setState({ showMigrateDetails: false });
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
                onShowMigrate={index => {
                    this.props.setActiveMigrate(this.props.migrates[index]);
                    this.setState({ showMigrateDetails: true });
                }}
                migrates={this.props.migrates}
                cargos={this.props.cargos}
                closed={!this.state.showAlerts}
            />
        );
    }

    showAlertBox() {
        this.setState({ showAlerts: true });
        this.props.onLoadCargos();
        this.props.onLoadMigrates();
    }
}

export default AlertBoxWrapper;