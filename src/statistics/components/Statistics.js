import React, {Component} from 'react';
import '../styles/statistics.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import DropDown from "../../personal/components/DropDown";


class Statistics extends Component {

    state = {
        wcValue: null,
        pValue: null,
        pIndex: null,
        rankId: null,
        rankNameValue: null,
        rankPaymentValue: null,
        rankChangeType: 0,
        isFirst: null,
        isSecond: null,
    };

    render() {
        const years = ['2016', '2017', '2018', '2019'];

        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
        let widths = this.props.turnover.length * (440 + 40) + (1255 + 40) + (420 + 40) + (330 + 40) + (260 + 40);
        return (
            <div className={'statistics-holder'}>
                <div className={'stats-controls'}>
                    <DropDown
                        className={'dropdownPlaceholder'}
                        holderClassName={'stats-dp'}
                        options={years}
                        value={this.getYearIndex(years)}
                        onChange={(v) => this.onChangeYear(years[v])}
                    />
                    <div className={'stats-months'}>
                        {months.map((value, index) => (
                            <button key={index}
                                    className={`${index === this.props.date.month? 'active' : ''}`}
                                    onClick={() => this.onChangeMonth(index)}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={'tmp-wrapper'}>
                    <div className={'statistics'} style={{minWidth:widths}}>
                        <div className={'table-holder to-table-holder'}>
                            {this.getTurnoverTables()}
                        </div>
                        <div className={'table-holder wc-table-holder'}>
                            {this.getWorkCalendarsTables()}
                        </div>
                        <div className={'table-holder p-table-holder'}>
                            {this.getSalaryTables()}
                        </div>
                        <div className={'table-holder p-table-holder'}>
                            {this.getPaymentTables()}
                        </div>
                        <div className={'table-holder p-table-holder'}>
                            {this.getRanksEditorTable()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getTurnoverTables() {
        const columns = [
            {
                title: 'Число',
                dataIndex: 'date',
                className: 'date',
                key: 'date',
            },
            {
                title: 'ПКО',
                dataIndex: 'pco',
                className: 'pco',
                key: 'pco',
            },
            {
                title: 'Эквайринг',
                dataIndex: 'acquiring',
                className: 'acquiring',
                key: 'acquiring',
            },
            {
                title: 'По счету',
                dataIndex: 'account',
                className: 'account',
                key: 'account',
            },
            {
                title: 'РКО',
                dataIndex: 'rco',
                className: 'rco',
                key: 'rco',
            },
        ];
        let data = [];
        for(let i in this.props.turnover) {
            let tableData = [];
            for(let j in this.props.turnover[i].values) {
                if(+j !== 0) {
                    tableData.push({
                        date: `${+j}.${this.props.date.month + 1}.${this.props.date.year}`,
                        pco: this.props.turnover[i].values[+j].pco,
                        acquiring: this.props.turnover[i].values[+j].acquiring,
                        account: this.props.turnover[i].values[+j].account,
                        rco: this.props.turnover[i].values[+j].rco,
                    })
                }
            }
            tableData.push({
                date: 'Итог по статье:',
                pco: Math.round(this.props.turnover[i].values[0].pco * 100)/100,
                acquiring: Math.round(this.props.turnover[i].values[0].acquiring * 100)/100,
                account: Math.round(this.props.turnover[i].values[0].account * 100)/100,
                rco: Math.round(this.props.turnover[i].values[0].rco * 100)/100,
            });
            tableData.push({
                date: 'Итого в кассе:',
                pco: Math.round(this.props.turnover[i].endValue * 100)/100,
                acquiring: '',
                account: '',
                rco: '',
            });
            tableData.push({
                date: 'Оборот точки:',
                pco: Math.round(this.props.turnover[i].turnoverValue * 100)/100,
                acquiring: '',
                account: '',
                rco: '',
            });
            data.push(
                    <Table
                        columns={columns}
                        rowClassName={() => `turnover-row`}
                        data={tableData}
                        className="table turnover"
                        title={() =>
                            <div className={'turnTitle'}>
                                <div className={'turnTitle-title'}>{this.props.turnover[i].name}</div>
                                <div className={'turnTitle-name'}>
                                    На начало месяца
                                </div>
                                <div className={'turnTitle-value'}>
                                    {Math.round(this.props.turnover[i].startValue * 100)/100}
                                </div>
                            </div>
                        }
                    />
            );
        }
        return data;
    }

    getWorkCalendarsTables() {
        let columns = [
            {
                title: '№',
                dataIndex: 'index',
                className: 'wc-index',
                key: 'index',
            },
            {
                title: 'Менеджер',
                dataIndex: 'name',
                className: 'wc-name',
                key: 'name',
            },
        ];
        for(let i = 0; i < 31; ++i) {
            columns.push(
                {
                    title: i + 1,
                    dataIndex: i + '',
                    className: 'wc-day',
                    key: i + '',
                }
            )
        }

        let data = [];
        for(let i in this.props.workCalendars) {
            let tableData = [];
            for(let j in this.props.workCalendars[i].managers) {
                let tmpObj = {};
                tmpObj.index = +j + 1;
                tmpObj.name = this.props.workCalendars[i].managers[+j].manager;
                for(let k in this.props.workCalendars[i].managers[+j].values) {
                    tmpObj[k + ''] = (
                        <div style={{width: 'inherit', height: 'inherit'}}>
                            {this.props.calendars.i === +i &&
                                this.props.calendars.j === +j &&
                                this.props.calendars.k === +k &&
                                this.props.workCalendars[i].canEdit?
                                <input value={this.state.wcValue}
                                       autoFocus={true}
                                       onBlurCapture={() => this.changeCalendarStatus({i,j,k}, false)}
                                       className={'wc-input'}
                                       onChange={(e) => this.onChangeCalendar(e.target.value)}
                                       onKeyDown={(e) => {
                                           this.onEnterKey(
                                               e,
                                               () => this.changeCalendarStatus({i,j,k}, false)
                                           )
                                       }}
                                />:
                                <div onClick={() => this.changeCalendarStatus({i,j,k}, true)}
                                     style={{width:'inherit'}}
                                >
                                    {this.props.workCalendars[i].managers[+j].values[+k].value}
                                </div>
                            }
                        </div>
                    );

                }
                tableData.push(tmpObj);
            }
            data.push(
                <Table
                    columns={columns}
                    rowClassName={() => `wc-row`}
                    data={tableData}
                    className="table wc-table"
                    title={() => this.props.workCalendars[i].title}
                />
            )
        }
        return data;
    }

    onChangeCalendar(value) {
        let regexp = /^\d*\.*\d*$/;
        if (regexp.test(value)) {
            this.setState({wcValue: value});
        }
    }

    changeCalendarStatus(indexes, isEditing){
        if(isEditing) {
            const val = this.props.workCalendars[+indexes.i].managers[+indexes.j].values[+indexes.k].value;
            this.setState({
                wcValue: val === 0 ? '' : val,
            });
            this.props.onSetCalendarsState({i: +indexes.i, j: +indexes.j, k: +indexes.k});
        } else {
            let values = [...this.props.workCalendars[+indexes.i].managers[+indexes.j].values];
            values[+indexes.k].value = this.state.wcValue === ''? 0: +this.state.wcValue;
            this.props.onSetCalendar(this.props.workCalendars[+indexes.i].managers[+indexes.j].id,values)
            this.props.onSetCalendarsState({i: null, j: null, k: null});
        }
    }

    getSalaryTables() {
        console.log(this.props.payment);
        const columns = [
            {
                title: 'Менеджер',
                dataIndex: 'name',
                className: 's-name',
                key: 'name',
            },
            {
                title: 'Оклад',
                dataIndex: 'salary',
                className: 's-salary',
                key: 'salary',
            },
            {
                title: 'По окладу',
                dataIndex: 'salaryPay',
                className: 's-salaryPay',
                key: 'salaryPay',
            },
            {
                title: 'Итого',
                dataIndex: 'sum',
                className: 's-sum',
                key: 'sum',
            },
        ];
        let data = [];
        for(let i in this.props.payment) {
            data.push({
                name: this.props.payment[i].manager,
                salary: Math.round(this.props.payment[i].salary * 100)/100,
                salaryPay: Math.round(this.props.payment[i].salaryPay * 100)/100,
                sum: Math.round(this.props.payment[i].all * 100)/100,
            })
        }
        if(data.length !== 0) {
            return (
                <Table
                    columns={columns}
                    rowClassName={() => `s-row`}
                    data={data}
                    className="table s-table"
                />
            )
        }
        return '';
    }

    getPaymentTables() {
        const columns = [
            {
                title: 'Менеджер',
                dataIndex: 'name',
                className: 'p-name',
                key: 'name',
            },
            {
                title: 'Выплачено',
                dataIndex: 'paid',
                className: 'p-paid',
                key: 'paid',
            },
            {
                title: 'Остаток',
                dataIndex: 'remains',
                className: 'p-remains',
                key: 'remains',
            },
        ];
        let data = [];
        for(let i in this.props.payment) {
            let tmpObj = {
                name: this.props.payment[i].manager,
                remains: Math.round(this.props.payment[i].needPay * 100)/100,
            };

            if(this.state.pIndex === i ) {
                tmpObj.paid = (
                    <input value={this.state.pValue}
                           autoFocus={true}
                           onBlurCapture={() => this.onChangePaidStatus(i, false)}
                           className={'wc-input p-input'}
                           onChange={(e) => this.onChangePaid(e.target.value)}
                           onKeyDown={(e) => {
                               this.onEnterKey(e, ()=>this.onChangePaidStatus(i, false))
                           }}
                    />
                )
            } else {
                tmpObj.paid = (
                    <div onClick={() => this.onChangePaidStatus(i, true)}>
                        {Math.round(this.props.payment[i].paid * 100)/100}
                    </div>
                )
            }

            data.push(tmpObj)
        }
        if(data.length !== 0) {
            return (
                <Table
                    columns={columns}
                    rowClassName={() => `p-row`}
                    data={data}
                    className="table p-table"
                />
            )
        }
        return ''
    }

    getRanksEditorTable() {
        let columns = [
            {
                title: '№',
                dataIndex: 'index',
                className: 'r-index',
                key: 'index',
            },
            {
                title: 'Ранг',
                dataIndex: 'rank',
                className: 'r-rank',
                key: 'rank',
            },
            {
                title: 'Выплаты',
                dataIndex: 'payment',
                className: 'r-payment',
                key: 'payment',
            }
        ];
        let data = [];
        this.props.ranks
            .forEach((value, index) => {
                let obj = {
                    index: index + 1,
                    rank: (
                        <div onClick={() => this.onSetRankIndex(index, 1)}>
                            {value.name}
                        </div>
                    ),
                    payment: (
                        <div onClick={() => this.onSetRankIndex(index, 2)}>
                            {value.payment}
                        </div>
                    )
                };
                if(this.state.rankId === value.id) {
                    switch (this.state.rankChangeType) {
                        case 1:
                            obj.rank = (
                                <input value={this.state.rankNameValue}
                                       autoFocus={true}
                                       onBlurCapture={() => this.onRankBlur()}
                                       className={'wc-input p-input'}
                                       onChange={(e) => this.onChangeRankName(e.target.value)}
                                       onKeyDown={(e) => {
                                           this.onEnterKey(e, () => this.onRankBlur())
                                       }}
                                />
                            );
                            break;
                        case 2:
                            obj.payment = (
                                <input value={this.state.rankPaymentValue}
                                       autoFocus={true}
                                       onBlurCapture={() => this.onRankBlur()}
                                       className={'wc-input p-input'}
                                       onChange={(e) => this.onChangeRankPayment(e.target.value)}
                                       onKeyDown={(e) => {
                                           this.onEnterKey(e, () => this.onRankBlur())
                                       }}
                                />
                            );
                            break;
                        case 0:
                        default:
                            break;
                    }
                }
                data.push(obj);
            });
        if(this.state.rankChangeType === -1) {
            data.push({
                index: data.length + 1,
                rank: (
                    <input value={this.state.rankNameValue}
                           autoFocus={true}
                           onBlurCapture={() => this.onFirstBlur()}
                           className={'wc-input p-input'}
                           onChange={(e) => this.onChangeRankName(e.target.value)}
                           onKeyDown={(e) => {
                               this.onEnterKey(e, () => this.onFirstBlur())
                           }}
                    />
                ),
                payment: (
                    <input value={this.state.rankPaymentValue}
                           onBlurCapture={() => this.onSecondBlur()}
                           className={'wc-input p-input'}
                           onChange={(e) => this.onChangeRankPayment(e.target.value)}
                           onKeyDown={(e) => {
                               this.onEnterKey(e, () => this.onSecondBlur())
                           }}
                    />
                ),
            });
        }
        if(data.length !== 0) {
            return (
                <div>
                    <Table
                        columns={columns}
                        rowClassName={() => 'r-row'}
                        data={data}
                        className={'table r-table'}
                    />
                    <button className={'btn-m blue-button r-btn'}
                            onClick={() => this.onAddNewLine()}
                    >
                        Добавить
                    </button>
                </div>
            )
        }
        return '';
    }

    onAddNewLine() {
        this.setState({
            rankNameValue: '',
            rankPaymentValue: 0,
            rankChangeType: -1,
            isFirst: true,
            isSecond: true,
        })
    }

    onFirstBlur() {
        if(!this.state.isSecond) {
            this.props.onAddRank(this.state.rankNameValue, this.state.rankPaymentValue);
            let state = {};
            state.rankId = null;
            state.rankNameValue = null;
            state.rankPaymentValue = null;
            state.rankChangeType = 0;
            state.isFirst = null;
            state.isSecond = null;
            this.setState(state)
        } else {
            this.setState({isFirst: false});
        }
    }

    onSecondBlur() {
        if(!this.state.isFirst) {
            this.props.onAddRank(this.state.rankNameValue, this.state.rankPaymentValue);
            let state = {};
            state.rankId = null;
            state.rankNameValue = null;
            state.rankPaymentValue = null;
            state.rankChangeType = 0;
            state.isFirst = null;
            state.isSecond = null;
            this.setState(state)
        } else {
            this.setState({isSecond: false});
        }
    }

    onChangeRankName(v) {
        this.setState({rankNameValue: v});
    }

    onChangeRankPayment(v) {
        let regexp = /^\d*\.*\d*$/;
        if (regexp.test(v)) {
            this.setState({rankPaymentValue: +v});
        }
    }

    onSetRankIndex(index, type) {
        let state = {};
        if(type === 0) {
            state.rankId = null;
            state.rankNameValue = null;
            state.rankPaymentValue = null;
        } else {
            state.rankId = this.props.ranks[index].id;
            state.rankPaymentValue = this.props.ranks[index].payment;
            state.rankNameValue = this.props.ranks[index].name;
        }
        state.rankChangeType = type;
        this.setState({...state});
    }

    onRankBlur() {
        this.props.onSetRank(this.state.rankId, this.state.rankNameValue, this.state.rankPaymentValue);
        this.setState({rankId: null, rankNameValue: null, rankPaymentValue: null});
    }

    componentDidMount() {
        this.props.onLoadStatistics();
        this.props.onLoadRanks();
    }

    getYearIndex(years) {
        for(let i in years) {
            if(this.props.date.year === +years[+i]) {
                return +i;
            }
        }
    }

    onChangeYear(v) {
        this.props.onSetDate({month: this.props.date.month, year: +v});
        this.props.onLoadStatistics();
    }

    onChangeMonth(index) {
        this.props.onSetDate({month: +index, year: this.props.date.year});
        this.props.onLoadStatistics();
    }

    onChangePaidStatus(index, isEditing) {
        if(isEditing) {
            this.setState({pValue: this.props.payment[index].paid, pIndex: index})
        } else {
            this.props.onSetPayment(this.props.payment[index].id, this.state.pValue);
            this.setState({pValue: null, pIndex: null});
        }
    }

    onChangePaid(value) {
        let regexp = /^\d*\.*\d*$/;
        if (regexp.test(value)) {
            this.setState({pValue: +value});
        }
    }

    onEnterKey(e, callback) {
        if(e.keyCode === 13) {
            callback();
        }
    }
}

export default Statistics;