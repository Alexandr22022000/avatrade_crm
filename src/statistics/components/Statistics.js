import React, {Component, Fragment} from 'react';
import '../styles/statistics.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

const workCalendarCellsWidths = {
    all: 46,
    name: 170,
};
const paymentWidths = {
    name: 300,
    salary: 100,
    salaryPay: 200,
};


class Statistics extends Component {
    render() {
        return (
            <div className={'statistics'} style={{minWidth: `${this.getWidth()}px`}}>
                <div className={'table-holder to-table-holder'}>
                    {this.getTurnoverTables()}
                </div>
                <div className={'table-holder wc-table-holder'}>
                    {this.getWorkCalendarsTables()}
                </div>
                <div className={'table-holder p-table-holder'}>
                    {this.getPaymentTables()}
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
                tableData.push({
                    date: `${+j + 1}.${+i+1}`,
                    pco:this.props.turnover[i].values[+j].pco,
                    acquiring: this.props.turnover[i].values[+j].acquiring,
                    account: this.props.turnover[i].values[+j].account,
                    rco: this.props.turnover[i].values[+j].rco,
                })
            }
            data.push(
                    <Table
                        columns={columns}
                        rowClassName={() => `turnover-row`}
                        data={tableData}
                        className="table turnover"
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
                            {this.props.calendars && this.props.calendars[+i][+j][+k]?
                                <input value={this.props.workCalendars[i].managers[+j].values[+k].value}
                                       autoFocus={true}
                                       onBlurCapture={() => this.changeCalendarStatus({i,j,k}, false)}
                                       className={'wc-input'}
                                       onChange={() => {}}
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
                />
            )
        }
        return data;
    }

    onChangeCalendar(value) {

    }

    changeCalendarStatus(indexes, isEditing){
        let calendars = [...this.props.calendars];
        calendars[+indexes.i][+indexes.j][+indexes.k] = isEditing;
        console.log(calendars);
        this.props.onSetCalendarsState(calendars);
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
                title: 'Зарплата',
                dataIndex: 'salary',
                className: 'p-salary',
                key: 'salary',
            },
            {
                title: 'Фактическая Зарплата',
                dataIndex: 'salaryPay',
                className: 'p-salaryPay',
                key: 'salaryPay',
            },
        ];
        let data = [];
        for(let i in this.props.payment) {
            data.push({
                name: this.props.payment[i].manager,
                salary: this.props.payment[i].salary,
                salaryPay: this.props.payment[i].salaryPay,
            })
        }
        return (
            <Table
                columns={columns}
                rowClassName={() => `p-row`}
                data={data}
                className="table p-table"
            />
        )
    }

    getWidth() {
        return (
            400 * this.props.turnover.length +
                workCalendarCellsWidths.name + workCalendarCellsWidths.all * 32 +
                paymentWidths.name + paymentWidths.salary + paymentWidths.salaryPay + 40
        );
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        if(this.init && this.props.workCalendars.length !== 0) {
            this.init = false;
            let calendars = [];
            for (let i in this.props.workCalendars) {
                let tmpTable = [];
                for(let j in this.props.workCalendars[i].managers) {
                    let tmpRow = [];
                    for (let k in this.props.workCalendars[i].managers[+j].values) {
                        tmpRow.push(false);
                    }
                    tmpTable.push(tmpRow);
                }
                calendars.push(tmpTable);
            }
            console.log(calendars);
            this.props.onSetCalendarsState(calendars);
        }
    }

    componentDidMount() {
        this.props.onLoadStatistics((new Date()).getMilliseconds());
        this.init = true;
    }
}

export default Statistics;