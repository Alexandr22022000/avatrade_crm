import React, {Component} from 'react';
import '../../core/styles/buttons.css'
import '../styles/index.css'
import DropDown from "../../personal/components/DropDown";
import WarehouseInput from "./WarehouseInput";
import WarehouseModal from "./WarehouseModal";

class Warehouse extends Component {
    state = {
        showEditor: false,
        is_all: true,
        store: 0,
        searchStocks:'',
        searchCargos:'',
    };
    render() {
        const stores = [];
        if(this.props.stores !== null) {
            for (let key in this.props.stores) {
                stores.push(this.props.stores[key].address);
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
                              onChange={v => this.setState({store:v-1})}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['Все','В наличии']}
                              holderStyle={{display: 'inline-block'}}
                              onChange={(v) => this.setState({is_all: !this.state.is_all})}
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
                            <td className={'table-header-cell'} style={{borderLeft: 'none'}}>Артикул</td>
                            <td className={'table-header-cell'}>Наименование</td>
                            <td className={'table-header-cell'}>Количество</td>
                            <td className={'table-header-cell'}>Стоимость</td>
                            <td className={'table-header-cell'} style={{borderRight: 'none'}}>Склад</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.stocks? this.props.stocks.map((value, index)=> {
                            return <tr key={index}>
                                <td className={'table-header-cell'} style={{borderLeft: 'none'}}>{value.article}</td>
                                <td className={'table-header-cell'}>{value.name}</td>
                                <td className={'table-header-cell'}>{value.count}</td>
                                <td className={'table-header-cell'}>Стоимость</td>
                                <td className={'table-header-cell'} style={{borderRight: 'none'}}>{value.store_id}</td>
                            </tr>
                        }
                        ): <tr/>}
                        </tbody>
                    </table>
                </div>
                {this.state.showEditor===true? <WarehouseModal onClose={()=> this.setState({showEditor: false})}/>:''}
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextState.is_all);
        return true;
    }

    componentDidMount() {
        this.props.onGetStocks(this.state.is_all,this.state.store,this.state.searchStocks);
        this.props.onGetStores();
    }
    onFilterChange(value) {
        this.setState({searchStocks: value});
        this.props.onGetStocks(this.state.is_all,this.state.store === -1? null : this.state.store,value);
    }
}

export default Warehouse;