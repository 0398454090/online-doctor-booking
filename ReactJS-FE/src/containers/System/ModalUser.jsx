import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss';
import { emitter } from '../../utils/emiiter';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            isLoading: false,
            errors: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            }
        };

        this.listenToEmiiter()
    }
    listenToEmiiter(){
        emitter.on('EVEN_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                errors: {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: ''
                }
            });
        })
    }

    componentDidMount(){
        console.log('mouting modal')
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, field) => {
        const value = event.target.value;
        this.setState({
            [field]: value
        }, () => {
            // Real-time validation
            this.validateField(field, value);
        });
    };

    validateField = (field, value) => {
        const errors = { ...this.state.errors };
        
        switch (field) {
            case 'email':
                errors.email = value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
                    ? 'Email không hợp lệ' : '';
                break;
            case 'password':
                errors.password = value && value.length < 6 
                    ? 'Mật khẩu phải có ít nhất 6 ký tự' : '';
                break;
            case 'firstName':
            case 'lastName':
                errors[field] = value && value.length < 2 
                    ? `${field === 'firstName' ? 'Tên' : 'Họ'} phải có ít nhất 2 ký tự` : '';
                break;
            case 'address':
                errors.address = value && value.length < 5 
                    ? 'Địa chỉ phải có ít nhất 5 ký tự' : '';
                break;
            default:
                break;
        }
        
        this.setState({ errors });
    };


    checkValidInput = () => {
        let isValid = true;
        const arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        const errors = { ...this.state.errors };
        const fieldNames = {
            email: 'Email',
            password: 'Mật khẩu',
            firstName: 'Tên',
            lastName: 'Họ',
            address: 'Địa chỉ'
        };

        // Reset errors
        Object.keys(errors).forEach(key => {
            errors[key] = '';
        });

        for (let i = 0; i < arrInput.length; i++) {
            const field = arrInput[i];
            
            if (!this.state[field]) {
                isValid = false;
                errors[field] = `Vui lòng nhập ${fieldNames[field]}`;
            } else {
                // Validate specific field format
                this.validateField(field, this.state[field]);
                if (this.state.errors[field]) {
                    isValid = false;
                }
            }
        }

        this.setState({ errors });
        
        if (!isValid) {
            toast.error('Vui lòng điền đầy đủ và chính xác các trường!', {
                position: "top-right",
                autoClose: 3000,
            });
        }

        return isValid;
    };

    handleAddNewUser = async () => {
        if (!this.checkValidInput()) return;

        this.setState({ isLoading: true });

        try {
            await this.props.createNewUser(this.state);
            
            // Clear form on success
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                errors: {},
                isLoading: false
            });
            
            toast.success('🎉 Tạo người dùng thành công!', {
                position: "top-right",
                autoClose: 3000,
            });
            
            // Close modal
            this.toggle();
        } catch (error) {
            this.setState({ isLoading: false });
            toast.error('❌ Không thể tạo người dùng. Vui lòng thử lại!', {
                position: "top-right",
                autoClose: 4000,
            });
        }
    };

    createNewUser = () =>{
        alert("call me")
    }


    render() {
        const { isLoading, errors } = this.state;
        
        return (
            <div>
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={this.props.toggleFromParent} 
                    className="modal-user-container"
                    backdrop="static"
                >
                    <ModalHeader toggle={this.props.toggleFromParent}>
                        <i className="fas fa-user-plus me-2"></i>
                        <FormattedMessage id="modal.addUser.title" defaultMessage="Thêm người dùng mới" />
                    </ModalHeader>
                    <ModalBody>
                        <form className="user-form">
                            <div className="form-group">
                                <label>
                                    <i className="fas fa-envelope me-2"></i>
                                    <FormattedMessage id="modal.form.email" defaultMessage="Email" />
                                </label>
                                <input
                                    type="email"
                                    placeholder="Nhập email"
                                    className={`form-control ${errors.email ? 'border-danger' : ''}`}
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    disabled={isLoading}
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            
                            <div className="form-group">
                                <label>
                                    <i className="fas fa-lock me-2"></i>
                                    <FormattedMessage id="modal.form.password" defaultMessage="Mật khẩu" />
                                </label>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    className={`form-control ${errors.password ? 'border-danger' : ''}`}
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                    disabled={isLoading}
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <i className="fas fa-user me-2"></i>
                                        <FormattedMessage id="modal.form.firstName" defaultMessage="Tên" />
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên"
                                        className={`form-control ${errors.firstName ? 'border-danger' : ''}`}
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                        disabled={isLoading}
                                    />
                                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                                </div>
                                <div className="form-group">
                                    <label>
                                        <i className="fas fa-user me-2"></i>
                                        <FormattedMessage id="modal.form.lastName" defaultMessage="Họ" />
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập họ"
                                        className={`form-control ${errors.lastName ? 'border-danger' : ''}`}
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                        disabled={isLoading}
                                    />
                                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    <FormattedMessage id="modal.form.address" defaultMessage="Địa chỉ" />
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                    className={`form-control ${errors.address ? 'border-danger' : ''}`}
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    disabled={isLoading}
                                />
                                {errors.address && <small className="text-danger">{errors.address}</small>}
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="d-flex justify-content-end gap-2">
                        <Button 
                            color="secondary" 
                            onClick={this.props.toggleFromParent}
                            disabled={isLoading}
                        >
                            <i className="fas fa-times me-2"></i>
                            <FormattedMessage id="modal.button.cancel" defaultMessage="Hủy" />
                        </Button>
                        <Button 
                            color="primary" 
                            onClick={this.handleAddNewUser}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    <FormattedMessage id="modal.button.saving" defaultMessage="Đang lưu..." />
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save me-2"></i>
                                    <FormattedMessage id="modal.button.save" defaultMessage="Lưu" />
                                </>
                            )}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
