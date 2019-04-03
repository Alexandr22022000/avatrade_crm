import React, {Component} from 'react';
import MultipleCountableField from "../../core/components/MultipleCountableField";


class ServiceMCFEditor extends Component{
    render() {
        return (
            <div style={{marginTop:'20px'}}>
                {this.showMCFs()}
                <div style={{fontSize: '22px', cursor: 'pointer', width: 'fit-content',marginLeft:'6%',marginTop:'20px'}}
                     onClick={() => {this.addNewMFC()}}
                >
                    Добавить
                </div>
            </div>
        );
    }

    showMCFs() {
        const currentConsumables = this.props.currentConsumables;
        let cargos = this.props.cargos.filter(v => v.status === 0).map(item => {
            return item.name + ' - ' + item.article;
        });

        let deleted = this.props.cargos.map(item => {
            if (item.status === 0) return false;

            return item.name + ' - ' + item.article;
        });

        let disabled = [];
        for(let key in currentConsumables) {
            disabled.push(currentConsumables[key].cargoIndex);
        }

        let consums = [];
        for(let key in currentConsumables) {
            consums.push(
                <div key={key}>
                    <MultipleCountableField needSearch={true}
                        options={cargos}
                        block={deleted}
                        amount={currentConsumables[key].count}
                        onSelected={(val) => this.selectedCargo(val, key)}
                        onCountChange={(val) => this.changedCargoCount(val, key)}
                        value={currentConsumables[key].cargoIndex}
                        disabled={disabled}
                        withoutRange={true}
                        style={{marginLeft:'6%'}}
                        inputClassName={'sv-mcf-input'}
                        optionsClassName={'sv-mcf-options'}
                        withoutFirstCell={true}
                    />
                    <div style={{fontSize: '18px', textAlign: 'left',cursor:'pointer',marginLeft:'6%', width: 'fit-content'}}
                         onClick={()=> this.delMFC(key)}
                    >
                        Убрать
                    </div>
                </div>
            )
        }
        return consums;
    }

    getSearchValue(cargoIndex) {
        return this.props.cargos[cargoIndex] ? this.props.cargos[cargoIndex].name + ' - ' + this.props.cargos[cargoIndex].article : '';
    }

    changedCargoCount(val, MCFKey) {
        let currentConsumables = Object.assign([], this.props.currentConsumables);
        currentConsumables[MCFKey].count = val;
        this.props.onSetConsumables(currentConsumables);
    }

    addNewMFC() {
        this.props.onSetConsumables([...this.props.currentConsumables, {id: -1, count: 0, cargoIndex: -1}]);
    }

    delMFC(MCFKey) {
        let currentConsumables = Object.assign([], this.props.currentConsumables);
        currentConsumables.splice(MCFKey,1);
        this.props.onSetConsumables(currentConsumables);
    }

    selectedCargo(val, MCFKey) {
        let currentConsumables = Object.assign([], this.props.currentConsumables);
        currentConsumables[MCFKey].cargoIndex = val;
        this.props.onSetConsumables(currentConsumables);
    }


    componentDidMount() {
        if(!this.props.addNew) {
            this.props.onSetConsumables([]);
        } else {
        }
    }
}

export default ServiceMCFEditor;