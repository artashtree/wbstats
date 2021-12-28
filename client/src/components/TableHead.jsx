import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sortByGroup, setSearchTerm } from '../actions';
import config from '../config';

const { sortingGroups, params } = config;
class TableHead extends React.Component {
    sortByGroup = (event) => {
        event.preventDefault();
        const { groupName } = event.target.dataset;
        const { contextYear, searchTerm, sorting } = this.props;

        let direction;
        if (groupName === sorting.groupName && sorting.groupName !== '') {
            direction = sorting.direction === 'asc' ? 'desc' : 'asc';
        } else {
            direction = 'desc';
        }
        
        const yearParam = contextYear ? `year=${contextYear}` : '';
        const searchParam = searchTerm ? `&search=${searchTerm}` : '';
        const sortGroupParam = `&sortgroup=${groupName}`;
        const sortDirParam = `&sortdir=${direction}`;
        const search = `${yearParam}${searchParam}${sortGroupParam}${sortDirParam}`;
        this.props.history.push({ search });

        this.props.sortByGroup({ groupName, direction });
    };

    handleSearchChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const { contextYear, sorting } = this.props;

        this.props.setSearchTerm(value);

        const yearParam = contextYear ? `year=${contextYear}` : '';
        const searchParam = value ? `&search=${value}` : '';
        const sortGroupParam = sorting.groupName
            ? `&sortgroup=${sorting.groupName}`
            : '';
        const sortDirParam = sorting.direction
            ? `&sortdir=${sorting.direction}`
            : '';
        const search = `${yearParam}${searchParam}${sortGroupParam}${sortDirParam}`;

        this.props.history.push({ search });
    };

    onHistoryListen = (location, action) => {
        if (action === 'POP') {
            const searchString = location.search;

            const searchParamMatch = searchString.match(
                params.search.regex
            );
            if (searchParamMatch) {
                const searchTerm = searchString.slice(
                    searchParamMatch.index + params.search.prefixLength,
                    searchParamMatch.index + searchParamMatch[0].length
                );
                this.props.setSearchTerm(searchTerm);
            } else {
                this.props.setSearchTerm('');
            }

            const sortGroupParamMatch = searchString.match(params.sortGroup.regex);
            const sortDirParamMatch = searchString.match(params.sortDir.regex);

            if (sortGroupParamMatch && sortDirParamMatch) {
                const groupName = searchString.slice(
                    sortGroupParamMatch.index + params.sortGroup.prefixLength,
                    sortGroupParamMatch.index + sortGroupParamMatch[0].length
                );

                const direction = searchString.slice(
                    sortDirParamMatch.index + params.sortDir.prefixLength,
                    sortDirParamMatch.index + sortDirParamMatch[0].length
                );

                this.props.sortByGroup({ groupName, direction });
            }
        }
    };

    componentDidMount() {
        const searchString = this.props.history.location.search;

        const searchParamMatch = searchString.match(params.search.regex);
        if (searchParamMatch) {
            const searchTerm = searchString.slice(
                searchParamMatch.index + params.search.prefixLength,
                searchParamMatch.index + searchParamMatch[0].length
            );
            this.props.setSearchTerm(searchTerm);
        }

        const sortGroupParamMatch = searchString.match(params.sortGroup.regex);
        const sortDirParamMatch = searchString.match(params.sortDir.regex);

        if (sortGroupParamMatch && sortDirParamMatch) {
            const groupName = searchString.slice(
                sortGroupParamMatch.index + params.sortGroup.prefixLength,
                sortGroupParamMatch.index + sortGroupParamMatch[0].length
            );

            const direction = searchString.slice(
                sortDirParamMatch.index + params.sortDir.prefixLength,
                sortDirParamMatch.index + sortDirParamMatch[0].length
            );

            this.props.sortByGroup({ groupName, direction });
        }

        this.unregisterHistoryListener = this.props.history.listen(this.onHistoryListen);
    }

    componentWillUnmount() {
        this.unregisterHistoryListener();
    }

    render() {
        const { direction, groupName } = this.props.sorting;
        const { searchTerm } = this.props;

        return (
            <thead className='table-head'>
                <tr className='table-row'>
                    <th colSpan={2}>
                        <div className='input-group w-50'>
                            <div className='input-group-prepend'>
                                <label
                                    htmlFor='searchInput'
                                    className='input-group-text'
                                    id='basic-addon2'>
                                    Search:
                                </label>
                            </div>
                            <input
                                id='searchInput'
                                onChange={this.handleSearchChange}
                                value={searchTerm}
                                type='text'
                                className='form-control'
                                aria-label='Search'
                                aria-describedby='basic-addon2'
                            />
                        </div>
                    </th>
                    <th>
                        <button
                            className='btn btn-light d-flex align-items-center'
                            type='button'
                            data-group-name={sortingGroups.p}
                            onClick={this.sortByGroup}>
                            Population
                            <i
                                className={` ms-1
                                ${
                                    groupName === sortingGroups.p
                                        ? direction === 'asc'
                                            ? 'icon-circle-up'
                                            : 'icon-circle-down'
                                        : 'icon-circle-right'
                                }`}></i>
                        </button>
                    </th>
                    <th>
                        <button
                            className='btn btn-light d-flex align-items-center'
                            type='button'
                            data-group-name={sortingGroups.gdp}
                            onClick={this.sortByGroup}>
                            Economy
                            <i
                                className={` ms-1
                                ${
                                    groupName === sortingGroups.gdp
                                        ? direction === 'asc'
                                            ? 'icon-circle-up'
                                            : 'icon-circle-down'
                                        : 'icon-circle-right'
                                }`}></i>
                        </button>
                    </th>
                    <th>
                        <button
                            className='btn btn-light d-flex align-items-center'
                            type='button'
                            data-group-name={sortingGroups.gdpc}
                            onClick={this.sortByGroup}>
                            GDP per capita
                            <i
                                className={` ms-1
                                    ${
                                        groupName === sortingGroups.gdpc
                                            ? direction === 'asc'
                                                ? 'icon-circle-up'
                                                : 'icon-circle-down'
                                            : 'icon-circle-right'
                                    }`}></i>
                        </button>
                    </th>
                </tr>
            </thead>
        );
    }
}

const mapStateToProps = (state) => {
    const { sorting, searchTerm, contextYear } = state.appReducer;

    return { sorting, searchTerm, contextYear };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { sortByGroup, setSearchTerm })
)(TableHead);
