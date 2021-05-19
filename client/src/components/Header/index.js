import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {HOME_ROUTE, LOGIN_ROUTE, POINT_ROUTE} from "../../utils/routesConst";
import {logout} from "../../actions/auth";
import "./styles.scss";

const Header = ({ isAuth, isAdmin, logout, openCreateForm }) => {
    return (
        <header className="Header">
            <div className="logo">
                <h1><Link to={HOME_ROUTE} >WiFi Map</Link></h1>
            </div>
            <div className="nav">
                { isAuth
                    ?   <div className="nav_list">
                        { isAdmin
                            ? <Link to={POINT_ROUTE}>Wifi points</Link>
                            : <Link onClick={openCreateForm}>Add Point</Link>
                        }
                            <Link to={HOME_ROUTE} onClick={() => logout()}>Logout</Link>
                        </div>
                    : <Link to={LOGIN_ROUTE}>Login</Link>
                }
            </div>
        </header>
    );
};

Header.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    openCreateForm: PropTypes.func.isRequired
};

const actions = { logout };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ user }) => ({
    isAuth: user.isAuth,
    isAdmin: user.isAdmin
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
