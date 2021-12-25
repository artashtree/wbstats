import React from 'react';
import { connect } from 'react-redux';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Preloader from './Preloader';
import Message from './Message';
import { fetchWBData } from '../actions';
class Table extends React.Component {
    render() {
        const { isFetching, isFailed, records, contextYear } = this.props;
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
                <Message type='warning' text='There is no data for this year' />
            );
        }

        return (
            <table className='table table-dark table-striped'>
                <TableHead />
                <TableBody />
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    const { isFetching, isFailed, records, contextYear } = state.appReducer;

    return {
        isFetching,
        isFailed,
        records,
        contextYear,
    };
};

export default connect(mapStateToProps, { fetchWBData })(Table);
