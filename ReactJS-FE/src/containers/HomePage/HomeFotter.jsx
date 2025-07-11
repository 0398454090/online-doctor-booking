import React from 'react';
import './HomePage.scss';

const HomeFooter = () => {
    return (
        <footer className="home-footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Phòng Khám Đa Khoa ABC</h3>
                    <p>123 Đường Sức Khỏe, Quận 1, TP.HCM</p>
                    <p>0123 456 789</p>
                    <p>contact@phongkhamabc.vn</p>
                </div>

                <div className="footer-section">
                    <h4>Liên kết</h4>
                    <ul>
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="#">Dịch vụ</a></li>
                        <li><a href="#">Bác sĩ</a></li>
                        <li><a href="#">Liên hệ</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Kết nối</h4>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Phòng Khám ABC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default HomeFooter;
