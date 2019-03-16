import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import '../../core/styles/buttons.css'

class MigrateDetails extends Component {
    render() {
        const addButton = (<div style={{textAlign:'right',paddingRight:'3%'}}>
            <button className={"btn-m inline blue-button"}
                    onClick={() => {this.onClose(true)}}
            >
                Подтвердить получение
            </button>
        </div>);

        const inputs = this.props.selectedObject.stocks.map((item, index) => (
            <StuffInput
                onlyRead={true}
                value={item.count}
                title={item.name}
            />
        ));

        return (
            <Modal header={'Логистика'}
                   bgClassName={"modalHolder"}
                   windowClassName={"borders"}
                   childClassName={"modal"}
                   controlClassName={"saveButtonHolder"}
                   controls={addButton}
                   onClose={()=> this.onClose(false)}
            >
                <StuffInput
                    onlyRead={true}
                    value={this.props.selectedObject.from}
                    title={'Со склада'}
                />

                <StuffInput
                    onlyRead={true}
                    value={this.props.selectedObject.to}
                    title={'На склад'}
                />

                <StuffInput
                    onlyRead={true}
                    value={this.props.selectedObject.sender}
                    title={'Отправитель'}
                />

                <h3>Грузы:</h3>

                {inputs}
            </Modal>
        )
    }

    onClose (isSave) {
        if(isSave){
            this.props.onApproveMigrate(this.props.migrate.id);
            this.props.onClose();
        } else {
            this.props.onClose();
        }
    }
}

export default MigrateDetails;