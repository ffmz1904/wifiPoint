import React from 'react';
import PropTypes from "prop-types";

const Marker = ({ className, text }) => {
    return (
        <div className={className ? `Marker ${className}` : "Marker"} />
    );
};

Marker.propTypes = {
  className: PropTypes.string
};

export default Marker;
