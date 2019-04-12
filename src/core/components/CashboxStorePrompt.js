import React, {Component} from 'react';
import Modal from "./Modal";
import DropDown from "./DropDown";
import setStore from '../cookie/setStore';
import '../styles/CashboxStorePrompt.css';

class CashboxStorePrompt extends Component {
    state = {
        storeIndex: 0,
    };
    render() {
        const submitButton = (
            <div style={{textAlign:'center'}}>
                <button onClick={() => this.onClose()} className={'btn-m blue-button'}>Принять</button>
            </div>
        );
        let stores = [];
        for(let key in this.props.stores) {
            stores.push(this.props.stores[key].name);
        }
        stores.push("Нет");

        return (
            <Modal windowClassName={"cb-StoreCheck"}
                   header={'Выберите текущий магазин'}
                   childClassName={'cb-sc-child'}
                   controls={submitButton}
                   onClose={()=>{}}
                   withoutCross={true}
            >
                <DropDown
                    className={'cb-storeCheck'}
                    options={stores}
                    holderStyle={{display: 'inline-block'}}
                    value={this.getStoreValue()}
                    onChange={(v) => {this.storeIndexChange(v)}}
                />
            </Modal>
        );
    }

    storeIndexChange(value) {
        this.setState({storeIndex: value});
    }

    getStoreValue() {
        if(this.props.stores[this.state.storeIndex]) {
            return this.props.stores[this.state.storeIndex].name;
        }
        return ''
    }

    onClose() {
        let id = this.props.stores[this.state.storeIndex];
        if (id) id = id.id;
        else id = -1;

        setStore(id);
        this.props.onSetStoreId(id);
        this.props.onClose();
    }
}

export default CashboxStorePrompt;