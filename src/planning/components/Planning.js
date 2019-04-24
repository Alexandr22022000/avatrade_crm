import React, {Component} from 'react';
import Table from 'rc-table';
import '../styles/Planning.css';
import formatDate from "../../core/constants/formatDate";
import SearchInput from "../../core/components/SearchInput";
import DateFilter from "../../core/components/DateFilter";
import DropDown from "../../core/components/DropDown";
import PlanningModal from "../containers/PlanningModal";

class Planning extends Component {
    state = {
        storeIndex: null,
        managerIndex: null,
        typeIndex: null,
        statusIndex: null,
        day: 0,
        isEditing: true,
        showEditor: false,
    };
    render() {
        let stores      = ['Все подразделения'],
            managers    = ['Все менеджеры'],
            statuses    = [ 'Все статусы',
                'В работу', 'Принят в работу', 'Готов на производстве',
                'В логистике', 'На подраздении', 'Выдан',
                'Отказ', 'На согласовании', 'На Яндекс диске',
                'В расчет', 'Расчитанно', 'Клиент оповещщен'
            ],
            types       = ['Все типы', 'Внутреннее производство (Желтый)', 'Работа менеджера (Синий)', 'Расчет (Оранжевый)', 'Перезаказ (Голубой)', 'Частичный перезаказ (Фиолетовый)', 'Работа дизайнера (Розовый)'],
            date        = new Date(this.props.filter.start),
            days        = this.setDays(date.getFullYear(), date.getMonth());

        this.props.stores.forEach(value => stores.push(value.name));
        this.props.managers.forEach(value => managers.push(value.name));
        return (
            <div className={'planning'}>
                <div className={'plan-controls'}>
                    <SearchInput haveIcon
                                 value={this.props.filter.search}
                                 onChange={(v) => this.onSearchChange(v)}
                                 className={'plan-search'}
                    />
                    <DropDown
                        holderClassName={'sells-filters-holder inline'}
                        className={'sells-filters-input'}
                        options={managers}
                        value={this.state.managerIndex}
                        onChange={v => this.onManagerChange(v)}
                    />
                    <DropDown
                        holderClassName={'sells-filters-holder inline'}
                        className={'sells-filters-input'}
                        options={stores}
                        value={this.state.storeIndex}
                        onChange={v => this.onStoreChange(v)}
                    />
                    <DropDown
                        holderClassName={'sells-filters-holder inline'}
                        className={'sells-filters-input'}
                        options={days}
                        value={this.state.day}
                        onChange={v => this.onDaysChange(v)}
                    />
                    <DropDown
                        holderClassName={'sells-filters-holder inline'}
                        className={'sells-filters-input'}
                        options={statuses}
                        value={this.state.statusIndex}
                        onChange={v => this.onStatusChange(v)}
                    />
                    <DropDown
                        holderClassName={'sells-filters-holder inline'}
                        className={'sells-filters-input plan-type-fil'}
                        options={types}
                        value={this.state.typeIndex}
                        onChange={v => this.onTypeChange(v)}
                    />
                    <button className={'btn-m blue-button'}
                            onClick={() => {
                                this.props.onSetCurrentOrder(null);
                                this.setState({showEditor: true, isEditing: false});
                            }}
                    >
                        Добавить
                    </button>
                </div>
                <div className={'plan-tableHolder'}>
                    {this.getPlanningTable()}
                </div>
                <DateFilter year={date.getFullYear()}
                            onChangeYear={(v) => this.onYearChange(v)}
                            month={date.getMonth()}
                            onChangeMonth={(v) => this.onMonthChange(v)}
                />
                {this.state.showEditor?
                    <PlanningModal isEditing={this.state.isEditing}
                                   onClose={() => this.setState({showEditor: false})}
                    /> : ''
                }
            </div>
        );
    }

    setDays (year, month) {
        const days = [
            31, year % 4 ===0? 29 : 28, 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];
        let currentDays = ['-'];
        for(let i = 0; i < days[month]; ++i) {
            currentDays.push((i+1) + '');
        }
        return currentDays;
    }

    onYearChange(value) {
        let start = new Date(this.props.filter.start),
            end = new Date(this.props.filter.end);
        start.setFullYear(value);
        end.setFullYear(value);
        this.props.onUpdateFilter({...this.props.filter, start: start.getTime(), end: end.getTime()});
        this.props.onLoadOrders();
    }
    onMonthChange(value) {
        let start = new Date(this.props.filter.start),
            end = new Date(this.props.filter.end);
        start.setMonth(value);
        if(this.state.day === 0) {
            end.setMonth(start.getMonth() + 1);
        } else {
            end.setMonth(start.getMonth());
        }
        this.props.onUpdateFilter({...this.props.filter, start: start.getTime(), end: end.getTime()});
        this.props.onLoadOrders();
    }

