import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import './UserManage.scss';
import { emitter } from '../../utils/emiiter';
import _ from 'lodash';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            isLoading: false,
            errors: {}
        };
    }
    

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            });
        }
        console.log('didmount edit modal', this.props.currentUser);
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, field) => {
        const value = event.target.value;
        this.setState({
            [field]: value,
            errors: {
                ...this.state.errors,
                [field]: ''  // Clear error when user starts typing
            }
        });
    };

    validateField = (field, value) => {
        switch (field) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) return `${field} is required`;
                if (value.trim().length < 2) return `${field} must be at least 2 characters`;
                break;
            case 'address':
                if (!value.trim()) return 'Address is required';
                if (value.trim().length < 5) return 'Address must be at least 5 characters';
                break;
            default:
                break;
        }
        return '';
    };

    checkValidInput = () => {
        let isValid = true;
        let errors = {};
        const fieldsToValidate = ['firstName', 'lastName', 'address'];

        fieldsToValidate.forEach(field => {
            const error = this.validateField(field, this.state[field]);
            if (error) {
                errors[field] = error;
                isValid = false;
            }
        });

        this.setState({ errors });
        return isValid;
    };

    handleSaveUser = async () => {
        if (!this.checkValidInput()) {
            toast.error('Please fix the errors before saving');
            return;
        }

        this.setState({ isLoading: true });
        try {
            await this.props.editUser(this.state);
            toast.success('User updated successfully!');
        } catch (error) {
            toast.error('Failed to update user');
        } finally {
            this.setState({ isLoading: false });
        }
    };


    render() {
        const { isLoading, errors } = this.state;
        
        return (
            <div>
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={this.props.toggleFromParent} 
                    className="modal-edit-user-container"
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={this.props.toggleFromParent} className="modal-header-custom">
                        <div className="header-content">
                            <div className="header-icon">
                                <i className="fas fa-user-edit"></i>
                            </div>
                            <div className="header-text">
                                <h4 className="modal-title">Edit User Information</h4>
                                <p className="modal-subtitle">Update user details and save changes</p>
                            </div>
                        </div>
                    </ModalHeader>
                    
                    <ModalBody className="modal-body-custom">
                        <form className="edit-user-form">
                            {/* User Info Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <i className="fas fa-info-circle"></i>
                                    <span>Account Information</span>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <i className="fas fa-envelope"></i>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            className="form-control disabled"
                                            value={this.state.email}
                                            disabled
                                            readOnly
                                        />
                                        <small className="form-text">Email cannot be changed</small>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label">
                                            <i className="fas fa-lock"></i>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form-control disabled"
                                            value={this.state.password}
                                            disabled
                                            readOnly
                                        />
                                        <small className="form-text">Password cannot be changed here</small>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Info Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <i className="fas fa-user"></i>
                                    <span>Personal Information</span>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label required">
                                            <i className="fas fa-user"></i>
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            value={this.state.firstName}
                                            onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                        />
                                        {errors.firstName && (
                                            <div className="error-feedback">
                                                <i className="fas fa-exclamation-circle"></i>
                                                {errors.firstName}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label required">
                                            <i className="fas fa-user-tag"></i>
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            value={this.state.lastName}
                                            onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                        />
                                        {errors.lastName && (
                                            <div className="error-feedback">
                                                <i className="fas fa-exclamation-circle"></i>
                                                {errors.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label required">
                                        <i className="fas fa-map-marker-alt"></i>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter full address"
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                    {errors.address && (
                                        <div className="error-feedback">
                                            <i className="fas fa-exclamation-circle"></i>
                                            {errors.address}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="modal-footer-custom">
                        <div className="footer-actions">
                            <Button 
                                color="secondary" 
                                onClick={this.props.toggleFromParent}
                                className="btn-cancel"
                                disabled={isLoading}
                            >
                                <i className="fas fa-times"></i>
                                Cancel
                            </Button>
                            <Button 
                                color="primary" 
                                onClick={this.handleSaveUser}
                                className="btn-save"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save"></i>
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
