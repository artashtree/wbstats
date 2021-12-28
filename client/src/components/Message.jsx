import React from 'react';
import PropTypes from 'prop-types';

 const Message = ({ type, text }) => {
    return (
        <div className='d-flex justify-content-center'>
            <div
                className={`alert alert-${type} d-flex align-items-center justify-content-center w-50 mt-5`}
                role='alert'>
                <div>{text}</div>
            </div>
        </div>
    );
};

Message.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Message;