import React, {Component} from 'react';
import '../../core/styles/buttons.css';
import '../styles/Stuff.css';
import cross from '../../images/cross-icon.png';


class Stuff extends  Component {
    getModal() {
        let userTempData = {user:null, ranks: null};
        if(this.props.currentPerson !== null) {
            userTempData.user = Object.assign({}, this.props.currentPerson.user);
            userTempData.ranks = Object.assign({}, this.props.currentPerson.ranks);
        }
        console.log('USER_TEMP_DATA');
        console.log(userTempData);
        return(
            <div className={'modalHolder'} onClick={() => {this.props.onCloseModal()}}>
                <div className={'borders'} onClick={(e) => {e.stopPropagation()}}>
                    <div id={'cross'} >
                        <img src={cross} onClick={() => this.props.onCloseModal()} alt={'cross'}/>
                    </div>
                    <div className={'modal'}>
                        {this.props.currentPerson !== null? <div>
                                <h2>ФИО:</h2>
                                {this.props.blockStatuses[0] === true?
                                    <input
                                        onChange={e => userTempData.user.name = e.target.value}
                                        defaultValue={userTempData.user.name}
                                        onBlurCapture={() => {this.props.onChangeBlockStatus(-1); this.props.onFetchUserData(userTempData)}}
                                    />:
                                    <div onClick={() => this.props.onChangeBlockStatus(0)}>
                                        {userTempData.user.name}
                                    </div>
                                }
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
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
                        <div>aaa</div>
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