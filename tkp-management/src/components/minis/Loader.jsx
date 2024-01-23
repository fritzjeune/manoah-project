// LoaderComponent.js

import React from 'react';
import './LoaderComponent.css';

const LoaderComponent = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoaderComponent;