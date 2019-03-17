import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import '../../core/styles/buttons.css'

class MigrateDetails extends Component {
    render() {
        if (!this.props.selectedObject) {
            return (
                <Modal header={'Запрос на логистику'}
                       bgClassName={"modalHolder"}
                       windowClassName={"borders"}
                       childClassName={"modal"}
                       controlClassName={"saveButtonHolder"}
                       controls={''}
                       onClose={() => this.onClose(false)}
                />
            );
        }

        const addButton = (<div style={{textAlign:'right',paddingRight:'3%'}}>
            <button className={"btn-m inline blue-button"}
                    onClick={() => {this.onClose(true)}}
            >
                Распечатать
            </button>
        </div>);

        const inputs = this.props.selectedObject.stocks.map((item, index) => (
            <StuffInput
                onlyRead={true}
                value={item.ready + '/' + item.count}
                title={item.name}
            />
        ));

        return (
            <Modal header={'Запрос на логистику'}
                   bgClassName={"modalHolder"}
                   windowClassName={"borders"}
                   childClassName={"modal"}
                   controlClassName={"saveButtonHolder"}
                   controls={addButton}
                   onClose={()=> this.onClose(false)}
            >
                <StuffInput
                    onlyRead={true}
                    value={this.props.selectedObject.to}
                    title={'На склад'}
                />

                <StuffInput
                    onlyRead={true}
                    value={this.props.selectedObject.sender}
                    title={'Запросил'}
                />

                <h3>Грузы:</h3>

                {inputs}
            </Modal>
        )
    }

    onClose (isSave) {
        if(isSave){
            //this.props.onApproveMigrate(this.props.selectedObject.id);
            this.props.onClose();
        } else {
            this.props.onClose();
        }
    }
}

export default MigrateDetails;