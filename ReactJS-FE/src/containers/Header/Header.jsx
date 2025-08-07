import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
class Header extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check userInfo in header: ', userInfo);
        return (
            <div className="header-container">
                {/* Navigation Menu */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* User Info & Controls */}
                <div className="header-controls">
                    {/* User Welcome */}
                    <div className="user-welcome">
                        <div className="user-avatar">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="welcome-text">
                            <span className="greeting">
                                <FormattedMessage id="homeheader.welcome" />
                            </span>
                            <span className="user-name">
                                {userInfo && userInfo.firstName ? userInfo.firstName : 'Admin'}
                            </span>
                        </div>
                    </div>

                    {/* Language Switcher */}
                    <div className="language-switcher">
                        <div className="language-label">
                            <i className="fas fa-globe"></i>
                        </div>
                        <div className="language-options">
                            <button
                                className={language === LANGUAGES.VI ? 'language-btn active' : 'language-btn'}
                                onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                                title="Tiếng Việt"
                            >
                                <span className="flag-icon">🇻🇳</span>
                                <span>VN</span>
                            </button>
                            <button
                                className={language === LANGUAGES.EN ? 'language-btn active' : 'language-btn'}
                                onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                                title="English"
                            >
                                <span className="flag-icon">🇺🇸</span>
                                <span>EN</span>
                            </button>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="logout-section">
                        <button className="btn-logout" onClick={processLogout} title="Logout">
                            <i className="fas fa-sign-out-alt"></i>
                            <span className="logout-text">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo, // Assuming you want to use userInfo in the header

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
