import React, {Component} from 'react';
import '../styles/stores.css'
import StoreEditor from "../containers/StoreEditor";

class StoresWrapper extends Component {
	state = {
		showEditor: false
	};
	render() {
		const stores = this.props.stores.map(store => (
			<table
				onClick={()=>{
					this.props.onSetCurrentStore(store);
					this.setState({showEditor: true});
				}}
				style={{ cursor: "pointer", marginLeft: "8px" }}
			>
				<tbody>
				<tr>
					<td>
						<div className={"iconStore"} />
					</td>
					<td>
						<table>
							<tbody>
							<tr>
								<td style={{ textAlign: "left", fontSize: "25px" }}>
									{store.name}
								</td>
							</tr>
							<tr>
								<td style={{ textAlign: "left" }}>
									{store.address}
								</td>
							</tr>
							</tbody>
						</table>
					</td>
				</tr>
				</tbody>
			</table>
		));


		return (
			<div>
				<div className={'stores-controller'}>
					<button className={'btn-m blue-button'}
					        onClick={()=> {
					        	this.props.onSetCurrentStore(null);
					        	this.setState({showEditor: true});
					        }}>
						Добавить
					</button>
				</div>
				<div className={'stores-wrapper'}>
					{stores}
				</div>
				<div>
					{this.state.showEditor? <StoreEditor onClose={() => this.setState({showEditor: false})}/>: ''}
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.props.onGetStores();
	}
}

export default StoresWrapper;