import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import { handleLoginApi } from '../../services/userService';
import { use } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '123456',
            showPassword: false,
            errorMessage: '',
        };
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    }

    handleTogglePassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword,
        }));
    }

    handleLogin = async () => {
        this.setState({ errorMessage: '' });

        try {
            let response = await handleLoginApi(this.state.username, this.state.password);
            let data = response.data;  // LẤY đúng dữ liệu trả về

            if (data && data.errCode !== 0) {
                this.setState({ errorMessage: data.message });
                console.log('Login failed:', data.message);
            } else if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('Login successful:', data.message);
            }
        } catch (error) {
        if (error.response && error.response.data) {
                this.setState({ errorMessage: error.response.data.message });
        } else {
                this.setState({ errorMessage: 'Login failed due to unknown error.' });
        }
        }
    }



    render() {
      return (
            <div className='login-page'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input position-relative">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <input
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <i
                                    className={`fas ${this.state.showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                                    onClick={() => this.handleTogglePassword()}
                                ></i>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>
                                Login
                            </button>
                        </div>

                        <div className='col-12 text-center mt-3' style={{ color: 'red' }}>
                            {this.state.errorMessage && <span>{this.state.errorMessage}</span>}
                        </div>
                        <div className='col-12 login-options'>
                            <a href='/forgot-password' className='forgot-link'>
                                <i className="fas fa-key"></i> Forgot password
                            </a>
                            <span> or login with </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);