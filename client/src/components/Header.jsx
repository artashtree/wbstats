import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { setContextYear, fetchWBData } from '../actions';
import logo from '../imgs/logo-wb.svg';

class Header extends React.Component {
    componentDidMount() {
        const searchPrefixLength = 5;
        const regex = /year=\d+/i;
        const searchString = this.props.history.location.search;
        const { itemsCount } = this.props;

        const match = searchString.match(regex);

        if (match) {
            const contextYear = searchString.slice(
                match.index + searchPrefixLength,
                match.index + match[0].length
            );

            this.props.fetchWBData({
                year: contextYear,
                itemsCount,
            });

            this.props.setContextYear({ contextYear });
        }

        this.unregisterHistoryListener = this.props.history.listen(
            (location, action) => {
                if (action === 'POP') {
                    const searchString = location.search;
                    const match = searchString.match(regex);

                    if (match) {
                        const contextYear = searchString.slice(
                            match.index + searchPrefixLength,
                            match.index + match[0].length
                        );

                        if (contextYear !== this.props.contextYear) {
                            this.props.setContextYear({ contextYear });
                            this.props.fetchWBData({
                                year: contextYear,
                                itemsCount,
                            });
                        }
                    } else {
                        this.props.setContextYear({ contextYear: '' });
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        this.unregisterHistoryListener();
    }

    handleYearChange = (event) => {
        const contextYear = event.target.value;
        const searchPrefixLength = 7;
        const { itemsCount } = this.props;
        const regex = /search=\w+/i;

        this.props.fetchWBData({
            year: contextYear,
            itemsCount,
        });
        this.props.setContextYear({ contextYear });

        const searchString = this.props.history.location.search;
        const match = searchString.match(regex);

        if (match) {
            const searchTerm = searchString.slice(
                match.index + searchPrefixLength,
                match.index + match[0].length
            );
            this.props.history.push({
                search: `year=${contextYear}&search=${searchTerm}`,
            });
        } else {
            this.props.history.push({ search: `year=${contextYear}` });
        }
    };

    render() {
        const { contextYear } = this.props;

        return (
            <header className='bg-white'>
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
                            aria-label='Username'
                            aria-describedby='basic-addon1'
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

export default compose(
    withRouter,
    connect(mapStateToProps, { setContextYear, fetchWBData })
)(Header);
