import React, {Component} from 'react';
import '../styles/Cashbox.css';
import WarehouseInput from "../../warehouse/components/WarehouseInput";

class Cashbox extends Component {
	render() {
		return (
			<div className={'Cashbox'}>
				<div className={'controlCashbox'}>

				</div>
				<div className={'cashbox-info cb-width cb-height'}>
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

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Cashbox;