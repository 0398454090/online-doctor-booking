import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import ProminentDoctor from './Section/ProminentDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFotter from './HomeFotter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            cssEase: "linear",
                        
        }
        return ( 
            <div>
                <HomeHeader 
                    settings={settings} 
                />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <ProminentDoctor settings={settings} />
                <HandBook settings={settings} />
                <About/>
                <HomeFotter/>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);