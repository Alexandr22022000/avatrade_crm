import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import StuffInput from "../../personal/components/StuffInput";
import setStoreStatus from "../async-actions/setStoreStatus";

class StoreEditor extends Component {
	state = {
		name: '',
		address: '',
		isNew: true,
	};

	render() {
		const confirm = (
			<div style={{textAlign: 'right', marginRight: '10px'}}>
				{!this.props.currentStore|| this.state.isNew ? "" :
					<div className={"inline sackButton link-decor pointed"} onClick={() => this.onChangeStoreStatus()}>{this.props.currentStore.status === 0 ? "Закрыть" : "Открыть"}</div>
				}

				<button className={`btn-m ${this.canSave()? 'blue-button': ''}`}
				        onClick={()=> this.onClose(true)}>
					Сохранить
				</button>
			</div>
		);
		return (
			<Modal bgClassName={"modalHolder"}
			       windowClassName={"stores-modal"}
			       header={this.props.currentStore? 'Редактировать подразделение': 'Добавить подразделение'}
			       childClassName={'stores-data'}
			       controls={confirm}
			       onClose={()=>this.onClose(false)}
			>
				<StuffInput placeholder={'имя подразделения'}
				            onChange={v => {this.setState({name: v})}}
				            value={this.state.name}
				            title={'Имя'}
				            alwaysActive={this.state.isNew}
				            style={{marginTop: '20px'}}
				/>
				<StuffInput placeholder={'адрес подразделения'}
				            onChange={v => {this.setState({address: v})}}
				            value={this.state.address}
				            title={'Адрес'}
				            alwaysActive={this.state.isNew}
				            style={{marginTop: '20px'}}
				/>
			</Modal>
		);
	}

	componentDidMount() {
		if(this.props.currentStore) {
			this.setState({
				name: this.props.currentStore.name,
				address: this.props.currentStore.address,
				isNew: false,
			})
		}
	}

	onClose (isSave) {
		if(isSave){
			if (this.canSave()) {
				console.log({props:{...this.props.currentStore},state:{...this.state}});
				if (this.props.currentStore === null) {
					this.props.onAddNewStore({name: this.state.name, address: this.state.address})
				}
				else {
					this.props.onChangeStore({
						id: this.props.currentStore.id,
						name: this.state.name,
						address: this.state.address
					})
				}
				this.props.onClose();
			}
		} else {
			this.props.onClose();
		}
	}

	canSave () {
		if(this.state.name.trim() === '') return false;
		if(this.state.address.trim() === '') return false;
		return true;
	}

	onChangeStoreStatus () {
		if (!window.confirm("Вы уверены?")) return;

		this.props.setStoreStatus(this.props.currentStore.status === 0 ? 1 : 0, this.props.currentStore.id);
		this.props.onClose();
	}
}

export default StoreEditor;