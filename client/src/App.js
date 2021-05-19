import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import ErrorMessage from "./components/ErrorMessage";
import CreatePoint from "./components/Modals/CreatePoint";
import {checkAuth} from "./actions/auth";

const App = ({
    error,
    checkAuth,
    isAuth,
    isAdmin
}) => {
    const [openCreateForm, setOpenCreateForm] = useState(false);
    useEffect(() => {
        checkAuth();
    }, []);

    return (
    <BrowserRouter>
        { error.isError && <ErrorMessage error={error} /> }
        { isAuth && !isAdmin &&
        <CreatePoint
            open={openCreateForm}
            close={() => setOpenCreateForm(false)}
        /> }
        <Header openCreateForm={() => setOpenCreateForm(true)} />
        <AppRouter />
    </BrowserRouter>
    );
}

App.propTypes = {
    checkAuth: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

const actions = {
    checkAuth
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ error, user }) => ({
    error: error,
    isAdmin: user.isAdmin,
    isAuth: user.isAuth
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
