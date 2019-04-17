import React, {Component} from 'react';
import DropDown from "./DropDown";
import '../styles/DataFilter.css';

class DateFilter extends Component {
    render() {
        let years = [];
        for(let i = 15; i >= 0; --i) {
            years.push((new Date()).getFullYear() - i + '');
        }

        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
        const days = [
            31, this.props.year % 4 ===0? 29 : 28, 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];
        let currentDays = [];
        for(let i = 0; i < days[this.props.month]; ++i) {
            currentDays.push((i+1) + '');
        }
        return (
            <div className={'df'}>
                <DropDown
                    className={'dropdownPlaceholder'}
                    holderClassName={'df-dp'}
                    options={years}
                    value={this.getYearIndex(years)}
                    onChange={(v) => this.props.onChangeYear(years[v])}
                />
                <div className={'df-months'}>
                    {months.map((value, index) => (
                        <button key={index}
                                className={`${index === this.props.month? 'active' : ''}`}
                                onClick={() => this.props.onChangeMonth(index)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
                {this.props.days?
                    <DropDown className={'dropdownPlaceholder'}
                              holderClassName={'df-dp'}
                              options={currentDays}
                              value={this.props.day - 1}
                              onChange={(v) => this.props.onChangeDay(v)}
                    />:''
                }
            </div>
        );
    }

    getYearIndex(years) {
        for(let i in years) {
            if(this.props.year === +years[+i]) {
                return +i;
            }
        }
    }
}

export default DateFilter;