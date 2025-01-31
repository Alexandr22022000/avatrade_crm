import React, {Component} from 'react';
import SearchInput from "../../core/components/SearchInput";
import '../styles/Service.css';
import ServicesModal from "../containers/ServicesModal";
import DropDown from "../../core/components/DropDown";
import {checkPermissions, PERMISSIONS} from "../../core/constants";

class Services extends Component{
    state = {
        showServiceEditor: false,
        addNew: null,
    };
    render() {
        return (
            <div className={'services'}>
                <div className={'controlServices'}>
                    <SearchInput className={'serv-search sv-search-sz inline'}
                                 placeholder={'поиск'}
                                 iconClassName={'sv-search-icon sv-search-icon-sz'}
                                 haveIcon={true}
                                 onClickIcon={() => {this.props.onLoadServices();}}
                                 onChange={(v) => {this.onSearchChange(v)}}
                    />
                    <DropDown className={'dropdownPlaceholder sv-ctrl-dp'}
                              options={['Все', 'Товары','Услуги']}
                              holderStyle={{display: 'inline-block'}}
                              onChange={v => {this.servTypeChange(v)}}
                              value={this.getServTypeValue()}
                    />
                    <DropDown className={'dropdownPlaceholder sv-ctrl-dp'}
                              options={['Действующие','Удаленные']}
                              holderStyle={{display: 'inline-block'}}
                              onChange={v => {this.setStatusChange(v)}}
                              value={this.getServStatus()}
                    />
                    {checkPermissions(this.props.permissions || [], [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER]) ?
                        <button className={'btn-m blue-button sv-ctrl-btn'}
                            onClick={()=>{this.setState({showServiceEditor: true, addNew: true})}}
                    >
                        Добавить
                    </button> : ''
                    }
                </div>
                <div className={'servicesTable st-sizes'}>
                    <table>
                        <tbody>
                        <tr>
                            <td className={'st-left st-header-cell'}>
                                Название
                            </td>
                            <td className={'st-middle st-header-cell'}>
                                Стоимость ₽
                            </td>
                            <td className={'st-right st-header-cell'}>
                                Товар/Услуга
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={'sv-content'}>
                        <table>
                            <tbody>
                            {this.showServices()}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.showServiceEditor ?
                    <ServicesModal onClose={()=> this.setState({showServiceEditor: false})}
                                   addNew={this.state.addNew}
                    />:
                    ''
                }
            </div>
        );
    }

    servTypeChange(value) {
        if(value === 0) {
            this.props.onFilterChange(this.props.filter.search,null, this.props.filter.is_del);
        } else if(value === 1) {
            this.props.onFilterChange(this.props.filter.search, true, this.props.filter.is_del);
        } else {
            this.props.onFilterChange(this.props.filter.search, false, this.props.filter.is_del);
        }
        this.props.onLoadServices();
    }

    getServTypeValue() {
        switch (this.props.filter.is_product) {
            case true:
                return 1;
            case false:
                return 2;
            default:
                return 0;
        }
    }

    showServices() {
        let services = [];

        this.props.services.map((value,index)=> {
            services.push(
                <tr key={index}
                    onClick={()=> {
                        this.props.onSetCurrentService(this.props.services[index]);
                        this.setState({showServiceEditor: true, addNew: false});
                    }}
                    className={'sv-tb-line'}
                >
                    <td className={'sv-tb-name'}>{value.name}</td>
                    <td className={'sv-tb-price'}>{value.price}</td>
                    <td className={'sv-tb-st'}>{value.is_product ? 'Товар' : 'Услуга'}</td>
                </tr>
            )
        });
        return services;
    }

    setStatusChange(val) {
        val === 1? this.props.onFilterChange(this.props.filter.search, this.props.filter.is_product, true):
            this.props.onFilterChange(this.props.filter.search, this.props.filter.is_product, false);
        this.props.onLoadServices();
    }

    getServStatus() {
        if(this.props.filter.is_del) return 1;
        return 0;
    }

    onSearchChange(v) {
        this.props.onFilterChange(v, this.props.filter.is_product, this.props.filter.is_del);
        this.props.onLoadServices();
    }

    componentDidMount() {
        this.props.onFilterChange('', null, false);
        this.props.onLoadServices();
        this.props.onGetCargos();
    }
}

export default Services;