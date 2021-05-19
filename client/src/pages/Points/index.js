import React, {useEffect, useState} from 'react';
import {Button, Container} from "semantic-ui-react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CreatePoint from "../../components/Modals/CreatePoint";
import Preloader from "../../components/Preloader";
import PointsList from "../../components/PointsList";
import {getAllPoints} from "../../actions/wifiPoints";
import "./styles.scss";

const Points = ({
    points,
    getAllPoints
}) => {
    const [loading, setLoading] = useState(true);
    const [openCreateForm, setOpenCreateForm] = useState(false);

    useEffect(() => {
        getAllPoints()
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Preloader/>;
    }

    return (
        <div className="page">
            { openCreateForm &&
            <CreatePoint
                open={openCreateForm}
                close={() => setOpenCreateForm(false)}
            /> }
            <Container className="Points">
                <h2>
                    <span>Wifi points: </span>
                    <Button onClick={() => setOpenCreateForm(true)} >Add point</Button>
                </h2>
                <PointsList points={points} withLabel={false}/>
            </Container>
        </div>
    );
};

Points.propTypes = {
    points: PropTypes.array.isRequired,
    getAllPoints: PropTypes.func.isRequired
};

const actions = { getAllPoints };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ wifiPoint }) => ({
   points: wifiPoint
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Points);
