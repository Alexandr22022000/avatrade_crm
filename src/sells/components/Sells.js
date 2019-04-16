import React, {Component} from 'react';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

class Sells extends  Component {


    render () {
        {

        }
    }


    sellsTable() {
        const columns = [
            {
                title: '№',
                dataIndex: 'index',
                className: 'wc-index',
                key: 'index',
            },
            {
                title: 'Время',
                dataIndex: 'date',
                className: 'date',
                key: 'date'
            },
            {
                title: 'Менеджер',
                dataIndex: 'manager',
                className: 'manager',
                key: 'manager'
            },
            {
                title: 'Подразделение',
                dataIndex: 'store',
                className: 'store',
                key: 'store'
            },
            {
                title: 'Сумма',
                dataIndex: 'price',
                className: 'price',
                key: 'price'
            },
            {
                title: 'Услуги',
                dataIndex: 'services',
                className: 'services',
                key: 'services',
            }

        ];
        let data = [];
        for (let service of this.props.services)
        {
            data.push({
                index: 0,
                date: service.date,
                manager: service.manager,
                store: service.store,
                price: service.price,
                services: service.services.map((element, key)=>(<span key={key}>{element}<br/></span>))
            });
        }

        return  <Table
                    columns={columns}
                    data={data}
                    rowClassName={()=>''}
                    className=''
                />;

    }



};


export default Sells;


