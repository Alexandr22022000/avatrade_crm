import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import DropDown from "../../personal/components/DropDown";
import SearchDropdown from "../../core/components/SearchDropdown";

class WarehouseModal extends Component{
    state = {
        name: '',
        article: '',
    };
    render() {
        const addButton = (<div style={{textAlign:'center'}}>
            <button className={'blue-button btn-m'} style={{marginBottom:'8px'}}>Добавить</button>
        </div>);
        return (
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"warehouse-modal"}
                   header={'Добавить'}
                   childClassName={'stocks'}
                   controls={addButton}
                   onClose={()=>this.props.onClose()}
            >
                <SearchDropdown options={['один', 'два','три']}/>
                <StuffInput title={'Имя'}
                            placeholder={'Название'}
                            onChange={v => {this.setState({name: v})}}
                            value={this.state.name}
                />
                <StuffInput placeholder={'Артикул'}
                            onChange={v => {this.setState({article: v})}}
                            value={this.state.article}
                            title={'Артикул'}
                />
            </Modal>
        )
    }
}

export default WarehouseModal;