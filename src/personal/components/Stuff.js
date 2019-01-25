import React, {Component} from 'react';
import '../../core/styles/buttons.css';
import '../styles/Stuff.css';

class Stuff extends  Component{
    render() {
        const style = {
            holder: 'stuffHolder',
        };
        return (
            <div className={style.holder}>
                <div id={'stuffList-holder'}>
                    <h1>Персонал</h1>
                    <div id={'controlButtons'}>
                        <button className={'btn-m'}>Добавить</button>
                    </div>
                    <div>ФИО  телефон  ранг</div>
                    <div id={'stuffHolder'}>

                    </div>
                </div>
            </div>
        );
    }
}

export default Stuff;