import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import '../../core/styles/buttons.css'

class WarehouseModal extends Component {
    render() {
        const addButton = (<div style={{textAlign:'right',paddingRight:'3%'}}>
            <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")}
                    onClick={() => {this.onClose(true)}}
            >
                Переместить
            </button>
        </div>);

        const inputs = this.list.map((item, index) => (
            <StuffInput
                placeholder={'Количество'}
                numbers={true}
                alwaysActive={true}
                onChange={v => {this.onChange(v, index)}}
                value={this.state.values[index]}
                title={item.name}
            />
        ));

        return (
            <Modal header={'Переместить'}
                   bgClassName={"modalHolder"}
                   windowClassName={"borders"}
                   childClassName={"modal"}
                   controlClassName={"saveButtonHolder"}
                   controls={addButton}
                   onClose={()=> this.onClose(false)}
            >
                <StuffInput
                    onlyRead={true}
                    value={this.fromStore}
                    title={'Со склада'}
                />

                <StuffInput
                    value={this.state.store}
                    onChange={v => this.setState({store: v})}
                    title={'На склад'}
                    alwaysActive={true}
                    options={this.props.stores.map(v => v.name)}
                />

                <h3>Грузы:</h3>

                {inputs}
            </Modal>
        )
    }

    componentWillMount () {
        this.props.onGetStores();
        this.list = [];

        this.props.buffer.map(item => {
            if (!item.isChecked) return;

            this.list.push({
                name: item.name,
                max: item.count,
                id: item.cargo_id,
            });
            this.fromStore = item.store;
            this.fromStoreId = item.store_id;
        });

        this.props.stocks.map(item => {
            if (!item.isChecked) return;

            this.list.push({
                name: item.name,
                max: item.count,
                id: item.cargo_id,
            });
            this.fromStore = item.store;
            this.fromStoreId = item.store_id;
        });

        this.setState({
            values: this.list.map(() => ''),
            store: 0,
        });
    }

    onChange (value, index) {
        const values = this.state.values;
        values[index] = value;
        this.setState({values});
    }

    onClose (isSave) {
        if(isSave){
            if (this.canSave()) {
                const stocks = [];
                this.state.values.map((item, index) => {
                    if (+item === 0) return;

                    stocks.push({
                        count: +item,
                        id: this.list[index].id,
                    });
                });

                this.props.addMigrate(this.fromStoreId, this.props.stores[this.state.store].id, stocks);
                this.props.checkAllStocks(false);
                this.props.onGetStocks();
                this.props.onClose();
            }
        } else {
            this.props.onClose();
        }
    }

    canSave () {
        let sum = 0;
        for (let key in this.state.values) {
            if (this.state.values[key].trim() === '') return false;
            if (+this.state.values[key] > this.list[key].max) return false;

            sum += +this.state.values[key];
        }

        if (sum === 0) return false;

        if (this.fromStoreId === this.props.stores[this.state.store].id) return false;

        return true;
    }
}

export default WarehouseModal;