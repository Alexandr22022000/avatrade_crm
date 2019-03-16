import React, {Component} from 'react';
import '../styles/Cashbox.css';
import '../../core/styles/buttons.css';
import WarehouseInput from "../../warehouse/components/WarehouseInput";
import CashboxModal from "../containers/CashboxModal";
import CashboxStorePrompt from "../containers/CashboxStorePrompt";

class Cashbox extends Component {
    state ={
        showStorePrompt: this.props.storeId === null,
    };
    render() {
        let products = this.props.stocks, services = this.props.services;

        return (
            <div className={'Cashbox'}>
                <div className={'cashbox-info cb-width cb-height inline'}>
                    <div className={'cashbox-services inline'}>
                        <div style={{textAlign: 'center', borderBottom: 'black solid 2px', padding: '5px'}}>
                            Услуги
                        </div>
                        <WarehouseInput className={'cashbox-search'}
                                        placeholder={'поиск'}
                                        iconClassName={'warehouse-control-input-icon'}
                                        inputClassName={'cashbox-search-input cb-search-input-width'}
                                        haveIcon={true}
                                        onClickIcon={() => {this.props.onLoadServicesList()}}
                                        onChange={(v) => {
                                            this.props.onChangeServiceFilter(v);
                                            this.props.onLoadServicesList()
                                        }}
                        />
                        <div className={'cashbox-list'}>
                            {services.map((value, index)=>
                                <div key={index}
                                     className={'cb-listItem'}
                                     onClick={() => this.addToSell(index,true)}
                                >
                                    {value.name}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'cashbox-stocks inline'}>
                        <div style={{textAlign: 'center', borderBottom: 'black solid 2px', padding: '5px'}}>
                            Товары
                        </div>
                        <WarehouseInput className={'cashbox-search'}
                                        placeholder={'поиск'}
                                        iconClassName={'warehouse-control-input-icon'}
                                        inputClassName={'cashbox-search-input'}
                                        haveIcon={true}
                                        onClickIcon={() => this.props.onLoadStocksList()}
                                        onChange={(v) => {this.props.onChangeStockFilter(v);this.props.onLoadStocksList()}}
                        />
                        <div className={'cashbox-list'}>
                            {products.map((value,index) =>
                                <div key={index}
                                     className={'cb-listItem'}
                                     onClick={() => this.addToSell(index, false)}
                                >
                                    {value.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={'controlCashbox inline'}>
                    {this.props.fastServices.map((value, index) =>
                        <button className={'btn-m blue-button'} key={index}>
                            {value.name}
                        </button>
                    )}
                </div>
                <CashboxModal/>
                {this.state.showStorePrompt?
                    <CashboxStorePrompt onClose={() => this.setState({showStorePrompt: false})}/>
                    :''
                }
            </div>
        );
    }

    addToSell(index, isService) {
        let sellObj = isService? this.props.services[index] : this.props.stocks[index];
        let sellServices = [...this.props.sellServices];
        for(let key in sellServices) {
            if(sellServices[key].id === sellObj.id) {
                sellServices[key].count += 1;
                this.props.onServicesChange(sellServices);
                return;
            }
        }
        this.props.onServicesChange([...sellServices, {...sellObj, count: 1}])
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.services);
        return true;
    }

    componentDidMount() {
        this.props.onGetStores();
        this.props.onLoadFastServices();
        this.props.onLoadStocksList();
        this.props.onLoadServicesList();
    }
}

export default Cashbox;