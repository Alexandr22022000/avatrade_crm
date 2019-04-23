import React, {Component} from 'react';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import '../styles/Sells.css';
import DateFilter from "../../core/components/DateFilter";
import {formatDateTime}  from '../../core/constants/formatDate';
import DropDown from "../../core/components/DropDown";
import SearchInput from "../../core/components/SearchInput";



class Sells extends  Component {
    state = {
        store_id: 0,
        manager_id: 0,
        day: 0
    };

    render () {
        let stores = this.props.stores.map(v=>v.name);
        let managers = this.props.managers.map(v=>v.name);
        let days = this.setDays(this.props.date.year,this.props.date.month);
        stores.unshift('Все');
        managers.unshift('Все');
        days.unshift('-');
        return(
            <div>
                <div className='sell-filters'>
                    <SearchInput
                        className='sell-filters-search'
                        haveIcon
                        value={this.props.search}
                        onChange={v => this.onChangeSearch(v)}
                    />
                    <DropDown
                        holderClassName='sells-filters-holder inline'
                        className='sells-filters-input'
                        options={stores}
                        value={this.state.store_id}
                        onChange={v => this.onStoreChange(v)}

                    />
                    <DropDown
                        holderClassName='sells-filters-holder inline'
                        className='sells-filters-input'
                        options={managers}
                        value={this.state.manager_id}
                        onChange={v => this.onManagerChange(v)}

                    />
                    <DropDown
                        holderClassName='sells-filters-holder inline'
                        className='sells-filters-input'
                        options={days}
                        value={this.state.day}
                        onChange={v => this.onChangeDay(v)}

                    />
                </div>
                <DateFilter
                    year={this.props.date.year}
                    onChangeYear={(v) => this.onChangeYear(v)}
                    month={this.props.date.month}
                    onChangeMonth={(v) => this.onChangeMonth(v)}
                />
                <div className='sells-table-holder'>
                    {this.sellsTable()}
                </div>
            </div>
        );


    }


    sellsTable() {
        const columns = [
            {
                title: '№',
                dataIndex: 'index',
                className: 'sells-index',
                key: 'index',
            },
            {
                title: 'Время',
                dataIndex: 'date',
                className: 'sells-date',
                key: 'date'
            },
            {
                title: 'Менеджер',
                dataIndex: 'manager',
                className: 'sells-manager',
                key: 'manager'
            },
            {
                title: 'Подразделение',
                dataIndex: 'store',
                className: 'sells-store',
                key: 'store'
            },
            {
                title: 'Сумма',
                dataIndex: 'price',
                className: 'sells-price',
                key: 'price'
            },
            {
                title: 'Услуги',
                dataIndex: 'services',
                className: 'sells-services',
                key: 'services',
            }

        ];
        let data = [];
        for (let sell of this.props.sells)
        {
            let _date = new Date();
            _date.setTime(sell.date);
            console.log(new Date(), _date);
            data.push({
                index: sell.number,
                date: formatDateTime(_date),
                manager: sell.manager,
                store: sell.store,
                price: sell.price,
                services: this.services(sell.services)
            });
        }

        let scrollW = window.screen.availHeight < 1000? window.screen.availHeight * 0.5 : window.screen.availHeight * 0.7;
        return <Table
                    columns={columns}
                    data={data}
                    scroll={{y: scrollW}}
                    rowClassName={()=>'sells-rows'}
                    className='sells-table'
                    emptyText='Нету данных'
                />

    }

    services(services) {
        return  (<div>
            {services.map((element,key)=>(
            <div key={key}>
                {`${element.name} - ${element.count}`}
                <br/>
            </div>
            ))}
        </div>)
    }

    componentWillMount(){
        this.props.onGetSells();
        this.props.onGetStuff();
        this.props.onGetStores();
    }

    onChangeYear(v) {
        this.props.onSetDate({month: this.props.date.month, year: v, day: this.props.date.day});
        this.props.onGetSells();
    }

    onChangeMonth(index) {
        this.props.onSetDate({month: +index, year: this.props.date.year, day: this.props.date.day});
        this.props.onGetSells();
    }

    onChangeDay (v) {
        this.setState({day: v});
        this.props.onSetDate({month: this.props.date.month, year: this.props.date.year, day: v===0?null:v});
        this.props.onGetSells();
    }

    onStoreChange (v) {
        this.setState({store_id: v});
        this.props.onSetStoreId(v===0?null:this.props.stores[v-1].id);
        this.props.onGetSells();
    }

    onManagerChange (v) {
        this.setState({manager_id: v});
        this.props.onSetManagerId(v===0?null:this.props.managers[v-1].id);
        this.props.onGetSells();
    }

    onChangeSearch (v) {
        this.props.onSetSearch(v);
        this.props.onGetSells();
    }

    setDays (year, month) {
        const days = [
            31, year % 4 ===0? 29 : 28, 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];
        let currentDays = [];
        for(let i = 0; i < days[month]; ++i) {
            currentDays.push((i+1) + '');
        }
        return currentDays;
    }
};


export default Sells;


