import React, {Component} from 'react';
import MultipleCountableField from "../../core/components/MultipleCountableField";

class ServiceMCFEditor extends Component {
    render() {
        return (
            <div style={{marginLeft: '6%',marginTop: '20px'}}>
                {this.showMCFs()}
                <div style={{fontSize: '22px', cursor: 'pointer', width: 'fit-content'}}
                     onClick={() => {this.addNewMFC()}}
                >
                    Добавить
                </div>
            </div>
        );
    }

    showMCFs(){
        let cargos = [];
        for(let key in this.props.cargos) {
            cargos.push(this.props.cargos[key].name)
        }
        let consums = [];
        if(this.props.currentConsumables) {
            const currentConsumables = this.props.currentConsumables;
            for (let key in currentConsumables) {
                consums.push(
                    <div key={key}>
                        <MultipleCountableField needSearch={true}
                                                options={cargos}
                                                amount={currentConsumables[key].count}
                                                onSelected={(val) => this.selectedCargo(val, key)}
                                                onCountChange={(val) => this.changedCargo(val, key)}
                                                value={this.getSearchValue(currentConsumables[key].id)}
                        />
                        <div style={{fontSize: '18px', textAlign: 'left'}}>Убрать</div>
                    </div>
                )
            }
        }
        return (
            consums
        )
    }

    delMFC(MFCkey) {
        let currentConsumables = this.props.currentService.consumables;
        for(let key in currentConsumables) {
            if(key === MFCkey) {
                currentConsumables.splice(+key,1);
                this.props.onSetConsumables(currentConsumables);
            }
        }
    }

    addNewMFC() {
        this.props.onSetConsumables(...this.props.currentConsumables, {id: 0, count: 0});
    }

    getSearchValue(cargoId) {
        for(let key in this.props.cargos) {
            if(this.props.cargos[key].id === cargoId) {
                return this.props.cargos[key].name;
            }
        }
        return '';
    }

    selectedCargo(val, MCFKey) {
        let currentConsumables = this.props.currentConsumables;
        for(let key in currentConsumables) {
            if(key === MCFKey) {
                currentConsumables[key].id = this.props.cargos[val].id;
            }
        }
        this.props.onSetConsumables(currentConsumables);
    }

    changedCargo(val, MCFKey) {
        let currentConsumables = this.props.currentService.consumables;
        for(let key in currentConsumables) {
            if(key === MCFKey) {
                currentConsumables[key].count = val;
            }
        }
        this.props.onSetConsumables(currentConsumables);
    }

    componentDidMount() {
        this.props.onLoadCargos();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.currentConsumables);
        return true;
    }
}

export default ServiceMCFEditor;