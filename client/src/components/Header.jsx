import React from 'react';
import { connect } from 'react-redux';
import { setContextYear, fetchWBData } from '../actions';
import logo from '../imgs/logo-wb.svg';

class Header extends React.Component {
    handleYearChange = (event) => {
        const contextYear = event.target.value;
        const { itemsCount } = this.props;

        this.props.fetchWBData({
            year: contextYear,
            itemsCount,
        });
        this.props.setContextYear({ contextYear });
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
                    <div className='input-group w-25'>
                        <div className='input-group-prepend'>
                            <label
                                htmlFor='yearInput'
                                className='input-group-text'
                                id='basic-addon1'>
                                Year:
                            </label>
                        </div>
                        <input
                            id='yearInput'
                            onChange={this.handleYearChange}
                            value={contextYear}
                            type='number'
                            className='form-control'
                            ariaLabel='Username'
                            ariaDescribedBy='basic-addon1'
                        />
                    </div>
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

export default connect(mapStateToProps, { setContextYear, fetchWBData })(Header);
