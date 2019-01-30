import React, {Component} from 'react';
import '../../core/styles/buttons.css';
import '../styles/Stuff.css';
import StuffEditor from '../containers/StuffEditor';

class Stuff extends  Component {
    render() {
        const users = [];
        this.props.users.map((item) => {
            users.push(
                <table onClick={() => this.showPerson(item.id)} style={{cursor: 'pointer', marginLeft: '8px'}}>
                    <tbody>
                    <tr>
                        <td><div className={'iconHolder'}/></td>
                        <td>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{textAlign: 'left', fontSize:'25px'}}>{item.name}</td>
                                </tr>
                                <tr>
                                    <td>{item.phone} - {item.rank}</td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        });

        return (
            <div>
                <div id={'controlButtons'}>
                    <button className={'btn-m'} onClick={() => this.showPerson(null)}>Добавить</button>
                </div>
                <div className={'stuffHolder'}>
                    <div id={'stuffList-holder'}>
                        <div id={'stuffHolder'}>
                            {users}
                        </div>
                    </div>
                    <hr color={'#1f1f1f'}/>
                    {!this.state.showEditor ? "" :
                        <StuffEditor onClose={() => this.setState({showEditor: false})}/>
                    }
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.props.onGetUsers();
        this.setState({
            showEditor: false,
        });
    }

    showPerson(personId) {
        if (personId) {
            this.props.onGetCurrentUser(personId);
        } else {
            this.props.onSetEmptyUser();
            //GET RANKS!!!
        }
        this.setState({showEditor: true});
    }
}

export default Stuff;