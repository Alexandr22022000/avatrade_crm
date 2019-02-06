import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import SearchDropdown from "../../core/components/SearchDropdown";

class WarehouseModal extends Component{
    state = {
        name: '',
        article: '',
        count:'',
        selectedCargo:0,
        isChanged: false,
    };
    render() {
        const addButton = (<div style={{textAlign:'center'}}>
            <button className={'blue-button btn-m'}
                    style={{marginBottom:'8px'}}
                    onClick={() => {this.onAdd(); this.props.onClose()}}
            >
                Добавить
            </button>
        </div>);
        const cargos =[];
        if (this.props.cargos) {
            for (let key in this.props.cargos) {
                cargos.push(this.props.cargos[key].name)
            }
        }
        return (
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"warehouse-modal"}
                   header={'Добавить'}
                   childClassName={'stocks'}
                   controls={addButton}
                   onClose={()=>this.props.onClose()}
            >
                <SearchDropdown options={['Добавить',...cargos]}
                                onSelect={(v) => {console.log(v);this.setState({selectedCargo: v-1, isChanged:true})}}
                />
                {this.state.selectedCargo === -1?
                    <div>
                        <StuffInput title={'Имя'}
                                placeholder={'Название'}
                                onChange={v => {this.setState({name: v, isChanged:true})}}
                                value={this.state.name}
                                style={{marginTop: '20px'}}
                        />
                        <StuffInput placeholder={'Артикул'}
                            onChange={v => {this.setState({article: v, isChanged:true})}}
                            value={this.state.article}
                            title={'Артикул'}
                        />
                        <StuffInput placeholder={'Количество'}
                                    onChange={v => {this.setState({count: v, isChanged:true})}}
                                    value={this.state.count}
                                    title={'Количество'}
                                    numbers={true}
                        />
                    </div>
                    :
                    <div>
                        <StuffInput placeholder={'Количество'}
                                    onChange={v => {this.setState({count: v, isChanged:true})}}
                                    value={this.state.count}
                                    title={'Количество'}
                                    numbers={true}
                                    style={{marginTop: '20px'}}
                        />
                    </div>
                }

            </Modal>
        )
    }

    componentDidMount() {
        this.props.onGetCargos()
    }

    onAdd() {
        if(this.state.isChanged === true){
            this.state.selectedCargo === -1?
                this.props.onAddNewStocks(this.state.name,this.state.article,this.state.count):
                this.props.onAddStocks(parseInt(this.state.count), this.props.cargos[this.state.selectedCargo].id);
        }
    }
}

export default WarehouseModal;