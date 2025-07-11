import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SectionCommon.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import doctor1 from '../../../assets/doctor/doctor1.jpg';
import doctor2 from '../../../assets/doctor/doctor2.jpg';
import doctor3 from '../../../assets/doctor/doctor3.jpg';
import doctor4 from '../../../assets/doctor/doctor4.jpg';

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

class ProminentDoctor extends Component {
    render() {
        let settings = {
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
            <div className="section-common even-section">
                <div className="section-header">
                    <h2>Bác sĩ nổi bật tuần qua</h2>
                    <button className='btn-view-more'>
                        <FormattedMessage id="homepage.view-more" />
                    </button>
                </div>

                <div className="section-content">
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <img src={doctor1} alt="Doctor 1" />
                            <h3>Giáo sư, Tiến sĩ, Bác sĩ Đỗ Tất Cường</h3>
                            <p>Khoa Hồi sức cấp cứu - Bệnh viện Đa khoa Vinmec Smart City</p>
                        </div>
                        <div className='img-customize'>
                            <img src={doctor2} alt="Doctor 2" />
                            <h3>Giáo sư, Tiến sĩ, Bác sĩ y khoa, Bác sĩ Trần Trung Dũng</h3>
                            <p>Khoa Ngoại Tổng hợp - Bệnh viện Đa khoa Vinmec Smart City</p>
                        </div>
                        <div className='img-customize'>
                            <img src={doctor3} alt="Doctor 3" />    
                            <h3>Giáo sư, Tiến sĩ, Bác sĩ y khoa, Bác sĩ Nguyễn Thanh Liêm</h3>
                            <p>Khoa Y học tái tạo & Trị liệu tế bào - Bệnh viện Đa khoa Quốc tế Vinmec Times City</p>
                        </div>
                        <div className='img-customize'>
                            <img src={doctor4} alt="Doctor 4" />
                            <h3>Giáo sư, Tiến sĩ, Bác sĩ y khoa, Bác sĩ Phạm Nhật An</h3>
                            <p>Trung tâm Nhi - Bệnh viện Đa khoa Quốc tế Vinmec Times City</p>
                        </div>
                       
                    
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

export default connect(mapStateToProps)(ProminentDoctor);
