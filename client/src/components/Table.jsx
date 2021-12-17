import React from 'react';
import { connect } from 'react-redux';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Preloader from './Preloader';
import { setData, fetchData } from '../actions';
import './Table.css';

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
                <div className='error-message'>
                    <p>The request has failed...</p>
                </div>
            );
        }

        return (
            <table className='table'>
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
