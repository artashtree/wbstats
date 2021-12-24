import React from 'react';

const Preloader = () => {
    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='spinner-border text-light' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
    );
};

export default Preloader;
