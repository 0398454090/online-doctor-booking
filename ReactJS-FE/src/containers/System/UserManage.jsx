import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl'
import { connect } from 'react-redux';
import './UserManage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getAllUsers } from '../../services/userService';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        };
    }
    async componentDidMount() {
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


    render() {
        console.log("Check:====>>> ", this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="text-center mb-4 title">Manage users with Ngoc</div>
                <div className="users-table mt-3 mx-1" >
                    <table id="customer">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                           {arrUsers && arrUsers.map((item, index) => {
                                console.log('Ngoc Pham ', item, index);
                                return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2">Edit</button>
                                        <button className="btn btn-danger btn-sm">Delete</button>
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
