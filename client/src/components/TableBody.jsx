import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { expandRecord, fetchWikiData, collapseRecords } from '../actions';
import { Link, withRouter } from 'react-router-dom';

class TableBody extends React.Component {
    componentDidMount() {
        const { history, data } = this.props;
        let itemKey = history.location.pathname.slice(3).toUpperCase();

        if (itemKey && data[itemKey]) {
            this.handleRowFocus(null, data[itemKey]);
        }

        history.listen((location, action) => {
            itemKey = location.pathname.slice(3).toUpperCase();
            if (!itemKey) {
                this.props.collapseRecords();
            } else if (data[itemKey] && action === 'POP') {
                this.handleRowFocus(null, data[itemKey]);
            }
        });
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
        const { data, contextYear } = this.props;

        if (!data) {
            return null;
        }

        let rowCounter = 1;
        const tableRows = Object.keys(data).map((itemKey) => {
            const item = data[itemKey];
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
                    <tr className='table-row table-row--record'>
                        <td>{rowCounter++}</td>
                        <td>
                            <Link
                                to={{
                                    pathname: `/e/${itemKey.toLocaleLowerCase()}`,
                                    name,
                                }}
                                onClick={() => this.handleRowFocus(null, item)}
                                onKeyPress={(e) =>
                                    this.handleRowFocus(e, item)
                                }>
                                {this.decodeHtmlEntities(name)}
                            </Link>
                        </td>
                        <td>{population ? population : 'no data'}</td>
                        <td>{gdp ? `$${parseInt(gdp, 10)}` : 'no data'}</td>
                        <td>
                            {gdpCapita
                                ? `$${parseInt(gdpCapita, 10)}`
                                : 'no data'}
                        </td>
                    </tr>
                    <tr
                        tabIndex={expanded ? 0 : -1}
                        className={`table-row ${
                            expanded
                                ? 'table-row--expanded'
                                : 'table-row--collapsed'
                        }`}>
                        <td colSpan={5}>
                            <p>{extract}</p>
                            <p>
                                <span>
                                    Read more about &nbsp;
                                    <a
                                        href={`https://en.wikipedia.org/wiki/${name}`}
                                        tabIndex={expanded ? 0 : -1}
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                        {name}
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

const mapStateToProps = (state) => {
    const { data, contextYear, sorting } = state.appReducer;

    return { data, contextYear, sorting };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { expandRecord, fetchWikiData, collapseRecords })
)(TableBody);
