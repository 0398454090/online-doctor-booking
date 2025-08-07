import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux';
import './UserManage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { emitter } from '../../utils/emiiter';
import ModalEditUser from './ModalEditUser';

import { getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import { bind } from 'lodash';

import ModalUser from './ModalUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
            searchTerm: '',
            isLoading: false
        };
    }
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async() =>{
        this.setState({ isLoading: true });
        try {
            let response = await getAllUsers('ALL');
            console.log("===> Response from API: ", response);
            if (response && response.data && response.data.errCode === 0
                && response.data.users && response.data.users.errCode === 0) { 
                    // Lấy mảng users bên trong users object
                this.setState({
                    arrUsers: response.data.users.users
                });
            } else {
                console.error('Failed to load users:', response?.data?.errMessage);
            }
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    getFilteredUsers = () => {
        const { arrUsers, searchTerm } = this.state;
        if (!searchTerm) return arrUsers;
        
        return arrUsers.filter(user => 
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    handleAddNewUser = ()=>{
       this.setState({
           isOpenModalUser: true
       })
    }

    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal =() =>{
            this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            // Kiểm tra đúng nơi chứa errCode và errMessage
            if (response && response.data && response.data.errCode !== 0) {
            alert(response.data.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({ isOpenModalUser: false })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.data && res.data.errCode === 0) {
                alert("Delete user successfully");
                await this.getAllUsersFromReact();
            } else {
                alert(res?.data?.errMessage || "Something went wrong!");
            }
        } catch (error) {
            console.error("Delete user error:", error);
            alert("Server error when deleting user.");
        }
    };

    handleEditUser=(user)=>{
        console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true, 
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.data && res.data.errCode === 0) {
                alert("✅ User updated successfully!");
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
                });
            } else {
                alert("❌ Failed to update user: " + (res?.data?.errMessage || "Unknown error"));
            }
        } catch (error) {
            console.error("Update user error:", error);
            alert("❌ Server error when updating user.");
        }
    };

    render() {
        console.log('check props from parent : ', this.props)
        const filteredUsers = this.getFilteredUsers();
        const { isLoading, searchTerm } = this.state;
        console.log("Check:====>>> ", filteredUsers)
        return (
            <div className="users-container">
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                
                {
                    this.state.isOpenModalEditUser && 
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content">
                        <div className="header-left">
                            <h2 className="page-title">
                                <i className="fas fa-users-cog me-3"></i>
                                User Management System
                            </h2>
                            <p className="page-subtitle">Manage and organize system users efficiently with advanced controls</p>
                        </div>
                        <div className="header-right">
                            <button 
                                className="btn btn-primary btn-add-user"
                                onClick={() => this.handleAddNewUser()}
                            >
                                <i className="fas fa-user-plus me-2"></i>
                                <span>Add New User</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table Card */}
                <div className="users-table-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="table-title">
                                <i className="fas fa-database me-2"></i>
                                Users Database ({filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'})
                            </div>
                            <div className="table-actions">
                                <div className="search-box">
                                    <i className="fas fa-search"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Search by name, email or address..." 
                                        className="form-control"
                                        value={searchTerm}
                                        onChange={this.handleSearchChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="table-container">
                        {isLoading ? (
                            <div className="loading-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Loading users data...</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="th-content">
                                                    <i className="fas fa-envelope me-2"></i>
                                                    Email Address
                                                </div>
                                            </th>
                                            <th>
                                                <div className="th-content">
                                                    <i className="fas fa-user me-2"></i>
                                                    First Name
                                                </div>
                                            </th>
                                            <th>
                                                <div className="th-content">
                                                    <i className="fas fa-user-tag me-2"></i>
                                                    Last Name
                                                </div>
                                            </th>
                                            <th>
                                                <div className="th-content">
                                                    <i className="fas fa-map-marker-alt me-2"></i>
                                                    Address
                                                </div>
                                            </th>
                                            <th className="text-center">
                                                <div className="th-content">
                                                    <i className="fas fa-cogs me-2"></i>
                                                    Actions
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers && filteredUsers.length > 0 ? (
                                            filteredUsers.map((item, index) => (
                                                <tr key={item.id || index} className="table-row">
                                                    <td>
                                                        <div className="user-email">
                                                            <div className="avatar-circle">
                                                                {item.firstName?.charAt(0)?.toUpperCase() || 'U'}
                                                            </div>
                                                            <div className="email-info">
                                                                <span className="email-text">{item.email}</span>
                                                                <small className="text-muted d-block">Primary Contact</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="user-name">{item.firstName}</span>
                                                    </td>
                                                    <td>
                                                        <span className="user-name">{item.lastName}</span>
                                                    </td>
                                                    <td>
                                                        <span className="user-address">{item.address}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="action-buttons">
                                                            <button 
                                                                className="btn btn-edit" 
                                                                onClick={() => this.handleEditUser(item)}
                                                                title="Edit User Information"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button 
                                                                className="btn btn-delete" 
                                                                onClick={() => this.handleDeleteUser(item)}
                                                                title="Delete User Account"
                                                            >
                                                                <i className="fas fa-trash-alt"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    <div className="no-data">
                                                        <i className="fas fa-users fa-3x mb-3"></i>
                                                        <h5>
                                                            {searchTerm ? `No users found matching "${searchTerm}"` : 'No Users Found'}
                                                        </h5>
                                                        <p>
                                                            {searchTerm 
                                                                ? 'Try adjusting your search criteria or check the spelling' 
                                                                : 'Get started by adding your first user to the system'
                                                            }
                                                        </p>
                                                        {!searchTerm && (
                                                            <button 
                                                                className="btn btn-primary mt-3"
                                                                onClick={() => this.handleAddNewUser()}
                                                            >
                                                                <i className="fas fa-user-plus me-2"></i>
                                                                Add First User
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    }


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
