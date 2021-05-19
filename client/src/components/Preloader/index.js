import React from 'react';
import {Dimmer, Loader, Segment} from "semantic-ui-react";
import './styles.scss';

const Preloader = () => {
    return (
        <Segment className="Preloader">
            <Dimmer active>
                <Loader />
            </Dimmer>
        </Segment>
    );
};

export default Preloader;
