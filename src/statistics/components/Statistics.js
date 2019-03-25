import React, {Component} from 'react';
import '../styles/statistics.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

const columns = [
    {
        title: 'title1',
        dataIndex: 'a',
        className: 'a',
        key: 'a',
        width: 100,
    },
    {
        id: '123',
        title: 'title2',
        dataIndex: 'b',
        className: 'b',
        key: 'b',
        width: 100,
    },
    {
        title: 'title3',
        dataIndex: 'c',
        className: 'c',
        key: 'c',
        width: 200,
    },
    {
        title: 'Operations',
        dataIndex: '',
        className: 'd',
        key: 'd',
        render() {
            return <a href="#">Operations</a>;
        },
    },
];

const data = [
    { a: '123', key: '1' },
    { a: 'cdd', b: 'edd', key: '2' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
    { a: '1333', c: 'eee', d: 2, key: '3' },
];

class Statistics extends Component {

    render() {
        return (
            <div className={'statistics'}>
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />
                <Table
                    columns={columns}
                    rowClassName={(record, i) => `row-${i}`}
                    expandedRowRender={record => <p>extra: {record.a}</p>}
                    expandedRowClassName={(record, i) => `ex-row-${i}`}
                    data={data}
                    className="table"
                />

            </div>
        );
    }
}

export default Statistics;