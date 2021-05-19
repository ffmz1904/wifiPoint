import React, {useState} from 'react';
import {Button, Form, Input, Modal} from "semantic-ui-react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {createPoint} from "../../../actions/wifiPoints";
import AutoComplete from "react-google-autocomplete";
import {inputValidation} from "../../../helpers/inputValidation";
import {API_KEY} from "../../../googleKey";
import "./styles.scss";

const CreatePoint = ({
    open,
    close,
    createPoint,
}) => {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [type, setType] = useState('open');
    const [frequency, setFrequency] = useState(2.4);
    const [speed, setSpeed] = useState(0);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleCreate = () => {
        if (!inputValidation('string', name)) {
            return setError('Name min length 3');
        }else if (!place || !place.geometry.location || !place.formatted_address) {
            return setError('Place error');
        } else if (speed < 0 || speed > 500) {
            return setError("Speed error");
        } else if (type === "secure" && password.length < 8) {
            return setError("min pass 8");
        } else {
            createPoint({
                name,
                type,
                speed,
                frequency,
                coordinates: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                },
                address: place.formatted_address
            });
            setError(false);
            close();
        }
    };

    return (
        <Modal
            className="CreatePoint"
            onClose={close}
            open={open}
        >
            <Modal.Header>Create new point:</Modal.Header>
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
                            apiKey={API_KEY}
                            onPlaceSelected={(place) => setPlace(place)}
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
                <Button color="teal" onClick={handleCreate} >Create</Button>
            </Modal.Actions>
        </Modal>
    );
};

CreatePoint.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    createPoint: PropTypes.func.isRequired,
};

const actions = { createPoint };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(CreatePoint);
