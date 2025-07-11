import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SectionCommon.scss'; // SCSS dùng chung
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialty1 from '../../../assets/specialty/specialty1.jpg';
import specialty2 from '../../../assets/specialty/specialty2.jpg';
import specialty3 from '../../../assets/specialty/specialty3.jpg';  
import specialty4 from '../../../assets/specialty/specialty4.jpg';
import specialty5 from '../../../assets/specialty/specialty5.jpg';      
import specialty6 from '../../../assets/specialty/specialty6.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Custom arrow components
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={`custom-arrow next ${className}`} style={style} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={`custom-arrow prev ${className}`} style={style} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
};

class Specialty extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
        };

        return (
            <div className="section-common specialty-section odd-section">
                <div className="section-header">
                    <h2>Chuyên khoa phổ biến</h2>
                    <button className="btn-view-more">
                        <FormattedMessage id="homepage.view-more" />
                    </button>
                </div>

                <div className="section-content">
                    <Slider {...settings}>
                        <div className="img-customize">
                            <img src={specialty1} alt="Specialty 1" />
                            <h3>Khám tim mạch</h3>
                        </div>
                        <div className="img-customize">
                            <img src={specialty2} alt="Specialty 2" />
                            <h3>Khám thần kinh</h3>
                        </div>
                        <div className="img-customize">
                            <img src={specialty3} alt="Specialty 3" />
                            <h3>Khám xương khớp</h3>
                        </div>
                        <div className="img-customize">
                            <img src={specialty4} alt="Specialty 4" />
                            <h3>Khám tiêu hóa</h3>
                        </div>
                        <div className="img-customize">
                            <img src={specialty5} alt="Specialty 5" />
                            <h3>Khám hô hấp</h3>
                        </div>
                        <div className="img-customize">
                            <img src={specialty6} alt="Specialty 6" />
                            <h3>Khám tổng quát</h3>
                        </div>
                    </Slider>
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

export default connect(mapStateToProps)(Specialty);
