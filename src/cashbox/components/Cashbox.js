import React, {Component} from 'react';
import '../styles/Cashbox.css';
import '../../core/styles/buttons.css';
import WarehouseInput from "../../warehouse/components/WarehouseInput";

class Cashbox extends Component {
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
                                <div key={index} className={'cb-listItem'}>
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
                        <div  className={'cashbox-list'}>
                            {products.map((value,index) =>
                                <div key={index} className={'cb-listItem'}>
                                    {value.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={'controlCashbox inline'}>
                    {this.props.fastServices.map((value, index) =>
                        <button className={'btn-m blue-button'}>
                            {value.name}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.services);
        console.log(nextProps.stocks);
        return true;
    }

    componentDidMount() {
        this.props.onLoadFastServices();
        this.props.onLoadStocksList();
        this.props.onLoadServicesList();
    }
}

export default Cashbox;