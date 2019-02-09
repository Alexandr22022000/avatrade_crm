import React, {Component} from 'react';
import Modal from "./Modal";
import '../styles/NavBar.css'

class AlertsBox extends Component {
    render() {
        return(
            <Modal bgClassName={'alertbox-bg'}
                   windowClassName={'alertbox'}
                   childClassName={'alterbox-content'}
                   onClose={() => {this.props.onClose()}}
            >
                {this.props.migrates? this.props.migrates.map((value, index) => {
                    return <div key={index}>aaaa{value.id}</div>
                }) : ''}
            </Modal>
        )
    }

    componentDidMount() {
        this.props.onLoadMigrates();
    }
}

export default AlertsBox;