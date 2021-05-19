import React, {useState} from 'react';
import {Button, Form, Input, Modal} from "semantic-ui-react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updatePoint} from "../../../actions/wifiPoints";
import AutoComplete from "react-google-autocomplete";
import {API_KEY} from "../../../googleKey"
import "./styles.scss";
import {inputValidation} from "../../../helpers/inputValidation";

const UpdatePoint = ({
    open,
    close,
    point,
    updatePoint
}) => {
    const [name, setName] = useState(point.name);
    const [coordinates, setCoordinates] = useState(point.coordinates);
    const [address, setAddress] = useState(point.address);
    const [type, setType] = useState(point.type);
    const [password, setPassword] = useState(point.password);
    const [speed, setSpeed] = useState(point.speed);
    const [frequency, setFrequency] = useState(point.frequency);
    const [error, setError] = useState(false);

    const placeHandler = (place) => {
        setAddress(place.formatted_address);
        setCoordinates({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
    };

    const handleUpdate = () => {
        if (!inputValidation('string', name)) {
            return setError('Name min length 3');
        }else if (!address || address.length < 10 || !coordinates) {
            return setError('Address error');
        } else if (speed < 0 || speed > 500) {
            return setError("Speed error");
        } else if (type === "secure" && password.length < 8) {
            return setError("min pass 8");
        } else {
            updatePoint(point._id, {
                name,
                type,
                speed,
                frequency,
                address,
                coordinates,
                password: type === "secure" ? password : ""
            });
            setError(false);
            close();
        }
    }

    return (
        <Modal
            className="UpdatePoint"
            onClose={close}
            open={open}
        >
            <Modal.Header>Update point:</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    { error && <div className="error">{error}</div>}
                    <Form>
                        <Input
                            placeholder="Name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <AutoComplete
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            apiKey={API_KEY}
                            onPlaceSelected={(place) => placeHandler(place)}
                            options={{
                                types: ["address"],
                                componentRestrictions: { country: "ua" },
                            }}
                        />
                        <Form.Group inline>
                            <label>Type: </label>
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
                        {
                            type === "secure" &&
                            <Input
                                placeholder="Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        }
                        <Input
                            type="number"
                            placeholder="Speed..."
                            value={speed}
                            onChange={(e) => setSpeed(e.target.value)}
                        />
                        <Form.Group inline>
                            <label>Frequency (ГГц)</label>
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
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="teal" onClick={handleUpdate} >Update</Button>
            </Modal.Actions>
        </Modal>
    );
};

UpdatePoint.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    point: PropTypes.object.isRequired,
    updatePoint: PropTypes.func.isRequired
};

const actions = { updatePoint };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(UpdatePoint);
