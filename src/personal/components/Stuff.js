import React, {Component} from 'react';
import '../../core/styles/buttons.css';
import '../styles/Stuff.css';
import cross from '../../images/cross-icon.png';


class Stuff extends  Component {
    getModal() {
        return(
            <div className={'modalHolder'} onClick={() => {this.props.onCloseModal()}}>
                <div className={'borders'} onClick={(e) => {e.stopPropagation()}}>
                    <div id={'cross'} >
                        <img src={cross} onClick={() => this.props.onCloseModal()} alt={'cross'}/>
                    </div>
                    <div className={'modal'}>
                        {this.props.currentPerson !== null? <div>
                                {this.props.personDataList.map(value => {
                                    return <div>
                                        <h2>{value.name}</h2>
                                        <div>{value.data}</div>
                                    </div>
                                })}
                        </div>:
                        <div/>}
                    </div>
                    <hr color={'#1f1f1f'}/>
                </div>
            </div>
        )
    }

    render() {
        const style = {
            holder: 'stuffHolder',
        };
        console.log('Person: ',this.props.currentPerson);
        return (
            <div className={style.holder}>
                <div id={'stuffList-holder'}>
                    <h1>Персонал</h1>
                    <div id={'controlButtons'}>
                        <button className={'btn-m'}>Добавить</button>
                    </div>
                    <div id={'stuffHolder'}>
                        {this.props.stuff.map((value, index) => {
                            return <div key={index}
                                        style={{cursor: 'pointer', marginLeft:'6px'}}
                                        onClick={() => this.showPerson(value)}
                            >
                                {value.name} | {value.phone} | {value.rank}
                            </div>
                        })}
                    </div>
                </div>
                <hr color={'#1f1f1f'}/>
                {this.props.modalStatus? this.getModal():<div/>}
            </div>
        );
    }

    showPerson(personInfo) {
        this.props.onGetCurrentUser(personInfo.id);
        this.props.onOpenModal();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(`Stuff shouldComponentUpdate`);
        console.log('Current person: ',nextProps.currentPerson);
        return true;
    }

    componentDidMount() {
        this.props.onGetUsers();
    }
}

export default Stuff;