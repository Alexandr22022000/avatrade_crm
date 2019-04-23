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