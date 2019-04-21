import React, {Component} from 'react';
import DropDown from "./DropDown";
import '../styles/DateInput.css';

class DateInput extends Component {
    state = {

    };

    render() {
        let days = this.setDays(2019,10);
        let months = [];

        for(let i = 1; i <= 12; ++i) {
            months.push(i)
        }
        let date = this.props.date;

        return (
            <div className={'date-input'}>
                <DropDown
                    holderClassName={'sells-filters-holder inline'}
                    className={'sells-filters-input'}
                    options={days}
                    value={date.getDate()}
                    onChange={v => this.onDayChange(v)}
                />
                <DropDown
                    holderClassName={'sells-filters-holder inline'}
                    className={'sells-filters-input'}
                    options={months}
                    value={date.getMonth()}
                    onChange={v => this.onMonthChange(v)}
                />
                <div className={'inline'}>
                    <input className={'di-input inline'}
                           value={date.getFullYear()}
                           onChange={e => this.onYearChange(e.target.value)}
                    />
                    <div className={'di-buttons inline'}>
                        <button className={'di-arrow'} onClick={() => this.onIncrease(date.getFullYear())}>▲</button>
                        <button className={'di-arrow'} onClick={() => this.onDecrease(date.getFullYear())}>▼</button>
                    </div>
                </div>
            </div>
        );
    }

    onMonthChange(v) {
        let date = this.props.date;
        date.setMonth(v);
        this.props.onChange(date);
    };

    onDayChange(v) {
        let date = this.props.date;
        date.setDate(v);
        this.props.onChange(date);
    }

    onYearChange(value) {
        let regexp = /^\d*$/;
        if(regexp.test(value)){
            let date = this.props.date;
            date.setFullYear(+value);
            this.props.onChange(date);
        }
    }

    onIncrease(val) {
        this.onYearChange(val + 1);
    }

    onDecrease(val) {
        this.onYearChange(val - 1);
    }

    setDays (year, month) {
        const days = [
            31, year % 4 ===0? 29 : 28, 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];
        let currentDays = ['-'];
        for(let i = 0; i < days[month]; ++i) {
            currentDays.push((i+1) + '');
        }
        return currentDays;
    }
}

export default DateInput;