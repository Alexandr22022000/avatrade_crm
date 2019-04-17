import React, {Component} from 'react';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import '../styles/Sells.css';
import DateFilter from "../../core/components/DateFilter";
import formatDate from '../../core/constants/formatDate'

class Sells extends  Component {


    render () {
        return(
            <div>
                <div className='sell-filters'>

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

            data.push({
                index: 0,
                date: formatDate(_date),
                manager: sell.manager,
                store: sell.store,
                price: sell.price,
                services: 'да'
            });
        }

        return data.length!==0? <Table
                    columns={columns}
                    data={data}
                    rowClassName={()=>'sells-rows'}
                    className='sells-table'
                /> :
            <div className='sells-nodata'>
                <div>Нет данных</div>
            </div>;

    }

    componentWillMount(){
        this.props.onGetSells();
    }

    onChangeYear(v) {
        this.props.onSetDate({month: this.props.date.month, year: +v, day: this.props.date.day});
        this.props.onGetSells();
    }

    onChangeMonth(index) {
        this.props.onSetDate({month: +index, year: this.props.date.year, day: this.props.date.day});
        this.props.onGetSells();
    }

    onChangeDay (v) {
        this.props.onSetDate({month: this.props.date.month, year: this.props.date.year, day: v})
        this.props.onGetSells();
    }

};


export default Sells;


