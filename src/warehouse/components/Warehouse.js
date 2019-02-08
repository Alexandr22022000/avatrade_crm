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
                                    value={this.state.searchStocks}
                                    iconClassName={'warehouse-control-input-icon'}
                                    haveIcon={true}
                                    onChange={(v) => this.onFilterChange(v)}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все',...stores]}
                              holderStyle={{display: 'inline-block'}}
                              onChange={v => {this.onStoreChange(stores[v-1], v-1)}}
                              value={this.state.store + 1}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все','В наличии']}
                              holderStyle={{display: 'inline-block'}}
                              value={this.state.is_all}
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
                            <td className={'table-cell'} style={{borderLeft: 'none'}}><input type={'checkbox'}/></td>
                            <td className={'table-cell'}>Артикул</td>
                            <td className={'table-cell'}>Наименование</td>
                            <td className={'table-cell'}>Количество</td>
                            <td className={'table-cell'}>Склад</td>
                        </tr>
                        </thead>
                    </table>
                    <div  className={'table-body'}>
                        <table>
                            <tbody>
                            {this.props.stocks? this.props.stocks.map((value, index)=> {
                                    return <tr key={index}>
                                        <td className={'table-cell'} style={{borderLeft: 'none'}}><input type={'checkbox'}/></td>
                                        <td className={'table-cell'}>{value.article}</td>
                                        <td className={'table-cell'}>{value.name}</td>
                                        <td className={'table-cell'}>{value.count}</td>
                                        <td className={'table-cell'} style={{borderRight: 'none'}}>{value.store}</td>
                                    </tr>
                                }
                            ): <tr/>}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.showEditor===true? <WarehouseModal onClose={()=> {
                    this.setState({showEditor: false});
                    console.log('this.props.onGetStocks()');
                    this.props.onGetStocks(this.state.is_all, this.state.store === -1? null : this.props.stores[this.state.store].id, this.state.searchStocks)}
                }/>:''}
            </div>
        )
    }

    onStoreChange(name, index) {
        if(index=== -1){
            this.setState({store: -1});
            this.props.onGetStocks(this.state.is_all,null,this.state.searchStocks);
        } else {
            for (let key in this.props.stores) {
                if (this.props.stores[key].name === name) {
                    this.setState({store: index});
                    this.props.onGetStocks(this.state.is_all, this.props.stores[key].id, this.state.searchStocks)
                }
            }
        }
    }

    onIsAllChange(index){
        if(index === 0) {
            this.setState({is_all: true});
            this.props.onGetStocks(true, this.state.store === -1? null : this.props.stores[this.state.store].id, this.state.searchStocks)
        } else {
            this.setState({is_all:false});
            this.props.onGetStocks(false, this.state.store === -1? null : this.props.stores[this.state.store].id, this.state.searchStocks)
        }
    }

    onFilterChange(value) {
        this.setState({searchStocks: value});
        console.log(this.state.store);
        this.props.onGetStocks(this.state.is_all,this.state.store === -1? null : this.props.stores[this.state.store].id,value);
    }

    componentDidMount() {
        this.props.onGetStocks(true,null,this.state.searchStocks);
        this.props.onGetStores();
    }
}

export default Warehouse;