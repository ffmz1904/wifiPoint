import React, {useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Form, Icon, Input} from "semantic-ui-react";
import AutoComplete from "react-google-autocomplete";
import {API_KEY} from "../../googleKey";
import {filterPoints, getAllPoints} from "../../actions/wifiPoints";
import {setError} from "../../actions/error";
import "./styles.scss";

const PointFilter = ({
    filterPoints,
    setError,
    getAllPoints,
    setFilterMarker
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(undefined);
    const [place, setPlace] = useState('');
    const [radius, setRadius] = useState('');
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [type, setType] = useState('all');
    const [frequency, setFrequency] = useState('all');

    const changeAddress = (address) =>  {
      setPlace('');
      setAddress(address);
    };

    const placeHandler = (place) => {
        if (!place.formatted_address) {
            return setError('Undefined place');
        }
        setPlace(place);
        setAddress(place.formatted_address);
        setCoordinates({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
    };

    const handleFilter = () => {
        const filter = {
            radius,
            name,
            speed,
            type: type !== 'all' ? type : '',
            frequency: frequency !== 'all' ? frequency : ''
        };

        if (address && !place.formatted_address) {
            return setError('Undefined place');
        }

        if (speed < 0 || speed > 500) {
            return setError('bad speed!');
        }

        if (place.formatted_address) {
           filter.coordinates = coordinates;
        }

        setFilterMarker({ coordinates, radius });
        filterPoints(filter);
    }

    const clearFilter = () => {
        setAddress('');
        setCoordinates(undefined);
        setPlace('');
        setRadius('');
        setName('');
        setType('all');
        setFrequency('all');

        getAllPoints();
        setFilterMarker(false);
        setIsOpen(false);
    };

    return (
        <div className="PointFilter">
            <h2 onClick={() => setIsOpen(!isOpen)}>
                <span>Filter</span>
                <Icon name={isOpen ? "angle up" : "angle down"} />
            </h2>
            { isOpen &&
            <Form>
                <div>
                    <AutoComplete
                        value={address}
                        onChange={(e) => changeAddress(e.target.value)}
                        apiKey={API_KEY}
                        onPlaceSelected={(place) => placeHandler(place)}
                        options={{
                            types: ["address"],
                            componentRestrictions: { country: "ua" },
                        }}
                    />
                    <Input
                        type="number"
                        placeholder="Radius (m)..."
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Speed..."
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                    />
                </div>
                <div>
                    <Form.Group inline>
                        <label>Type: </label>
                        <Form.Radio
                            label='All'
                            value='all'
                            checked={type === 'all'}
                            onChange={(e) => setType('all')}
                        />
                        <Form.Radio
                            label='Open'
                            value='open'
                            checked={type === 'open'}
                            onChange={(e) => setType('open')}
                        />
                        <Form.Radio
                            label='Secure'
                            value='secure'
                            checked={type === 'secure'}
                            onChange={() => setType('secure')}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Frequency (ГГц)</label>
                        <Form.Radio
                            label='All'
                            value='all'
                            checked={type === 'all'}
                            onChange={(e) => setType('all')}
                        />
                        <Form.Radio
                            label='2.4'
                            value={2.4}
                            checked={frequency === 2.4}
                            onChange={(e) => setFrequency(2.4)}
                        />
                        <Form.Radio
                            label='5'
                            value={5}
                            checked={frequency === 5}
                            onChange={() => setFrequency(5)}
                        />
                    </Form.Group>
                </div>
                <div>
                    <Button type="button" className="filter" onClick={handleFilter}>Filter</Button>
                    <Button type="button" className="clear" onClick={clearFilter}>Clear</Button>
                </div>
            </Form>
            }
        </div>
    );
};

PointFilter.propTypes = {
    filterPoints: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    getAllPoints: PropTypes.func.isRequired,
    setFilterMarker: PropTypes.func.isRequired,
};

const actions = { filterPoints, setError, getAllPoints };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(PointFilter);
