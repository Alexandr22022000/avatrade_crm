import React, {Component} from 'react';
import Modal from '../../core/components/Modal';
import StuffInput from "../../personal/components/StuffInput";
import '../../core/styles/buttons.css'
import CountableField from "../../core/components/CountableField";

class WarehouseModal extends Component {
    render() {
        const addButton = (<div style={{textAlign:'right',paddingRight:'3%'}}>
            <button className={"btn-m inline" + (this.canSave() ? " blue-button" : "")}
                    onClick={() => {this.onClose(true)}}
            >
                {this.props.isRequest ? 'Запросить' : 'Переместить'}
            </button>
        </div>);

        this.list = this.list.map(item => {
            for (let key in item.stocks) {
                if (+item.stocks[key].store_id === +this.state.from) {
                    item.max = item.stocks[key].count;
                    return item;
                }
            }

            item.max = 0;
            return item;
        });

        const inputs = this.list.map((item, index) => (
            <CountableField
                title={item.name}
                value={this.state.values[index]}
                maxValue={this.props.isRequest ? null : item.max}
                onChange={v => {this.onChange(v, index)}}
            />
        ));

        return (
            <Modal header={this.props.isRequest ? 'Запросить' : 'Переместить'}
                   bgClassName={"modalHolder"}
                   windowClassName={"borders"}
                   childClassName={"modal"}
                   controlClassName={"saveButtonHolder"}
                   controls={addButton}
                   onClose={()=> this.onClose(false)}
            >
                {this.props.isRequest ? '' : (
                    <StuffInput
                        value={this.state.from}
                        onChange={v => this.setState({from: v})}
                        title={'Со склада'}
                        alwaysActive={true}
                        options={this.props.stores.map(v => v.name)}
                    />
                )}

                <StuffInput
                    value={this.state.to}
                    onChange={v => this.setState({to: v})}
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
                stocks: item.stocks,
                max: 0,
                id: item.id,
            });
            this.fromStore = item.store;
            this.fromStoreId = item.store_id;
        });

        this.props.stocks.map(item => {
            if (!item.isChecked) return;

            this.list.push({
                name: item.name,
                stocks: item.stocks,
                max: 0,
                id: item.id,
            });
            this.fromStore = item.store;
            this.fromStoreId = item.store_id;
        });

        this.setState({
            values: this.list.map(() => 0),
            to: 0,
            from: 0,
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

                if (this.props.isRequest)
                    this.props.createMigrationRequest(this.props.stores[this.state.to].id, stocks);
                else
                    this.props.addMigrate(this.props.stores[this.state.from].id, this.props.stores[this.state.to].id, stocks);

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
            sum += +this.state.values[key];
        }

        if (sum === 0) return false;

        if (this.props.isRequest) return true;

        if (this.props.stores[this.state.from].id === this.props.stores[this.state.to].id) return false;

        return true;
    }
}

export default WarehouseModal;