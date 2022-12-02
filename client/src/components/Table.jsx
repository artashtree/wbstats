import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Preloader from './Preloader';
import Message from './Message';
import Chart from './Chart';
class Table extends React.Component {
    render() {
        const { isFetching, isFailed, records, contextYear, viewMode } = this.props;
        const isNoData = Object.keys(records).length === 0;

        if (isFetching) {
            return <Preloader />;
        }

        if (contextYear === '') {
            return <Message type='info' text='Choose a year' />;
        }

        if (isFailed) {
            return <Message type='danger' text='The request has failed' />;
        }

        if (isNoData) {
            return (
                <Message
                    type='warning'
                    text={`There is no data for ${contextYear} year`}
                />
            );
        }

        return (
            <table className='table table-dark table-striped'>
                <TableHead />
                {viewMode === 'list' ? <TableBody /> : <Chart />}
            </table>
        );
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

Table.propTypes = {
    contextYear: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    records: PropTypes.objectOf(recordShape),
    viewMode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    const { isFetching, isFailed, records, contextYear, viewMode } = state.appReducer;

    return {
        isFetching,
        isFailed,
        records,
        contextYear,
        viewMode,
    };
};

export default connect(mapStateToProps)(Table);
