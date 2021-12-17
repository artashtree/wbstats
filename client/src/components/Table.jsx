import React from 'react';
import { connect } from 'react-redux';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Preloader from './Preloader';
import { setData, fetchData } from '../actions';

class Table extends React.Component {
    componentDidMount() {
        const { contextYear, itemsCount } = this.props;

        this.props.fetchData({
            year: contextYear,
            itemsCount,
        });
    }

    render() {
        const { isFetching, isFailed } = this.props;

        if (isFetching) {
            return <Preloader />;
        }

        if (isFailed) {
            return (
                <div className='d-flex justify-content-center'>
                    <div
                        className='alert alert-danger d-flex align-items-center justify-content-center w-25 mt-5'
                        role='alert'>
                        <div>The request has failed...</div>
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
    const { contextYear, isFetching, isFailed, itemsCount } = state.appReducer;

    return {
        contextYear,
        isFetching,
        isFailed,
        itemsCount,
    };
};

export default connect(mapStateToProps, { setData, fetchData })(Table);
