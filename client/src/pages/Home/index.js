import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Container} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Preloader from "../../components/Preloader";
import Map from "../../components/Map";
import PointFilter from "../../components/PointFilter";
import {getAllPoints} from "../../actions/wifiPoints";
import PointsList from "../../components/PointsList";
import "./styes.scss";

const Home = ({
    points,
    getAllPoints
}) => {
    const mapWidth = document.documentElement.clientWidth > 768 ? "50%" : "90%";
    const mapHeight = document.documentElement.clientWidth > 768 ? "100%" : "40%";

    const [loading, setLoading] = useState(true);
    const [filterRadius, setFilterRadius] = useState(false);

    useEffect(() => {
        getAllPoints()
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="page">
            <Container className="Home">
                <Map points={points} width={mapWidth} height={mapHeight} filterRadius={filterRadius} />
                <div className="rightBlock">
                    <PointFilter setFilterMarker={setFilterRadius} />
                    <PointsList points={points} />
                </div>
            </Container>
        </div>
    );
};

Home.propTypes = {
    points: PropTypes.array.isRequired,
    getAllPoints: PropTypes.func.isRequired
};

const actions = {
    getAllPoints
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ wifiPoint }) => ({
    points: wifiPoint
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
