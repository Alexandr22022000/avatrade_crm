import React, {Component} from 'react';
import '../../core/styles/buttons.css';
import '../styles/Stuff.css';
import cross from '../../images/cross-icon.png';
import DropDown from "./DropDown";



class Stuff extends  Component {
    getModal() {
        let userTempData = {user:null, ranks: null};
        if(this.props.currentPerson !== null) {
            userTempData.user = Object.assign({}, this.props.currentPerson.user);
            userTempData.ranks = Object.assign({}, this.props.currentPerson.ranks);
        }
        return(
            <div className={'modalHolder'} onClick={() => {this.props.onCloseModal(); this.props.onChangeBlockStatus(-1);}}>
                <div className={'borders'} onClick={(e) => {e.stopPropagation()}}>
                    <div id={'cross'} >
                        <img src={cross}
                             onClick={() => {this.props.onCloseModal();this.props.onChangeBlockStatus(-1);}}
                             alt={'cross'}
                             style={{cursor: 'pointer'}}
                        />
                    </div>
                    <div className={'modal'}>
                        {this.showCurrentPerson(userTempData)}
                    </div>
                    <div className={'saveButtonHolder'}>
                        <button className={'btn-m'}
                                onClick={() => {
                                    this.props.onUpdateUserData({...userTempData.user, id:this.props.currentPersonId});
                                }}
                        >
                            Сохранить
                        </button>
                    </div>

                </div>
            </div>
        )
    }

    showCurrentPerson(userTempData) {
        let dropDownOptions = [];
        for(let index in userTempData.ranks) {
            dropDownOptions.push(userTempData.ranks[index].name);
        }
        let newDocName;
        console.log(`dropDownOptions ${dropDownOptions}`);
        return (
            <div>
                {this.props.currentPerson !== null?
                    <div>
                        <h2>ФИО:</h2>
                        {this.props.blockStatuses[0] === true?
                            <div>
                                <input
                                    onChange={e => userTempData.user.name = e.target.value}
                                    defaultValue={userTempData.user.name}
                                    onBlurCapture={() => {this.props.onChangeBlockStatus(-1); this.props.onFetchUserData(userTempData)}}
                                    autoFocus
                                    className={'inline fixed'}
                                />
                                <div className={'write-icon inline'} />
                            </div>:
                            <div>
                                <div className={'inline fixed'}>
                                    {userTempData.user.name}
                                </div>
                                <div className={'write-icon inline'} onClick={() => this.props.onChangeBlockStatus(0)}/>
                            </div>
                        }
                        <h2>Адрес:</h2>
                        {this.props.blockStatuses[1] === true?
                            <div>
                                <input
                                    onChange={e => userTempData.user.email = e.target.value}
                                    defaultValue={userTempData.user.email}
                                    onBlurCapture={() => {this.props.onChangeBlockStatus(-1); this.props.onFetchUserData(userTempData)}}
                                    autoFocus
                                    className={'inline fixed'}
                                />
                                <div className={'write-icon inline'} />
                            </div>:
                            <div>
                                <div className={'inline fixed'}>
                                    {userTempData.user.email}
                                </div>
                                <div className={'write-icon inline'} onClick={() => this.props.onChangeBlockStatus(1)}/>
                            </div>
                        }
                        <h2>Телефон:</h2>
                        {this.props.blockStatuses[2] === true?
                            <div>
                                <input
                                    onChange={e => userTempData.user.phone = e.target.value}
                                    defaultValue={userTempData.user.phone}
                                    onBlurCapture={() => {this.props.onChangeBlockStatus(-1); this.props.onFetchUserData(userTempData)}}
                                    autoFocus
                                    className={'inline fixed'}
                                />
                                <div className={'write-icon inline'} />
                            </div>:
                            <div>
                                <div className={'inline fixed'}>
                                    {userTempData.user.phone}
                                </div>
                                <div className={'write-icon inline'} onClick={() => this.props.onChangeBlockStatus(2)}/>
                            </div>
                        }
                        <h2>VK:</h2>
                        {this.props.blockStatuses[3] === true?
                            <div>
                                <input
                                    onChange={e => userTempData.user.vk = e.target.value}
                                    defaultValue={userTempData.user.vk}
                                    onBlurCapture={() => {this.props.onChangeBlockStatus(-1); this.props.onFetchUserData(userTempData)}}
                                    autoFocus
                                    className={'inline fixed'}
                                />
                                <div className={'write-icon inline'} />
                            </div>:
                            <div>
                                <div className={'inline fixed'}>
                                    {userTempData.user.vk}
                                </div>
                                <div className={'write-icon inline'} onClick={() => this.props.onChangeBlockStatus(3)}/>
                            </div>
                        }
                        <h2>Ранг:</h2>
                        {console.log(userTempData.user.rank)}
                        <div><DropDown userTempData={userTempData}/></div>
                        <h2>Документы:</h2>
                        <div>{console.log(userTempData.user.docs)}{userTempData.user.docs.map((value, index) => {
                            return (
                                <div className={'docHolder'} key={index}>
                                    <div className={'inline'}>{value.length >= 25?
                                        value.substring(0,24) + '...':
                                        value
                                    }</div>
                                    <div style={{display: 'inline-block'}}>
                                        <img src={cross}
                                             alt={'cross'}
                                             style={{cursor: 'pointer', position:'relative', top: '8px', left: '30px'}}
                                             onClick={()=> {userTempData.user.docs.splice(index,1);this.props.onFetchUserData(userTempData)}}
                                        />
                                    </div>
                                </div>
                            )
                        })}</div>
                        <button className={'addDocButton'}
                                onClick={() => this.props.onChangeBlockStatus(4)}
                        >
                            Добавить
                        </button>
                        {this.props.blockStatuses[4] === true?
                            <div><input
                                onChange={e => newDocName = e.target.value}
                                onBlurCapture={() => {
                                    this.props.onChangeBlockStatus(-1);
                                    userTempData.user.docs.push(newDocName);
                                    this.props.onFetchUserData(userTempData);
                                }}
                                autoFocus
                                className={'inline fixed'}
                            /></div>:
                            <div/>
                        }
                    </div>:
                    <div/>}
            </div>
        )
    }

    render() {
        const style = {
            holder: 'stuffHolder',
        };
        return (
            <div>
                <div id={'controlButtons'}>
                    <button className={'btn-m'}>Добавить</button>
                </div>
                <div className={style.holder}>
                    <div id={'stuffList-holder'}>
                        <div id={'stuffHolder'}>
                            {this.props.stuff.map((value, index) => {
                                return <table onClick={() => this.showPerson(value)}
                                              style={{cursor: 'pointer', marginLeft: '8px'}}
                                              key={index}>
                                    <tbody>
                                        <tr>
                                            <td><div className={'iconHolder'}/></td>
                                            <td>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{textAlign: 'left', fontSize:'25px'}}>{value.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                {value.phone} - {value.rank}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            })}
                        </div>
                    </div>
                    <hr color={'#1f1f1f'}/>
                    {this.props.modalStatus? this.getModal():<div/>}
                </div>
            </div>
        );
    }

    showPerson(personInfo) {
        this.props.onGetCurrentUser(personInfo.id);
        this.props.onOpenModal(personInfo.id);
    }

    componentDidMount() {
        this.props.onGetUsers();
    }
}

export default Stuff;