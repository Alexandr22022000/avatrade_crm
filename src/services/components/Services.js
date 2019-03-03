import React, {Component} from 'react';
import WarehouseInput from "../../warehouse/components/WarehouseInput";
import '../styles/Service.css';
import DropDown from "../../personal/components/DropDown";
import '../../warehouse/styles/index.css';

class Services extends Component{
	state = {
		servType: null,
		is_all: true,
	};
	render() {
		let servTypes = ['Все', 'Товары', 'Услуги'];
		let activeTypes = ['Все', 'Активные'];
		return (
			<div className={'services'}>
				<div className={'controlServices'}>
					<WarehouseInput className={'serv-search sv-search-sz inline'}
					                placeholder={'поиск'}
					                iconClassName={'sv-search-icon sv-search-icon-sz'}
					                haveIcon={true}
					                onClickIcon={() => {this.onSearchChange(this.props.filter.search)}}
					                onChange={(v) => {this.onSearchChange(v)}}
					/>
					<DropDown className={'dropdownPlaceholder sv-ctrl-dpd'}
					          options={servTypes}
					          holderStyle={{display: 'inline-block'}}
					          onChange={v => {this.servTypesChange(v)}}
					          value={servTypes[this.props.filter.servType]}
					/>
					<DropDown className={'dropdownPlaceholder sv-ctrl-dpd'}
					          options={activeTypes}
					          holderStyle={{display: 'inline-block'}}
					          onChange={v => {this.onActiveTypeChange(v)}}
					          value={this.getActiveValue()}
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

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		console.log(nextProps.filter);
		return true;
	}

	onSearchChange(v) {
		this.props.onFilterChange(v,this.props.filter.servType, this.props.filter.is_all);
	}

	servTypesChange(v) {
		if(v === 0){
			this.props.onFilterChange(this.props.filter.search,null,this.props.filter.is_all)
		}
		this.props.onFilterChange(this.props.filter.search,v,this.props.filter.is_all)
	}

	onActiveTypeChange(v) {
		if(v === 0) {
			this.props.onFilterChange(this.props.filter.search,this.props.filter.servType, true);
		}
		else {
			this.props.onFilterChange(this.props.filter.search,this.props.filter.servType, false);
		}
	}

	getActiveValue() {
		if(this.props.filter.is_all) {
			return 'Все';
		}
		else {
			return'Активные'
		}
	}
}

export default Services;