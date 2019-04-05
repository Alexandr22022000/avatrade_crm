import React, {Component} from 'react';
import MultipleCountableField from "../../core/components/MultipleCountableField";


class ServiceMCFEditor extends Component{
    render() {
        return (
            <div style={{marginTop:'20px'}}>
                {this.showMCFS()}
                <div style={{fontSize: '22px', cursor: 'pointer', width: 'fit-content',marginLeft:'6%',marginTop:'20px'}}
                     onClick={() => {this.addMCF()}}
                >
                    Добавить
                </div>
            </div>
        );
    }

    showMCFS() {
        let cargos = this.props.cargos.filter(value => value.status === 0).map(value => {
            return value.name + ' - ' + value.article;
        });
        let blocked = this.props.cargos.filter(value => value.status === 1).map(value => {
            return value.name + ' - ' + value.article;
        });
        const currentConsumables = this.props.currentConsumables;
        let mcfs = [];


        for(let i in currentConsumables) {
            let isReadOnly = this.isDeleted(currentConsumables[i]);
            let cargo = isReadOnly? this.getCargoById(currentConsumables[i].id): null;
            mcfs.push((
                <div style={{paddingLeft: '6%', marginBottom: '20px'}}>
                    <MultipleCountableField
                        needSearch={true}
                        withoutFirstCell={true}
                        options={cargos}
                        selectedId={this.getSelectedCargo(i)}
                        onSelected={(val) => this.onSelected(val, i)}
                        amount={currentConsumables[i].count}
                        maxCount={null}
                        withoutRange={true}
                        onCountChange={(val) => this.onCountChange(val, i)}
                        readOnly={isReadOnly}
                        readOnlyValue={isReadOnly?
                            <div style={{marginBottom: '20px'}}>
                                <s>{cargo.name} - {currentConsumables[i].count}</s>(Удалено)
                            </div>:''
                        }
                    />
                    <div onClick={() => {this.delMCF(i)}} style={{cursor: 'pointer'}}>
                        Убрать
                    </div>
                </div>
            ))
        }

        return mcfs;
    }

    isDeleted(consum) {
        for(let i in this.props.cargos) {
            if(this.props.cargos[i].id === consum.id && this.props.cargos[i].status===1) {
                return true;
            }
        }
        return false;
    }

    getCargoById(cargoId) {
        for(let i in this.props.cargos) {
            if(this.props.cargos[i].id === cargoId) {
                return this.props.cargos[i];
            }
        }
        return null;
    }

    getSelectedCargo(consumId) {
        let cargos = this.props.cargos.filter(value => value.status === 0);
        for(let i in cargos) {
            if(cargos[i].id === this.props.currentConsumables[consumId].id) {
                return +i
            }
        }
        return -1;
    }

    onSelected(cargoIndex, consumIndex) {
        let cargos = this.props.cargos.filter(value => value.status === 0);
        let consumables = this.props.currentConsumables.map(value => {return {...value}});
        if(cargoIndex !== -1) {
            consumables[consumIndex].id = cargos[cargoIndex].id;
        } else {
            consumables[consumIndex].id = null;
        }
        consumables[consumIndex].count = 0;
        this.props.onSetConsumables(consumables);
    }

    onCountChange(val, consumIndex) {
        let consumables = this.props.currentConsumables.map(value => {return {...value}});
        consumables[consumIndex].count = val;
        this.props.onSetConsumables(consumables);
    }

    addMCF() {
        let consumables = this.props.currentConsumables.map(value => {return {...value}});
        consumables.push({
            id: null,
            count: 0
        });
        this.props.onSetConsumables(consumables);
    }

    delMCF(consumIndex) {
        let consumables = this.props.currentConsumables.map(value => {return {...value}});
        consumables.splice(consumIndex,1);
        this.props.onSetConsumables(consumables);
    }

    componentDidMount() {
        let currentConsumables = [];

        for(let i in this.props.currentConsumables) {
            currentConsumables.push({
                id: this.props.currentConsumables[i].id,
                count: this.props.currentConsumables[i].count,
            })
        }
        this.props.onSetConsumables(currentConsumables);
    }
}

export default ServiceMCFEditor;