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
            <div style={{textAlign:'right',paddingRight:'3%'}}>
                <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")}
                        onClick={() => {this.onClose(true)}}
                >
                    Добавить
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
        console.log(this.props.cargo);
        this.setState({
            name: this.props.cargo.name,
            article: this.props.cargo.article,
        })
    }
}

export default CargoEditor;