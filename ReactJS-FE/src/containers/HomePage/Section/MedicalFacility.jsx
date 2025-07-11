import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SectionCommon.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import facility1 from '../../../assets/facility/facility1.jpg';
import facility2 from '../../../assets/facility/facility2.jpg';
import facility3 from '../../../assets/facility/facility3.jpg';
import facility4 from '../../../assets/facility/facility4.jpg';

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

class MedicalFacility extends Component {
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
            <div className="section-common medical-facility-section ">
                <div className="section-header">
                    <h2>Cơ sở y tế nổi bật tuần qua</h2>
                    <button className="btn-view-more">
                        <FormattedMessage id="homepage.view-more" />
                    </button>
                </div>

                <div className="section-content">
                    <Slider {...settings}>
                        <div className="img-customize">
                            <img src={facility1} alt="Bệnh viện Chợ Rẫy" />
                            <h3>Bệnh viện Chợ Rẫy TP. HCM</h3>
                            <p>Địa chỉ: 201B Nguyễn Chí Thanh, phường 2, quận 5</p>
                        </div>
                        <div className="img-customize">
                            <img src={facility2} alt="BV YHCT TP. HCM" />
                            <h3>Miền Nam: Bệnh viện Y Học Cổ Truyền TP. HCM</h3>
                            <p>Địa chỉ: 179 – 187 Nam Kỳ Khởi Nghĩa, phường 7, quận 3</p>
                        </div>
                        <div className="img-customize">
                            <img src={facility3} alt="Bệnh viện Hoàn Mỹ Đà Nẵng" />
                            <h3>Bệnh viện Hoàn Mỹ Đà Nẵng</h3>
                            <p>Địa chỉ: 161 Nguyễn Văn Linh, quận Thanh Khê</p>
                        </div>
                        <div className="img-customize">
                            <img src={facility4} alt="Bệnh viện Quận 1" />
                            <h3>Bệnh viện Quận 1</h3>
                            <p>Địa chỉ: 338 Hai Bà Trưng, phường Tân Định, Quận 1</p>
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

export default connect(mapStateToProps)(MedicalFacility);
