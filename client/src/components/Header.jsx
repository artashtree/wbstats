import React from 'react';
import { connect } from 'react-redux';
import { setYear, fetchData } from '../actions';
import logo from './logo-wb.svg';
import './Header.css';

class Header extends React.Component {
    handleYearChange = (event) => {
        const contextYear = event.target.value;
        const { itemsCount } = this.props;

        this.props.fetchData({
            year: contextYear,
            itemsCount,
        });
        this.props.setYear({ contextYear });
    };

    render() {
        const { contextYear } = this.props;
        
        return (
            <header>
                <form className='form'>
                    <a href='https://www.worldbank.org/'>
                        <img src={logo} alt='WB Logo' />
                    </a>
                    <label className='form__label'>
                        Show year:
                        <input
                            type='number'
                            className='form__input'
                            onChange={this.handleYearChange}
                            value={contextYear}
                        />
                    </label>
                </form>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    const { contextYear, itemsCount } = state.appReducer;

    return {
        contextYear,
        itemsCount,
    };
};

export default connect(mapStateToProps, { setYear, fetchData })(Header);
