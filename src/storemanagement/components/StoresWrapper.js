import React, {Component} from 'react';
import '../styles/stores.css'
import StoreEditor from "../containers/StoreEditor";
import DropDown from "../../personal/components/DropDown";
import StuffEditor from "../../personal/containers/StuffEditor";

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

					<DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
							  options={['Действующие', 'Все']}
							  holderStyle={{display: 'inline-block'}}
							  value={this.props.is_all ? 1 : 0}
							  onChange={(v) => this.isAllChange(v)}
					/>

				</div>
				<div className={"stuffHolder"}>
					<div id={"stuffList-holder"}>
						<div id={"stuffHolder"}>
							<div style={{ minHeight: "4px" }} />
							{stores}
						</div>
					</div>
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

	isAllChange (value) {
		this.props.setIsAll(value === 1);
		this.props.onGetStores();
	}
}

export default StoresWrapper;