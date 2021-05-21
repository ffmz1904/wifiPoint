import React from 'react';
import PropTypes from "prop-types";

const Marker = ({ className, width, height}) => {

    if (width && height) {
        return (
            <div className={className ? `Marker ${className}` : "Marker"}
                 style={{
                     width: `${width}px`,
                     height: `${height}px`,
                     position: 'relative',
                     top: `-${parseFloat(width / 2)}px`,
                     left: `-${parseFloat(height / 2)}px`
                 }}
            >
                <div style={{
                    position: 'relative',
                    top: `${parseFloat(width / 2) -3}px`,
                    left: `${parseFloat(height / 2) -3}px`
                }} />
            </div>
        );
    }

    return (
        <div className={className ? `Marker ${className}` : "Marker"}/>
    );
};

Marker.propTypes = {
  className: PropTypes.string
};

export default Marker;
