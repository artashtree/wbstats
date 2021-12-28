import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { expandRecord, fetchWikiData, collapseRecords } from '../actions';
import { Link, withRouter } from 'react-router-dom';

class TableBody extends React.Component {
    constructor(props) {
        super(props);

        this.currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'narrowSymbol',
        });

        this.numberFormatter = new Intl.NumberFormat('en-US');
    }

    componentDidMount() {
        const { history, records, searchTerm, filteredRecords } = this.props;
        let itemKey = history.location.pathname.slice(3).toUpperCase();

        const data = searchTerm === '' ? records : filteredRecords;

        if (itemKey && data[itemKey]) {
            this.handleRowFocus(null, records[itemKey]);
        }

        this.unregisterHistoryListener = history.listen((location, action) => {
            itemKey = location.pathname.slice(3).toUpperCase();
            if (action === 'POP') {
                if (location.pathname === '/' || location.pathname === '/r/') {
                    this.props.collapseRecords();
                } else if (data[itemKey]) {
                    this.handleRowFocus(null, data[itemKey]);
                }
            }
        });
    }

    componentWillUnmount() {
        this.unregisterHistoryListener();
    }

    handleRowFocus = (event, target) => {
        if ((event && event.key === 'Enter') || !event) {
            const { name, key } = target;

            this.props.fetchWikiData({ name, key });
        }
    };

    decodeHtmlEntities(encoded) {
        const elem = document.createElement('textarea');
        elem.innerHTML = encoded;

        return elem.value;
    }

    render() {
        const { records, contextYear, filteredRecords, searchTerm, sorting } =
            this.props;

        if (!records) {
            return null;
        }

        const yearParam = contextYear ? `year=${contextYear}` : '';
        const searchParam = searchTerm ? `&search=${searchTerm}` : '';
        const sortGroupParam = sorting.groupName
            ? `&sortgroup=${sorting.groupName}`
            : '';
        const sortDirParam = sorting.direction
            ? `&sortdir=${sorting.direction}`
            : '';
        const search = `${yearParam}${searchParam}${sortGroupParam}${sortDirParam}`;

        let rowCounter = 1;
        const data = searchTerm === '' ? records : filteredRecords;

        const tableRows = Object.keys(data).map((itemKey) => {
            const item = records[itemKey];
            const population =
                item.population && item.population[contextYear]
                    ? item.population[contextYear]
                    : null;
            const gdp =
                item.gdp && item.gdp[contextYear]
                    ? item.gdp[contextYear]
                    : null;
            const gdpCapita = item.gdpCapita
                ? item.gdpCapita[contextYear]
                : null;
            const { name, extract, expanded } = item;

            return (
                <React.Fragment key={itemKey}>
                    <tr>
                        <td>{rowCounter++}</td>
                        <td>
                            {!expanded ? (
                                <Link
                                    className='text-white'
                                    to={{
                                        pathname: `/r/${itemKey.toLocaleLowerCase()}`,
                                        search,
                                    }}
                                    onClick={() =>
                                        this.handleRowFocus(null, item)
                                    }
                                    onKeyPress={(e) =>
                                        this.handleRowFocus(e, item)
                                    }>
                                    {this.decodeHtmlEntities(name)}
                                </Link>
                            ) : (
                                <span>{this.decodeHtmlEntities(name)}</span>
                            )}
                        </td>
                        <td>
                            {population
                                ? this.numberFormatter.format(population)
                                : '-'}
                        </td>
                        <td>
                            {gdp
                                ? `${this.currencyFormatter.format(gdp)}`
                                : '-'}
                        </td>
                        <td>
                            {gdpCapita
                                ? `${this.currencyFormatter.format(gdpCapita)}`
                                : '-'}
                        </td>
                    </tr>
                    <tr
                        tabIndex={expanded ? 0 : -1}
                        style={expanded ? null : { display: 'none' }}>
                        <td colSpan={5}>
                            <p>{extract}</p>
                            <p>
                                <span>
                                    Read more about &nbsp;
                                    <a
                                        href={`https://en.wikipedia.org/wiki/${this.decodeHtmlEntities(
                                            name
                                        )}`}
                                        className='text-white'
                                        tabIndex={expanded ? 0 : -1}
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                        {this.decodeHtmlEntities(name)}
                                    </a>
                                </span>
                            </p>
                        </td>
                    </tr>
                </React.Fragment>
            );
        });

        return <tbody>{tableRows}</tbody>;
    }
}

const recordShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    extract: PropTypes.string.isRequired,
    population: PropTypes.objectOf(PropTypes.string.isRequired),
    gdp: PropTypes.objectOf(PropTypes.string.isRequired),
    gdpCapita: PropTypes.objectOf(PropTypes.string.isRequired),
});

TableBody.propTypes = {
    contextYear: PropTypes.string.isRequired,
    searchTerm: PropTypes.string.isRequired,
    sorting: PropTypes.exact({
        groupName: PropTypes.string.isRequired,
        direction: PropTypes.string.isRequired,
    }),
    records: PropTypes.objectOf(recordShape),
    filteredRecords: PropTypes.objectOf(recordShape),
};

const mapStateToProps = (state) => {
    const { records, contextYear, sorting, filteredRecords, searchTerm } =
        state.appReducer;

    return { records, contextYear, sorting, filteredRecords, searchTerm };
};

export default compose(
    withRouter,
    connect(mapStateToProps, {
        expandRecord,
        fetchWikiData,
        collapseRecords,
    })
)(TableBody);
