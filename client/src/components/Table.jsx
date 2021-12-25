import React from 'react';
import { connect } from 'react-redux';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Preloader from './Preloader';
import { fetchWBData } from '../actions';
class Table extends React.Component {
    render() {
        const { isFetching, isFailed, records, contextYear } = this.props;
        const isNoData = Object.keys(records).length === 0;

        if (isFetching) {
            return <Preloader />;
        }

        if (contextYear === '') {
            return (
                <div className='d-flex justify-content-center'>
                    <div
                        className='alert alert-info d-flex align-items-center justify-content-center w-50 mt-5'
                        role='alert'>
                        <div>Choose a year</div>
                    </div>
                </div>
            );
        }

        if (isFailed) {
            return (
                <div className='d-flex justify-content-center'>
                    <div
                        className='alert alert-danger d-flex align-items-center justify-content-center w-50 mt-5'
                        role='alert'>
                        <div>The request has failed...</div>
                    </div>
                </div>
            );
        }

        if (isNoData) {
            return (
                <div className='d-flex justify-content-center'>
                    <div
                        className='alert alert-warning d-flex align-items-center justify-content-center w-50 mt-5'
                        role='alert'>
                        <div>There is no data for this year</div>
                    </div>
                </div>
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
