import React from 'react';
import {Button, Icon, Modal} from "semantic-ui-react";
import PropTypes from "prop-types";
import "./styles.scss";

const ConfirmModal = ({
    open,
    close,
    text,
    confirmCb
}) => {
    const handleConfirm = () => {
        confirmCb();
        close();
    }

    return (
        <Modal
            className="ConfirmModal"
            open={open}
            onClose={close}
        >
            <Modal.Content>
                <Icon name="warning sign" />
                <h3>{text}</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" onClick={handleConfirm}>Yes</Button>
                <Button color="red" onClick={close}>No</Button>
            </Modal.Actions>
        </Modal>
    );
};

ConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    confirmCb: PropTypes.func.isRequired
};

export default ConfirmModal;
