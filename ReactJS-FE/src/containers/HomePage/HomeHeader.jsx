import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage,injectIntl  } from 'react-intl';  
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { use } from 'react';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    
    render() {   
        const { intl } = this.props;
        let language = this.props.language; // Get the current language from props
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        {/* Left section */}
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>

                        {/* Center section */}
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.speciality' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.health-facility' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.choose-hospital' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.choose-good-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.examination-package' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.general-health-check' /></div>
                            </div>

                        </div>

                        {/* Right section (placeholder) */}
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i> 
                                <FormattedMessage id='homeheader.support' />
                            </div>

                            <div className="language-vn">
                                <span className={language === LANGUAGES.VI ? 'active' : ''}onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>

                            <div className="language-en">
                                <span className={language === LANGUAGES.EN ? 'active' : ''}onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>

                        </div>
                    
                    </div>

                   
                </div>
                 <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id='banner.main-title' />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id='banner.sub-title' />
                            </div>

                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder={intl.formatMessage({ id: 'banner.search-placeholder' })}
                                />
                            </div>
                        </div>

                      <div className='content-down'>
                            <div className='options'>
                                <div className="option-child">
                                    <div className="icon-child"><i className='far fa-hospital'></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.specialist-exam" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className='fas fa-mobile-alt'></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.remote-exam" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className='fas fa-stethoscope'></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.general-exam" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className='fas fa-vials'></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.medical-test" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className='fas fa-heart'></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.mental-health" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-syringe"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.dental-exam" /></div>
                                </div>

                            </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Dispatching the changeLanguageApp action
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeHeader));