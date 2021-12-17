import React from 'react';
import { connect } from 'react-redux';
import { setYear, fetchData } from '../actions';
import logo from '../imgs/logo-wb.svg';

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
                <form className='p-2 d-flex justify-content-between'>
                    <a
                        href='https://www.worldbank.org/'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <img src={logo} alt='WB Logo' />
                    </a>
                    <label className='p-2'>
                        Show year:
                        <input
                            type='number'
                            className='ms-2'
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
