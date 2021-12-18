import React from 'react';
import { connect } from 'react-redux';
import { sortByGroup } from '../actions';

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

    render() {
        const { direction, groupName } = this.props.sorting;

        return (
            <thead className='table-head'>
                <tr className='table-row'>
                    <th></th>
                    <th></th>
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
    const { sorting } = state.appReducer;

    return { sorting };
};

export default connect(mapStateToProps, { sortByGroup })(TableHead);
