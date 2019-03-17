import React, {Component} from 'react';
import '../styles/Cashbox.css';
import '../../core/styles/buttons.css';
import WarehouseInput from "../../warehouse/components/WarehouseInput";
import CashboxModal from "../containers/CashboxModal";
import CashboxStorePrompt from "../containers/CashboxStorePrompt";
import cross from "../../images/cross-icon.png";

class Cashbox extends Component {
    state = {
        showStorePrompt: this.props.storeId === null,
        isEditing:false,
        fastServices: [],
    };
    render() {
        let fastServices = this.state.isEditing? this.state.fastServices: this.props.fastServices;
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
                        {this.getList(true)}
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
                        {this.getList(false)}
                    </div>
                </div>
                <div className={'controlCashbox inline'}>
                    {fastServices.map((value, index) =>
                        <div className={'ccb-item'}>
                            <button className={'btn-m blue-button inline'}
                                    key={index}
                                    onClick={() => this.addToSell(value)}
                            >
                                {value.name}
                            </button>
                            {this.state.isEditing?
                                <img
                                    src={cross}
                                    onClick={() => this.delFastService(index)}
                                    alt={"cross"}
                                    style={{
                                        cursor: "pointer",
                                        maxWidth:'32px',
                                        maxHeight:'32px',
                                        display:'inline-block',
                                        verticalAlign:'top'
                                    }}
                                /> :''
                            }
                        </div>
                    )}
                    <div>
                        <button className={'btn-m action-button inline'}
                                onClick={() => this.changeEditorStatus()}
                        >
                            {this.state.isEditing? 'Сохранить': 'Изменить'}
                        </button>
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

    changeEditorStatus() {
        if(this.state.isEditing){
            let fastServices = this.state.fastServices.map(value => value.id);
            this.props.onChangeFastServices(fastServices);
            this.setState({isEditing: false, fastServices:[]});
        } else {
            this.setState({isEditing:true, fastServices:this.props.fastServices})
        }
    }

    getList(isServices) {
        let products;
        if(!isServices) products = this.props.stocks;
        else products = this.props.services;
        let selling = this.state.isEditing?() => {}:(value) => this.addToSell(value);
        return (
            <div className={'cashbox-list'}>
                {products.map((value,index) =>
                    <div key={index}
                         className={'cb-listItem'}
                         onClick={() => selling(value)}
                    >
                        <div className={'inline'}>
                            {value.name} - {value.price} ₽
                        </div>
                        {this.state.isEditing?
                            <div className={'inline'} style={{float: 'right', marginRight:'5px'}}>
                                <button onClick={(e) => {this.addFastService(isServices,index);e.stopPropagation()}}
                                        className={'cb-c-inc cb-c-btn'}
                                >
                                    +
                                </button>
                            </div>:''
                        }
                    </div>
                )}
            </div>
        )
    }

    delFastService(index) {
        let tmp = [...this.state.fastServices];
        tmp.splice(index,1);
        this.setState({fastServices:tmp});
    }

    addFastService(isService, index){
        let service = isService?this.props.services[index] : this.props.stocks[index];
        for(let key in this.state.fastServices) {
            if(service.id === this.state.fastServices[key].id) {
                return;
            }
        }
        this.setState({fastServices: [...this.state.fastServices, service]})
    }

    addToSell(sellObj) {
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
        console.log(nextState.fastServices);
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