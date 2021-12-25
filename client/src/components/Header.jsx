import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { setContextYear, fetchWBData } from '../actions';
import logo from '../imgs/logo-wb.svg';

class Header extends React.Component {
    componentDidMount() {
        const searchString = this.props.history.location.search;
        const { itemsCount } = this.props;

        const index = searchString.search(/y=\d{4}/g);

        if (index !== -1) {
            const contextYear = searchString.slice(index + 2, index + 7);

            this.props.fetchWBData({
                year: contextYear,
                itemsCount,
            });
            this.props.setContextYear({ contextYear });
        }

        this.unregisterHistoryListener = this.props.history.listen(
            (location, action) => {
                if (action === 'POP') {
                    const searchString = location.search;
                    const index = searchString.search(/y=\d{4}/g);

                    if (index !== -1) {
                        const contextYear = searchString.slice(
                            index + 2,
                            index + 7
                        );

                        if (contextYear !== this.props.contextYear) {
                            this.props.setContextYear({ contextYear });
                            this.props.fetchWBData({
                                year: contextYear,
                                itemsCount,
                            });
                        }
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        this.unregisterHistoryListener();
    }

    handleYearChange = (event) => {
        const contextYear = event.target.value;
        const { itemsCount } = this.props;

        this.props.fetchWBData({
            year: contextYear,
            itemsCount,
        });
        this.props.setContextYear({ contextYear });
        this.props.history.push({ search: `y=${contextYear}` });
    };

    render() {
        const { contextYear } = this.props;

        return (
            <header className='bg-white'>
                <form className='p-2 d-flex justify-content-between'>
                    <a
                        href='https://www.worldbank.org/'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <img src={logo} alt='WB Logo' />
                    </a>
                    <div className='input-group w-25'>
                        <div className='input-group-prepend'>
                            <label
                                htmlFor='yearInput'
                                className='input-group-text'
                                id='basic-addon1'>
                                Year:
                            </label>
                        </div>
                        <input
                            id='yearInput'
                            onChange={this.handleYearChange}
                            value={contextYear}
                            type='number'
                            className='form-control'
                            aria-label='Username'
                            aria-describedby='basic-addon1'
                        />
                    </div>
                </form>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    const { contextYear, itemsCount } = state.appReducer;

    return {
        contextYear,
        itemsCount,
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { setContextYear, fetchWBData })
)(Header);
