import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import SearchDropdown from "../../core/components/SearchDropdown";
import '../../core/styles/buttons.css'

class WarehouseModal extends Component{
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
                if (this.props.cargos[key].status === 0)
                    cargos.push(this.props.cargos[key].name + ' - ' + this.props.cargos[key].article)
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
                                onSelect={(v) => {this.setState({cargo: v-1})}}
                                value={this.state.cargo + 1}
                />
                {this.state.cargo !== -1 ? '' :
                    <div>
                        <StuffInput title={'Имя'}
                                placeholder={'Название'}
                                onChange={v => {this.setState({name: v})}}
                                value={this.state.name}
                                alwaysActive={true}
                                style={{marginTop: '20px'}}
                        />
                        <StuffInput placeholder={'Артикул'}
                            onChange={v => {this.setState({article: v})}}
                            value={this.state.article}
                            alwaysActive={true}
                            title={'Артикул'}
                        />
                    </div>
                }

                <StuffInput placeholder={'Количество'}
                            onChange={v => {this.setState({count: v})}}
                            value={this.state.count}
                            title={'Количество'}
                            numbers={true}
                            alwaysActive={true}
                            style={{marginTop: '20px'}}
                />
            </Modal>
        )
    }

    componentWillMount () {
        this.props.onGetCargos();
        this.setState({
            cargo: -2,
            name: '',
            article: '',
            count: '',
            counted: 1,
        });
    }

    onClose (isSave) {
        if(isSave){
            if (this.canSave()) {
                if (this.state.cargo === -1) {
                    this.props.onAddNewStocks(this.state.name, this.state.article, this.state.count)
                }
                else {
                    this.props.onAddStocks(parseInt(this.state.count), this.props.cargos[this.state.cargo].id);
                }

                this.props.onClose();
            }
        } else {
            this.props.onClose();
        }
    }

    canSave () {
        if (this.state.cargo === -2) return false;

        if (this.state.cargo === -1) {
            if (this.state.name ==='') return false;
            if (this.state.article === '') return false;
        }

        if (this.state.count === '') return false;
        return true;
    }
}

export default WarehouseModal;