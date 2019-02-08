import React, {Component} from 'react';
import '../../core/styles/buttons.css'
import '../styles/index.css'
import DropDown from "../../personal/components/DropDown";
import WarehouseInput from "./WarehouseInput";
import WarehouseModal from "../containers/WarehouseModal";

class Warehouse extends Component {
    state = {
        showEditor: false,
        is_all: true,
        store: -1,
        searchStocks:'',
    };

    createItem (value, index, isBuffer) {
        if (!value) return (
            <tr>

            </tr>
        );

        return (
            <tr>
                <td className={'table-body-cell'} style={{borderLeft: 'none',width: '46px', maxWidth: '40px'}}>
                    {value.isChecked ?
                        <input checked type={'checkbox'} onClick={() => this.props.checkStock(index, isBuffer)}/>
                        :
                        <input type={'checkbox'} onClick={() => this.props.checkStock(index, isBuffer)}/>
                    }
                </td>

                <td className={'table-body-cell'} style={{width: '173px'}}>{value.article}</td>
                <td className={'table-body-cell'}  style={{width: '293px', maxWidth:'290px'}}>{value.name}</td>
                <td className={'table-body-cell'}  style={{width: '144px', maxWidth:'150px'}}>{value.count}</td>
                <td className={'table-body-cell'} style={{borderRight: 'none'}}>{value.store}</td>
            </tr>
        );
    }

    render() {
        const stores = [];
        if(this.props.stores !== null) {
            for (let key in this.props.stores) {
                stores.push(this.props.stores[key].name);
            }
        }
        return (
            <div>
                <div className={'controlWarehouse'}>
                    <WarehouseInput className={'warehouse-control-input'}
                                    placeholder={'поиск'}
                                    value={this.props.filter.search}
                                    iconClassName={'warehouse-control-input-icon'}
                                    haveIcon={true}
                                    onChange={(v) => this.onSearchChange(v)}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все склады', ...stores]}
                              holderStyle={{display: 'inline-block'}}
                              onChange={v => {this.onStoreChange(v)}}
                              value={this.getStoreValue()}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все','В наличии']}
                              holderStyle={{display: 'inline-block'}}
                              value={this.state.is_all ? 0 : 1}
                              onChange={(v) => {this.onIsAllChange(v)}}
                    />
                    <button className={'btn-m blue-button inline'}
                            style={{fontSize: '18px', marginLeft: '40px'}}
                            onClick={()=> this.setState({showEditor: true})}
                    >
                        Добавить
                    </button>
                </div>
                <div className={'dataTable'}>
                    <table className={'table-header'}>
                        <thead>
                        <tr>
                            <td className={'table-header-cell'} style={{borderLeft: 'none', width: '58px'}}>{this.getCheckboxTool()}</td>
                            <td className={'table-header-cell'} style={{width: '180px'}}>Артикул</td>
                            <td className={'table-header-cell'}  style={{width: '300px'}}>Наименование</td>
                            <td className={'table-header-cell'}  style={{width: '150px'}}>Количество</td>
                            <td className={'table-header-cell'} style={{borderRight: 'none'}}>Склад</td>
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

                {this.state.showEditor !== true ? '' :
                    <WarehouseModal onClose={this.onCloseWindow.bind(this)}/>
                }
            </div>
        )
    }

    onCloseWindow () {
        this.setState({showEditor: false});
        this.props.onGetStocks();
    }

    getStoreValue () {
        if (!this.props.filter.store) return 0;

        for (let key in this.props.stores) {
            if (this.props.stores[key].id === this.props.filter.store)
                return +key + 1;
        }

        return 0;
    }


    onStoreChange(index) {
        if (index === 0) {
            this.props.changeFilter(this.props.filter.search, null, this.props.filter.is_all);
        }
        else {
            this.props.changeFilter(this.props.filter.search, this.props.stores[index - 1].id, this.props.filter.is_all);
        }
        this.props.onGetStocks();
    }

    onIsAllChange(index){
        this.props.changeFilter(this.props.filter.search, this.props.filter.store, index === 0);
        this.props.onGetStocks();
    }

    onSearchChange (value) {
        this.props.changeFilter(value, this.props.filter.store, this.props.filter.is_all);
        this.props.onGetStocks();
    }

    componentDidMount () {
        this.props.onGetStocks();
        this.props.onGetStores();
    }

    getCheckboxTool () {
        let haveCheck = false;

        this.props.buffer.map(item => {
            if (item.isChecked) haveCheck = true;
        });
        this.props.stocks.map(item => {
            if (item.isChecked) haveCheck = true;
        });

        if (!haveCheck) return <input type={'checkbox'} onClick={() => this.props.checkAllStocks(true)}/>;

        let haveUncheck = false;

        this.props.buffer.map(item => {
            if (!item.isChecked) haveUncheck = true;
        });
        this.props.stocks.map(item => {
            if (!item.isChecked) haveUncheck = true;
        });

        if (haveUncheck)
            return <input  type={'checkbox'} className={'some-check-tool'} onClick={() => this.props.checkAllStocks(true)}/>;
        else
            return <input checked type={'checkbox'} onClick={() => this.props.checkAllStocks(false)}/>;
    }
}

export default Warehouse;