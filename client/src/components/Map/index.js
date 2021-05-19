import React from 'react';
import PropTypes from "prop-types";
import GoogleMapReact from 'google-map-react';
import {API_KEY} from "../../googleKey";
import Marker from "./Marker";
import './styles.scss';

const Map = ({
    width,
    height,
    points,
    filterRadius
}) => {
    const center = {
        lat: 48.6208,
        lng: 22.287883
    };
    const zoom = 14;
    console.log(filterRadius)
    return (
        <div className="Map" style={{ height: height, width: width }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={center}
                center={filterRadius ? filterRadius.coordinates : center}
                defaultZoom={zoom}
            >
                { points.length &&
                    points.map(point =>
                        <Marker
                            key={point._id}
                            lat={point.location.coordinates[0]}
                            lng={point.location.coordinates[1]}
                        />
                    )
                }
            </GoogleMapReact>
        </div>
    );
}

Map.propTypes = {
    points: PropTypes.array.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    filterRadius: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]).isRequired,
};

export default Map;
