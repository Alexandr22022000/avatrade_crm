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
        for(let i in currentConsumables) {
            for(let j in this.props.cargos) {
                if (currentConsumables[i].id === this.props.cargos[j].id) {
                    disabled.push(j);
                    break;
                }
            }
        }

        let consums = [];
        for(let key in currentConsumables) {
            consums.push(
                <div key={key}>
                    <MultipleCountableField
                        needSearch={true}
                        options={cargos}
                        block={deleted}
                        amount={currentConsumables[key].count}
                        onSelected={(val) => this.selectedCargo(val, key)}
                        onCountChange={(val) => this.changedCargoCount(val, key)}
                        value={this.getSelectedCargoId(key)}
                        disabled={disabled}
                        withoutRange={true}
                        style={{marginLeft:'6%'}}
                        inputClassName={'sv-mcf-input'}
                        optionsClassName={'sv-mcf-options'}
                        withoutFirstCell={true}
                        maxCount={null}
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.currentConsumables);
    }

    getSearchValue(cargoIndex) {
        return this.props.cargos[cargoIndex] ? this.props.cargos[cargoIndex].name + ' - ' + this.props.cargos[cargoIndex].article : '';
    }

    getSelectedCargoId(key) {
        if(this.props.currentConsumables[key].id === null) return -1;
        for(let i in this.props.cargos.filter(v => v.status === 0)) {
            if(this.props.currentConsumables[key].id === this.props.cargos[i].id) {
                return +i;
            }
        }
    }

    selectedCargo(cargoId, key) {
        let currentConsumables = [...this.props.currentConsumables];
        if(cargoId !== -1) {
            currentConsumables[key] = this.props.cargos.filter(v => v.status === 0)[cargoId];
        } else {
            currentConsumables[key].id = null;
            currentConsumables[key].article = null;
            currentConsumables[key].count = 0;
            currentConsumables[key].name = null;
        }
        this.props.onSetConsumables(currentConsumables);
    }

    changedCargoCount(val, key) {
        let currentConsumables = [...this.props.currentConsumables];
        currentConsumables[key].count = val;
        this.props.onSetConsumables(currentConsumables);
    }

    addNewMFC() {
        let currentConsumables = [...this.props.currentConsumables];
        currentConsumables.push({
            id: null,
            article: null,
            count: 0,
            name: null,
        });
        this.props.onSetConsumables(currentConsumables);
    }

    delMFC(key) {
        let currentConsumables = [...this.props.currentConsumables];
        currentConsumables.splice(key,1);
        this.props.onSetConsumables(currentConsumables);
    }


}

export default ServiceMCFEditor;