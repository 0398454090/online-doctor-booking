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
            userEdit:{}
        };
    }
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async() =>{
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
        console.log('check poops from parent : ', this.props)
        let arrUsers = this.state.arrUsers;
        console.log("Check:====>>> ", arrUsers)
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
                
                <div className="text-center mb-4 title">Manage users with Ngoc</div>
                <div className='mx-1'>
                <button className="btn btn-primary px-3 d-flex align-items-center justify-content-center gap-2"
                    onClick={()=>this.handleAddNewUser()}>
                    <i className="fa fa-plus"></i>
                    <span>Add new users</span>
                </button>

                </div>
                <div className="users-table mt-3 mx-1" >
                    <table id="customer">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th className="text-center">Action</th>

                        </tr>

                           {arrUsers && arrUsers.map((item, index) => {
                                return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button className="btn btn-warning btn-sm px-3" onClick={() => this.handleEditUser(item)}>Edit</button>
                                            <button className="btn btn-danger btn-sm px-3" onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                        </div>
                                    </td>

                                </tr>
                                );
                            })}
                     </table>
                
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
