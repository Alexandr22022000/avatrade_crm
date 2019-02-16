import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import StuffInput from "../../personal/components/StuffInput";

class StoreEditor extends Component {
	state = {
		name: '',
		address: '',
		alwaysActive: true,
	};

	render() {
		const confirm = (
			<div style={{textAlign: 'right', marginRight: '10px'}}>
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
				            alwaysActive={this.state.alwaysActive}
				            style={{marginTop: '20px'}}
				/>
				<StuffInput placeholder={'адрес подразделения'}
				            onChange={v => {this.setState({address: v})}}
				            value={this.state.address}
				            title={'Адрес'}
				            alwaysActive={this.state.alwaysActive}
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
				alwaysActive: false,
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
}

export default StoreEditor;