    onDaysChange(value) {
        let start = new Date(this.props.filter.start),
            end = new Date(this.props.filter.start);
        console.log(end);
        if(value !== 0) {
            start.setDate(value);
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            end.setDate(value + 1);
            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);
        } else {
            start.setDate(1);
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            end.setMonth(start.getMonth() + 1);
            end.setDate(1);
            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);
        }
        this.props.onUpdateFilter({...this.props.filter, start: start? start.getTime(): null, end: end? end.getTime(): null});
        this.props.onLoadOrders();
        this.setState({day: value});
    }

    onStoreChange(value) {
        this.props.onUpdateFilter({...this.props.filter, store_id: value === 0? null: this.props.stores[value - 1].id});
        this.props.onLoadOrders();
        this.setState({storeIndex: value});
    }

    onManagerChange(value) {
        this.props.onUpdateFilter({...this.props.filter, manager_id: value === 0? null: this.props.managers[value - 1].id});
        this.props.onLoadOrders();
        this.setState({managerIndex: value});
    }

    onStatusChange(value) {
        this.props.onUpdateFilter({...this.props.filter, status: value === 0? null: value - 1});
        this.props.onLoadOrders();
        this.setState({statusIndex: value});
    }

    onTypeChange(value) {
        this.props.onUpdateFilter({...this.props.filter, type: value === 0? null: value - 1});
        this.props.onLoadOrders();
        this.setState({typeIndex: value});
    }

    getPlanningTable() {
        const columns   = [
            {
                title: '№',
                dataIndex: 'index',
                className: 'plan-index',
                key: 'index',
            },
            {
                title: 'Клиент',
                dataIndex: 'customer',
                className: 'plan-customer',
                key: 'customer',
            },
            {
                title: 'Контактные данные',
                dataIndex: 'contacts',
                className: 'plan-contacts',
                key: 'contacts',
            },
            {
                title: 'Дата заказа',
                dataIndex: 'date',
                className: 'plan-date',
                key: 'date',
            },
            {
                title: 'Готовность',
                dataIndex: 'ready',
                className: 'plan-ready',
                key: 'ready',
            },
            {
                title: 'Выдача',
                dataIndex: 'return_store',
                className: 'plan-rs',
                key: 'return_store',
            },
            {
                title: 'Подразделение',
                dataIndex: 'store',
                className: 'plan-store',
                key: 'store',
            },
            {
                title: 'Заказ приянл',
                dataIndex: 'manager',
                className: 'plan-manager',
                key: 'manager',
            },
            {
                title: 'Заказ',
                dataIndex: 'name',
                className: 'plan-name',
                key: 'name',
            },
            {
                title: 'Описание',
                dataIndex: 'description',
                className: 'plan-description',
                key: 'description',
            },
            {
                title: 'Сумма, ₽',
                dataIndex: 'price',
                className: 'plan-price',
                key: 'price',
            },
            {
                title: 'Оплачено, ₽',
                dataIndex: 'paid',
                className: 'plan-paid',
                key: 'paid',
            },
            {
                title: 'Статус заказа',
                dataIndex: 'status',
                className: 'plan-status',
                key: 'status',
            },
            {
                title: 'Примечание',
                dataIndex: 'note',
                className: 'plan-note',
                key: 'note',
            },
        ];
        let colors      = ['plan-yellow', 'plan-blue', 'plan-orange', 'plan-light-blue', 'plan-purple', 'plan-pink'],
            data        = [],
            statuses    = [
                'В работу', 'Принят в работу', 'Готов на производстве',
                'В логистике', 'На подраздении', 'Выдан',
                'Отказ', 'На согласовании', 'На Яндекс диске',
                'В расчет', 'Расчитанно', 'Клиент оповещщен'
            ];
        this.props.orders.forEach((value) => {
            data.push({
                ...value,
                index: (<div className={'plan-number ' + colors[+value.type]}>{value.number}</div>),
                date: formatDate(new Date(+value.date)),
                ready: formatDate(new Date(+value.ready)),
                status: statuses[value.status],
            })
        });
        let scrollW = window.screen.availHeight < 1000? window.screen.availHeight * 0.5 : window.screen.availHeight * 0.6;
        return (
            <Table columns={columns}
                   rowClassName={()=>'plan-rows'}
                   emptyText={'Нет данных'}
                   className={'plan-table'}
                   scroll={{y: scrollW}}
                   data={data}
                   onRow={(record, index) => ({
                       onClick: () => {
                           this.props.onSetCurrentOrder(this.props.orders[index]);
                           this.setState({showEditor: true, isEditing: true});
                       }
                   })}
            />
        )
    }

    componentDidMount() {
        let start = new Date();
        start.setDate(1);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);

        let end = new Date(start.getTime());
        end.setMonth(start.getMonth() + 1);
        end.setDate(1);
        end.setHours(0);
        end.setMinutes(0);
        end.setSeconds(0);

        this.props.onUpdateFilter({...this.props.filter, start: start.getTime(), end: end.getTime()});
        this.props.onLoadOrders();
        this.props.onGetStuff();
        this.props.onGetStores();
    }

    onSearchChange(v) {
        this.props.onUpdateFilter({...this.props.filter, search: v});
        this.props.onLoadOrders();
    }
}

export default Planning;