import React, {Component} from 'react';
import '../styles/stores.css'
import StoreEditor from "../containers/StoreEditor";

class StoresWrapper extends Component {
	state = {
		showEditor: false
	};
	render() {
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
					{this.props.stores.map((value, index) =>
						<div key={index} className={'store-holder'}
						     onClick={()=>{
						     	this.props.onSetCurrentStore(value);
						     	this.setState({showEditor: true});
						     }}>
							<div className={'store-title'}>{value.name}</div>
							<div className={'store-address'}>{value.address}</div>
						</div>
					)}
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