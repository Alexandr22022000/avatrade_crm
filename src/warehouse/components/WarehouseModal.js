import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import SearchDropdown from "../../core/components/SearchDropdown";
import '../../core/styles/buttons.css'

class WarehouseModal extends Component{
    state = {
        name: '',
        article: '',
        count:'',
        selectedCargo:-1,
    };
    render() {
        const addButton = (<div style={{textAlign:'right',paddingRight:'3%'}}>
            <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")}
                    onClick={() => {this.onClose(true)}}
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
                   onClose={()=>this.onClose(false)}
            >
                <SearchDropdown options={['Добавить',...cargos]}
                                onSelect={(v) => {this.setState({selectedCargo: v-1});this.changed = true;}}
                />
                {this.state.selectedCargo === -1?
                    <div>
                        <StuffInput title={'Имя'}
                                placeholder={'Название'}
                                onChange={v => {this.setState({name: v});this.changed = true;}}
                                value={this.state.name}
                                style={{marginTop: '20px'}}
                        />
                        <StuffInput placeholder={'Артикул'}
                            onChange={v => {this.setState({article: v});this.changed = true;}}
                            value={this.state.article}
                            title={'Артикул'}
                        />
                        <StuffInput placeholder={'Количество'}
                                    onChange={v => {this.setState({count: v});this.changed = true;}}
                                    value={this.state.count}
                                    title={'Количество'}
                                    numbers={true}
                        />
                    </div>
                    :
                    <div>
                        <StuffInput placeholder={'Количество'}
                                    onChange={v => {this.setState({count: v, isChanged:true});this.changed = true;}}
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

    onClose(isSave){
        console.log(isSave);
        if(isSave){
            if (this.canSave()) {
                this.state.selectedCargo === -1 ?
                    this.props.onAddNewStocks(this.state.name, this.state.article, this.state.count) :
                    this.props.onAddStocks(parseInt(this.state.count), this.props.cargos[this.state.selectedCargo].id);
                this.props.onClose();
            }
        } else {
            this.props.onClose();
        }
    }

    canSave () {
        if(this.state.selectedCargo === -1) {
            if (this.state.name ==='') return false;
            if (this.state.article === '') return false;
        }
        if(this.state.count === '') return false;
        return true;
    }
}

export default WarehouseModal;