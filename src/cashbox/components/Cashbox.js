import React, {Component} from 'react';
import '../styles/Cashbox.css';
import '../../core/styles/buttons.css';
import WarehouseInput from "../../warehouse/components/WarehouseInput";

class Cashbox extends Component {
	render() {
		const products = [], services = [];

		if(this.props.fastServices) {
			for(let i in this.props.fastServices) {
				this.props.fastServices[i].is_product ?
					products.push(this.props.fastServices[i]) :
					services.push(this.props.fastServices[i]);
			}
		}

		return (
			<div className={'Cashbox'}>
				<div className={'cashbox-info cb-width cb-height inline'}>
					<div className={'cashbox-services inline'}>
						<div style={{textAlign: 'center', borderBottom: 'black solid 2px', padding: '5px'}}>
							Услуги
						</div>
						<WarehouseInput className={'cashbox-search'}
						                placeholder={'поиск'}
						                iconClassName={'warehouse-control-input-icon'}
						                inputClassName={'cashbox-search-input cb-search-input-width'}
						                haveIcon={true}
						                onClickIcon={() => {}}
						                onChange={(v) => {}}
						/>
						<div className={'cashbox-list'}>
							{services.map((value, index)=> <div key={index}>{value.name}</div>)}
						</div>
					</div>
					<div className={'cashbox-stocks inline'}>
						<div style={{textAlign: 'center', borderBottom: 'black solid 2px', padding: '5px'}}>
							Товары
						</div>
						<WarehouseInput className={'cashbox-search'}
						                placeholder={'поиск'}
						                iconClassName={'warehouse-control-input-icon'}
						                inputClassName={'cashbox-search-input'}
						                haveIcon={true}
						                onClickIcon={() => this.props.onGetStocks()}
						                onChange={(v) => this.onSearchChange(v)}
						/>
						<div className={'cashbox-list'}>
							{products.map((value,index) => <div key={index}>{value.name}</div>)}
						</div>
					</div>
				</div>
				<div className={'controlCashbox inline'}>
					<button className={'btn-m blue-button'}>Копия ЧБ</button>
					<button className={'btn-m blue-button'}>РНД</button>
					<button className={'btn-m blue-button'}>Печать ЧБ</button>
					<button className={'btn-m blue-button'}>Печать цветная</button>
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		console.log(nextProps.fastServices);
		return true;
	}

	componentDidMount() {
		this.props.onLoadFastServices();
	}
}

export default Cashbox;