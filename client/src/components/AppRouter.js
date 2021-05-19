import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { publicRoutes, authRoutes } from "../routes";
import {HOME_ROUTE} from "../utils/routesConst";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const AppRouter = ({ isAuth }) => {
    return (
        <Switch>
            { isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={HOME_ROUTE} />
        </Switch>
    );
};

AppRouter.propTypes = {
    isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user }) => ({
    isAuth: user.isAuth
});

export default connect(
    mapStateToProps
)(AppRouter);
