import React from 'react';
import PropTypes from "prop-types";
import PointItem from "./PointItem";
import "./styles.scss";

const PointsList = ({
    points,
    withLabel = true
}) => {
    return (
        <div className="PointsList">
            { withLabel && <h2>Wifi Points: </h2> }
            { points.length
                ? points.map(point =>
                    <PointItem
                        key={point._id}
                        point={point}
                    />)
                : <div className="empty">No points!</div>
            }
        </div>
    );
};

PointsList.propTypes = {
    withLabel: PropTypes.bool,
    points: PropTypes.array.isRequired,
};

export default PointsList;
