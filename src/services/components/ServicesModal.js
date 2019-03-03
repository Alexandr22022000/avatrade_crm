import React, {Component} from 'react';
import Modal from "../../warehouse/components/WarehouseModal";

class ServicesModal extends Component{
	render() {
		return (
			<Modal bgClassName={"modalHolder"}
			       windowClassName={"warehouse-modal"}
			       header={'Добавить'}
			       childClassName={'stocks'}
			       controls={/*addButton*/''}
			       onClose={()=>this.onClose(false)}
			>

			</Modal>
		);
	}
}

export default ServicesModal;