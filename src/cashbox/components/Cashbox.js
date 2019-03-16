import React, {Component} from 'react';
import '../styles/Cashbox.css';
import '../../core/styles/buttons.css';
import WarehouseInput from "../../warehouse/components/WarehouseInput";
import CashboxModal from "../containers/CashboxModal";
import CashboxStorePrompt from "../containers/CashboxStorePrompt";
import cross from "../../images/cross-icon.png";

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
                                    <div className={'inline'}>
                                        {value.name} - {value.price} ₽
                                    </div>
                                    <div className={'inline'} style={{float: 'right', marginRight:'5px'}}>
                                        <button onClick={() => this.onIncrease()}
                                                className={'cb-c-inc cb-c-btn'}
                                        >
                                            +
                                        </button>
                                    </div>
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
                                    <div className={'inline'}>
                                        {value.name} - {value.price} ₽
                                    </div>
                                    <div className={'inline'} style={{float: 'right', marginRight:'5px'}}>
                                        <button onClick={() => this.onIncrease()}
                                                className={'cb-c-inc cb-c-btn'}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={'controlCashbox inline'}>
                    {this.props.fastServices.map((value, index) =>
                        <div>
                            <button className={'btn-m blue-button inline'}
                                    key={index}
                            >
                                {value.name}
                            </button>
                            <img
                                src={cross}
                                onClick={() => this.props.onClose()}
                                alt={"cross"}
                                style={{ cursor: "pointer", float:'right'}}
                                className={'cb-c-cross'}
                            />
                        </div>
                    )}
                    <div>
                        <button className={'btn-m blue-button inline'}>Изменить</button>
                        <img
                            src={cross}
                            onClick={() => this.props.onClose()}
                            alt={"cross"}
                            style={{
                                cursor: "pointer",
                                maxWidth:'32px',
                                maxHeight:'32px',
                                display:'inline-block',
                                verticalAlign:'top'
                            }}
                        />
                    </div>

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