import React from 'react';
import {Message} from "semantic-ui-react";
import PropTypes from 'prop-types';
import './styles.scss';

const ErrorMessage = ({ error }) => {
    return (
        <Message className="ErrorMessage">
            <Message.Header>Error!</Message.Header>
            <p>
                {error.message}
            </p>
        </Message>
    );
};

ErrorMessage.propTypes = {
    error: PropTypes.object.isRequired
};

export default ErrorMessage;
