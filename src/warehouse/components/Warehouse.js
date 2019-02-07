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
                                    iconClassName={'warehouse-control-input-icon'}
                                    haveIcon={true}
                                    onChange={(v) => this.onFilterChange(v)}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все',...stores]}
                              holderStyle={{display: 'inline-block'}}
                              onChange={v => {this.onStoreChange(stores[v-1], v-1)}}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все','В наличии']}
                              holderStyle={{display: 'inline-block'}}
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
                            <td className={'table-header-cell'} style={{borderLeft: 'none', width: '105px'}}>Артикул</td>
                            <td className={'table-header-cell'}  style={{width: '250px'}}>Наименование</td>
                            <td className={'table-header-cell'}  style={{width: '100px'}}>Количество</td>
                            <td className={'table-header-cell'}  style={{width: '200px'}}>Стоимость</td>
                            <td className={'table-header-cell'} style={{borderRight: 'none'}}>Склад</td>
                        </tr>
                        </thead>
                    </table>
                    <div  className={'table-body'}>
                        <table>
                            <tbody>
                            {this.props.stocks? this.props.stocks.map((value, index)=> {
                                    return <tr key={index}>
                                        <td className={'table-body-cell'} style={{borderLeft: 'none',width: '100px'}}>{value.article}</td>
                                        <td className={'table-body-cell'}  style={{width: '253px'}}>{value.name}</td>
                                        <td className={'table-body-cell'}  style={{width: '102px'}}>{value.count}</td>
                                        <td className={'table-body-cell'}  style={{width: '202px'}}>Стоимость</td>
                                        <td className={'table-body-cell'} style={{borderRight: 'none'}}>{value.store_id}</td>
                                    </tr>
                                }
                            ): <tr/>}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.showEditor===true? <WarehouseModal onClose={()=> {
                    this.setState({showEditor: false})}
                }/>:''}
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextState);
        return true;
    }

    onStoreChange(name, index) {
        console.log(name);
        if(index=== -1){
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
        console.log(index);
        if(index === 0) {
            this.setState({is_all: true});
            this.props.onGetStocks(true, this.state.store, this.state.searchStocks)
        } else {
            this.setState({is_all:false});
            this.props.onGetStocks(false, this.state.store, this.state.searchStocks)
        }
    }

    componentDidMount() {

        this.props.onGetStocks(true,null,this.state.searchStocks);
        this.props.onGetStores();
    }
    onFilterChange(value) {
        this.setState({searchStocks: value});
        this.props.onGetStocks(this.state.is_all,this.state.store === -1? null : this.props.stores[this.state.store].id,value);
    }
}

export default Warehouse;