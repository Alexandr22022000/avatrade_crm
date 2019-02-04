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
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Артикул
                                </td>
                                <td>
                                    Наименование
                                </td>
                                <td>
                                    Количество
                                </td>
                                <td>
                                    Стоимость
                                </td>
                                <td>
                                    Склад
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}

export default Warehouse;