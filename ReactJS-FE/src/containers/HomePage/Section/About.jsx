import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SectionCommon.scss';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className='section-common even-section about-section'>
                <div className='section-header'>
                    <h2>
                        <FormattedMessage id="homepage.about-title" defaultMessage="About Our Clinic" />
                    </h2>
                    <button className='btn-view-more'>
                        <FormattedMessage id="homepage.view-more" defaultMessage="View More" />
                    </button>
                </div>

                <div className='section-content about-content'>
                    <div className='about-left'>
                        <h3>
                            <FormattedMessage id="homepage.our-mission" defaultMessage="Our Mission" />
                        </h3>
                        <p>
                            <FormattedMessage id="homepage.about-description" defaultMessage="We aim to provide high-quality healthcare..." />
                        </p>

                        <h3>
                            <FormattedMessage id="homepage.our-vision" defaultMessage="Our Vision" />
                        </h3>
                        <p>
                            <FormattedMessage id="homepage.vision-description" defaultMessage="To become the leading private clinic..." />
                        </p>
                    </div>

                    <div className='about-right'>
                        <div className='video-wrapper'>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/7e90gBu4pas"
                                title="Video giới thiệu"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

export default connect(mapStateToProps)(About);
