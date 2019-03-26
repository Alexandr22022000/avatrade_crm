import React, {Component} from 'react';
import '../styles/statistics.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import StuffInput from "../../personal/components/StuffInput";

const turnoverCellWidth = 100;
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
            <div className={'statistics'} style={{width: `${this.getWidth()}px`}}>
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
                width: turnoverCellWidth,
            },
            {
                title: 'ПКО',
                dataIndex: 'pco',
                className: 'pco',
                key: 'pco',
                width: turnoverCellWidth,
            },
            {
                title: 'Эквайринг',
                dataIndex: 'acquiring',
                className: 'acquiring',
                key: 'acquiring',
                width: turnoverCellWidth,
            },
            {
                title: 'По счету',
                dataIndex: 'account',
                className: 'account',
                key: 'account',
                width: turnoverCellWidth,
            },
            {
                title: 'РКО',
                dataIndex: 'rco',
                className: 'rco',
                key: 'rco',
                width: turnoverCellWidth,
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
                        <StuffInput value={ this.props.workCalendars[i].managers[+j].values[+k].value}
                                    numbers={true}
                                    alwaysActive={true}
                                    className={'wc-input'}
                        />);
                }
                tableData.push(tmpObj);
            }
            console.log(tableData);
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
            (turnoverCellWidth + 40) * this.props.turnover.length * 4 +
                workCalendarCellsWidths.name + workCalendarCellsWidths.all * 32 +
                paymentWidths.name + paymentWidths.salary + paymentWidths.salaryPay + 40
        );
    }

    componentDidMount() {
        this.props.onLoadStatistics((new Date()).getMilliseconds());
    }
}

export default Statistics;