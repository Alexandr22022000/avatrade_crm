import React, {Component} from 'react';
import Modal from "../../core/components/Modal";
import StuffInput from "../../personal/components/StuffInput";

class CargoEditor extends Component {
    state = {
        name: null,
        article: null,
    };
    render() {
        const saveButton = (
            <div style={{paddingRight:'3%', paddingLeft:'3%'}}>
                <div className={'link-decor'}
                     style={{float: 'left', cursor: 'pointer'}}
                     onClick={() => {
                         if (!window.confirm("Вы уверены?")) return;

                         this.props.onChangeCargoStatus(this.props.cargo.id, this.getChangedStatus());
                         this.props.onClose();
                     }}
                >
                    {this.props.cargo.status === 1? 'Восстановить' : 'Удалить'}
                </div>
                <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")}
                        style={{float: 'right'}}
                        onClick={() => {this.onClose(true)}}
                >
                    Изменить
                </button>
            </div>
        );
        return (
            <Modal bgClassName={"modalHolder"}
                   windowClassName={"warehouse-modal cargo-edit-modal"}
                   header={'Изменить'}
                   childClassName={'cargo-edit'}
                   controls={saveButton}
                   onClose={()=>this.onClose(false)}
            >
                <StuffInput value={this.state.name}
                            onChange={v => this.setState({name: v})}
                            title={'Наименование'}
                />
                <StuffInput value={this.state.article}
                            onChange={v => this.setState({article: v})}
                            title={'Артикул'}
                />
            </Modal>
        );
    }

    getChangedStatus() {
        return this.props.cargo.status === 1? 0 : 1;
    }

    onClose (isSave) {
        if(isSave){
            if (this.canSave()) {
                this.props.onPostCargo(this.props.cargo.id, this.state.name, this.state.article);
                this.props.onClose();
            }
        } else {
            this.props.onClose();
        }
    }

    canSave () {
        if(!this.state.name) return false;
        if(!this.state.article) return false;
        return true;
    }

    componentDidMount() {
        this.setState({
            name: this.props.cargo.name,
            article: this.props.cargo.article,
        })
    }
}

export default CargoEditor;