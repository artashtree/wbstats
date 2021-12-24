import React from 'react';
import { connect } from 'react-redux';
import { sortByGroup, setSearchTerm } from '../actions';

const groups = {
    p: 'population',
    gdp: 'gdp',
    gdpc: 'gdpCapita',
};

class TableHead extends React.Component {
    sortByGroup = (event) => {
        event.preventDefault();
        const { groupName } = event.target.dataset;

        this.props.sortByGroup({ groupName });
    };

    handleSearchChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        this.props.setSearchTerm(value);
    };

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
                            data-group-name={groups.p}
                            onClick={this.sortByGroup}>
                            Population
                            <i
                                className={` ms-1
                                ${
                                    groupName === groups.p
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
                            data-group-name={groups.gdp}
                            onClick={this.sortByGroup}>
                            Economy
                            <i
                                className={` ms-1
                                ${
                                    groupName === groups.gdp
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
                            data-group-name={groups.gdpc}
                            onClick={this.sortByGroup}>
                            GDP per capita
                            <i
                                className={` ms-1
                                    ${
                                        groupName === groups.gdpc
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
    const { sorting, searchTerm } = state.appReducer;

    return { sorting, searchTerm };
};

export default connect(mapStateToProps, { sortByGroup, setSearchTerm })(
    TableHead
);
