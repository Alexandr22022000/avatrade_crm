import React, {Component} from 'react';
import '../../core/styles/buttons.css'
import '../styles/index.css'
import DropDown from "../../personal/components/DropDown";
import WarehouseInput from "./WarehouseInput";

class Warehouse extends Component {
    render() {
        return (
            <div>
                <div className={'controlWarehouse'}>
                    <WarehouseInput className={'warehouse-control-input'}
                                    placeholder={'asdassdasd'}
                                    iconClassName={'warehouse-control-input-icon'}
                                    haveIcon={true}
                    />
                    <DropDown className={'dropdownPlaceholder warehouse-control-dropdown'}
                              options={['один','два']}
                              holderStyle={{display: 'inline-block'}}
                    />
                    <button className={'btn-m blue-button inline'}
                            style={{fontSize: '18px', marginLeft: '2%'}}
                    >
                        Текст
                    </button>
                </div>
                <div className={'dataTable'}>
                    <div style={{display:'inline-block'}}>
                        Артикул
                    </div>
                    <div style={{display:'inline-block'}}>
                        Наименование
                    </div>
                    <div style={{display:'inline-block'}}>
                        Количество
                    </div>
                    <div style={{display:'inline-block'}}>
                        Стоимость
                    </div>
                    <div style={{display:'inline-block'}}>
                        Склад
                    </div>
                </div>
            </div>
        )
    }
}

export default Warehouse;