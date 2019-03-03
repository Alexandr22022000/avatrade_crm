import React, {Component} from 'react';
import WarehouseInput from "../../warehouse/components/WarehouseInput";
import '../styles/Service.css';

class Services extends Component{
	state = {

	};
	render() {
		return (
			<div className={'services'}>
				<div className={'controlServices'}>
					<WarehouseInput className={'serv-search sv-search-sz'}
					                placeholder={'поиск'}
					                iconClassName={'sv-search-icon sv-search-icon-sz'}
					                haveIcon={true}
					                onClickIcon={() => {}}
					                onChange={(v) => {}}
					/>
				</div>
				<div className={'servicesTable st-sizes'}>
					<table>
						<tr>
							<td className={'st-left st-header-cell'}>
								Название
							</td>
							<td className={'st-middle st-header-cell'}>
								Стоимость
							</td>
							<td className={'st-right st-header-cell'}>
								Товар/Услуга
							</td>
						</tr>
					</table>
					<div className={'st-content'}>

					</div>
				</div>
			</div>
		);
	}
}

export default Services;