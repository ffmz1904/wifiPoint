import React, {useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button} from "semantic-ui-react";
import ConfirmModal from "../Modals/ConfirmModal";
import UpdatePoint from "../Modals/UpdatePoint";
import {deletePoint} from "../../actions/wifiPoints";

const PointItem = ({ point, isAdmin, deletePoint }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    return (
        <div className="PointItem">
            <ConfirmModal
                close={() => setOpenDeleteModal(false)}
                open={openDeleteModal}
                text="Are you sure?"
                confirmCb={() => deletePoint(point._id)}
            />
            <UpdatePoint
                open={openUpdateModal}
                close={() => setOpenUpdateModal(false)}
                point={point}
            />
            <div>
                <span className="label">Name: </span> {point.name}
            </div>
            <div>
                <span className="label">Address: </span> {point.address}
            </div>
            <div>
                <span className="label">Type: </span> { point.type }
            </div>
            { point.type === 'secure' &&
            <div>
                <span className="label">Password: </span> { point.password }
            </div>
            }
            <div>
                <span className="label">Speed: </span> {point.speed}
            </div>
            <div>
                <span className="label">Frequency: </span> {point.frequency}
            </div>
            { isAdmin &&
            <div className="actions">
                <Button color="yellow" onClick={() => setOpenUpdateModal(true)}>Update</Button>
                <Button color="red" onClick={() => setOpenDeleteModal(true)}>Delete</Button>
            </div>
            }
        </div>
    );
};

PointItem.propTypes = {
    point: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    editPoint: PropTypes.func.isRequired,
    deletePoint: PropTypes.func.isRequired
}

const actions = {
    deletePoint
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ user }) => ({
    isAdmin: user.isAdmin
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PointItem);
