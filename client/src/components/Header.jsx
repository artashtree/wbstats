import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { setContextYear, fetchWBData } from '../actions';
import logo from '../imgs/logo-wb.svg';
import config from '../config';

const { params } = config;

class Header extends React.Component {
    componentDidMount() {
        const searchString = this.props.history.location.search;
        const { itemsCount } = this.props;

        const yearParamMatch = searchString.match(params.year.regex);

        if (yearParamMatch) {
            const contextYear = searchString.slice(
                yearParamMatch.index + params.year.prefixLength,
                yearParamMatch.index + yearParamMatch[0].length
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
                    const yearParamMatch = searchString.match(
                        params.year.regex
                    );

                    if (yearParamMatch) {
                        const contextYear = searchString.slice(
                            yearParamMatch.index + params.year.prefixLength,
                            yearParamMatch.index + yearParamMatch[0].length
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
        const value = event.target.value;
        const { itemsCount, searchTerm, sorting } = this.props;

        this.props.fetchWBData({
            year: value,
            itemsCount,
        });
        this.props.setContextYear({ contextYear: value });

        const yearParam = value ? `year=${value}` : '';
        const searchParam = searchTerm ? `&search=${searchTerm}` : '';
        const sortGroupParam = sorting.groupName
            ? `&sortgroup=${sorting.groupName}`
            : '';
        const sortDirParam = sorting.direction
            ? `&sortdir=${sorting.direction}`
            : '';
        const search = `${yearParam}${searchParam}${sortGroupParam}${sortDirParam}`;

        this.props.history.push({ search });
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
    const { contextYear, itemsCount, searchTerm, sorting } = state.appReducer;

    return {
        contextYear,
        itemsCount,
        searchTerm,
        sorting,
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { setContextYear, fetchWBData })
)(Header);
