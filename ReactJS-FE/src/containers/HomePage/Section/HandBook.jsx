import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SectionCommon.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import handbook1 from '../../../assets/handbook/handbook1.jpg';
import handbook2 from '../../../assets/handbook/handbook2.jpg';
import handbook3 from '../../../assets/handbook/handbook3.jpg';
import handbook4 from '../../../assets/handbook/handbook4.jpg';
import handbook5 from '../../../assets/handbook/handbook5.jpg';
import handbook6 from '../../../assets/handbook/handbook6.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

class Handbook extends Component {
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
            <div className="section-common handbook-section">
                <div className="section-header">
                    <h2>Cẩm nang sức khỏe</h2>
                    <button className="btn-view-more">
                        <FormattedMessage id="homepage.view-more" />
                    </button>
                </div>

                <div className="section-content">
                    <Slider {...settings}>
                        <div className="img-customize">
                            <img src={handbook1} alt="Handbook 1" />
                            <h3>Chế độ ăn uống lành mạnh</h3>
                        </div>
                        <div className="img-customize">
                            <img src={handbook2} alt="Handbook 2" />
                            <h3>Lời khuyên khi bị cảm cúm</h3>
                        </div>
                        <div className="img-customize">
                            <img src={handbook3} alt="Handbook 3" />
                            <h3>Chăm sóc sức khỏe người cao tuổi</h3>
                        </div>
                        <div className="img-customize">
                            <img src={handbook4} alt="Handbook 4" />
                            <h3>Phòng tránh đau lưng khi làm việc</h3>
                        </div>
                        <div className="img-customize">
                            <img src={handbook5} alt="Handbook 5" />
                            <h3>Dinh dưỡng cho bà bầu</h3>
                        </div>
                        <div className="img-customize">
                            <img src={handbook6} alt="Handbook 6" />
                            <h3>Cẩm nang sơ cứu cơ bản</h3>
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

export default connect(mapStateToProps)(Handbook);
