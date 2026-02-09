import React from 'react';

const Loader = ({ loading }) => {
    if (!loading) return null;
    return <div className='loader'>Processing AI Video...</div>;
};

export default Loader;
