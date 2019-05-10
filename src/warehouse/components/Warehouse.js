import React, {Component} from 'react';
import '../../core/styles/buttons.css'
import '../styles/index.css'
import SearchInput from "../../core/components/SearchInput";
import WarehouseModal from "../containers/WarehouseModal";
import MigrateEditor from "../containers/MigrateEditor";
import CargoEditor from "../containers/CargoEditor";
import DropDown from "../../core/components/DropDown";
import {checkPermissions, PERMISSIONS} from "../../core/constants";

class Warehouse extends Component {
    state = {
        showEditor: false,
        showMigrate: false,
        showStockEditor: false,
        isRequest: false,
        is_all: true,
        store: -1,
        searchStocks: '',
    };

    createItem (value, index, isBuffer) {
        if (!value) return (
            <tr>

            </tr>
        );
        const minWidth = `${value.stocks.length * 122 - 2}px`;
        return (
            <tr className={'wh-table-row'}
                onClick={() => {
                    if (checkPermissions(this.props.permissions || [], [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.WAREHOUSE_MANAGER])) {
                        this.props.onSetCurrentCargo(value);
                        this.setState({showStockEditor: true});

                    }
                }}
            >
                <td className={'table-cell chbox-cell'}>
                    <input checked={value.isChecked}
                           type={'checkbox'}
                           onClick={(e) => {
                               e.stopPropagation();
                               this.props.checkStock(index, isBuffer);
                           }}
                    />
                </td>

                <td className={'table-cell art-cell'}>{value.article}</td>
                <td className={'table-cell name-cell'}>{value.name}</td>
                <td className={'table-cell warehouse-cell'} style={{minWidth}}>
                    {value.stocks.map((val,index) =>
                        <div key={index}
                             className={'wh-storeWrapper ' + (
                                 index === 0? 'wh-first':
                                     (index === value.stocks.length-1? 'wh-last':'wh-middle')
                             )}
                             style={{width: '120px'}}
                        >
                            <div className={'wh-storeName'}>{val.store}</div>
                            <div className={'wh-count'}>{val.count}</div>
                        </div>
                    )}
                </td>
            </tr>
        );
    }

    render() {
        const widths = this.getWidths();
        return (
            <div>
                <div className={'controlWarehouse'}>
                    <SearchInput
                                 value={this.props.filter.search}
                                 haveIcon={true}
                                 onClickIcon={() => this.props.onGetStocks()}
                                 onChange={(v) => this.onSearchChange(v)}
                    />
                    <DropDown options={['Активные','Удаленные']}
                              value={this.getCargoStatValue()}
                              onChange={v => this.onIsDelChange(v)}
                              className={'wc-del-dp'}
                              holderClassName={'wc-del-dp-bg'}
                    />
                    {checkPermissions(this.props.permissions || [], [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.WAREHOUSE_MANAGER]) ?
                        <button className={'btn-m blue-button inline'}
                                style={{fontSize: '18px', marginLeft: '40px'}}
                                onClick={() => this.setState({showEditor: true})}
                        >
                            Добавить
                        </button> : ''

                    }
                    {!this.getCheck(false) &&checkPermissions(this.props.permissions || [], [PERMISSIONS.OWNER, PERMISSIONS.TOP_MANAGER, PERMISSIONS.STORE_MANAGER])?[
                        <button className={'btn-m blue-button'}
                                style={{fontSize: '18px', marginLeft: '40px'}}
                                onClick={()=> this.onMigrate(false)}
                        >
                            Переместить
                        </button>,

                        <button className={'btn-m blue-button'}
                        style={{fontSize: '18px', marginLeft: '40px'}}
                        onClick={()=> this.onMigrate(true)}
                        >
                        Запросить
                        </button>
                    ] : ''}
                </div>
                <div className={'dataTable'} style={{minWidth:widths.tableWidth, maxWidth:widths.tableWidth}}>
                    <table className={'table-header'}>
                        <thead>
                        <tr>
                            <td className={'table-cell header-cell chbox-cell'}>{this.getCheckboxTool()}</td>
                            <td className={'table-cell header-cell art-cell'}>Артикул</td>
                            <td className={'table-cell header-cell name-cell'}>Наименование</td>
                            <td className={'table-cell header-cell warehouse-cell'}
                                style={{
                                    minWidth: widths.storesCellWidth,
                                    maxWidth: widths.storesCellWidth,
                                    textAlign:'center'
                                }}
                            >
                                Склады
                            </td>
                        </tr>
                        </thead>
                    </table>
                    <div  className={'table-body'}>
                        <table>
                            <tbody>
                            {this.props.buffer.map((value, index)=> this.createItem(value, index, true))}
                            {this.createItem()}
                            {this.props.stocks.map((value, index)=> this.createItem(value, index, false))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {!this.state.showEditor ? '' :
                    <WarehouseModal onClose={this.onCloseWindow.bind(this)}/>
                }
                {!this.state.showMigrate ? '' :
                    <MigrateEditor onClose={() => this.setState({showMigrate: false})} isRequest={this.state.isRequest}/>
                }
                {!this.state.showStockEditor ? '' :
                    <CargoEditor onClose={() => this.setState({showStockEditor: false})}/>
                }
            </div>
        )
    }

    onIsDelChange(v) {
        this.props.changeFilter(this.props.filter.search, this.props.filter.store, this.props.filter.is_all, v === 1);
        this.props.onGetStocks();
    }

    getCargoStatValue() {
        return this.props.filter.is_del === true ? 1 : 0;
    }

    getWidths() {
        let storesCellWidth = 0;
        let storesAmount = 0;
        this.props.stores.forEach(value => {
            if(value.status === 0) {
                storesAmount++;
            }
        });
        if (this.props.stocks[0]) {
            storesCellWidth = storesAmount * 122+1;
        }
        let width = 375 + storesCellWidth - 1;
        return {tableWidth:`${width.toString(10)}px`, storesCellWidth}
    }

    onCloseWindow () {
        this.setState({showEditor: false});
        this.props.onGetStocks();
    }

    onSearchChange (value) {
        this.props.changeFilter(value, this.props.filter.store, this.props.filter.is_all, this.props.filter.is_del);
        this.props.onGetStocks();
    }

    componentDidMount () {
        this.props.onGetStocks();
    }

    getCheckboxTool () {
        if (this.getCheck(false)) return <input type={'checkbox'} checked={false} onClick={() => this.props.checkAllStocks(true)}/>;

        if (!this.getCheck(true))
            return <input checked={false} type={'checkbox'} className={'some-check-tool'} onClick={() => this.props.checkAllStocks(true)}/>;
        else
            return <input checked={true} type={'checkbox'} onClick={() => this.props.checkAllStocks(false)}/>;
    }

    getCheck (isChecked) {
        let isOk = true;

        this.props.buffer.map(item => {
            if (item.isChecked !== isChecked) isOk = false;
        });
        this.props.stocks.map(item => {
            if (item.isChecked !== isChecked) isOk = false;
        });

        return isOk;
    }

    onMigrate (isRequest) {
        this.setState({showMigrate: true, isRequest});
    }
}

export default Warehouse;