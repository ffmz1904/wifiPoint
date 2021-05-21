import React, {useState} from 'react';
import PropTypes from "prop-types";
import GoogleMapReact, {meters2ScreenPixels} from 'google-map-react';
import {API_KEY} from "../../googleKey";
import Marker from "./Marker";
import './styles.scss';

const Map = ({
    width,
    height,
    points,
    filterRadius
}) => {
    const [zoom, setZoom] = useState(14);
    let radW = 0;
    let radH = 0;

    const center = {
        lat: 48.6208,
        lng: 22.287883
    };

    if (filterRadius) {
        const {w, h} = meters2ScreenPixels(Number(filterRadius.radius) * 2, {lat: filterRadius.coordinates.lat, lng: filterRadius.coordinates.lng}, zoom);
        radW = w;
        radH = h;
    }

    return (
        <div className="Map" style={{ height: height, width: width }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={center}
                center={filterRadius ? filterRadius.coordinates : center}
                defaultZoom={zoom}
                onZoomAnimationEnd={(value) => setZoom(value)}
            >
                { points.length &&
                    points.map(point =>
                        <Marker
                            key={point._id}
                            lat={point.location.coordinates[0]}
                            lng={point.location.coordinates[1]}
                            className='point'
                        />
                    )
                }
                { filterRadius &&
                <Marker
                    className="filter"
                    key={'filter'}
                    lat={filterRadius.coordinates.lat}
                    lng={filterRadius.coordinates.lng}
                    width={radW}
                    height={radH}
                />
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
