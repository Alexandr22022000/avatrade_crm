import React, {Component} from 'react';
import '../../core/styles/buttons.css'
import '../styles/index.css'
import DropDown from "../../personal/components/DropDown";
import WarehouseInput from "./WarehouseInput";
import WarehouseModal from "./WarehouseModal";

class Warehouse extends Component {
    state = {
        showEditor: false,
    };
    render() {
        return (
            <div>
                <div className={'controlWarehouse'}>
                    <WarehouseInput className={'warehouse-control-input'}
                                    placeholder={'поиск'}
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
                        В наличии
                    </button>
                    <button className={'btn-m blue-button inline'}
                            style={{fontSize: '18px', marginLeft: '2%'}}
                            onClick={()=> this.setState({showEditor: true})}
                    >
                        Добавить
                    </button>
                </div>
                <div className={'dataTable'}>
                    <div className={'table-header'}>
                        <div className={'table-header-cell'} style={{borderLeft: 'none',width:'100px'}}>
                            Артикул
                        </div>
                        <div className={'table-header-cell'}>
                            Наименование
                        </div>
                        <div className={'table-header-cell'}>
                            Количество
                        </div>
                        <div className={'table-header-cell'}>
                            Стоимость
                        </div>
                        <div className={'table-header-cell'} style={{borderRight: 'none'}}>
                            Склад
                        </div>
                    </div>
                </div>
                {this.state.showEditor===true? <WarehouseModal onClose={()=> this.setState({showEditor: false})}/>:''}
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(this.props.stocks);
        return true;
    }
}

export default Warehouse;