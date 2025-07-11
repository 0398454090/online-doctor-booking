import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './UserManage.scss'; // fix import SCSS
import { emitter } from '../../utils/emiiter';
import _ from 'lodash';
import { use } from 'react';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        };

    }
    

    componentDidMount(){
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmout edit modal', this.props.currentUser);

    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    };


    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop:', this.state[arrInput[i]], arrInput[i]);

            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    };

    handleSaveNewUser = () => {
        if (this.checkValidInput()) {
            this.props.editUser( this.state);

        }
    };

    createNewUser = () =>{
        alert("call me")
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleFromParent} className="modal-user-container">
                    <ModalHeader toggle={this.props.toggleFromParent}>Edit a new user</ModalHeader>
                    <ModalBody>
                        <form className="user-form">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="form-control"
                                    value={this.state.email}
                                    disabled
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="form-control"
                                    value={this.state.password}
                                    disabled
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                    />
                                </div>
                                <div className="form-group col">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter address"
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="d-flex justify-content-end gap-2">
                        <Button color="primary" onClick={this.handleSaveNewUser}>
                            Save
                        </Button>
                        <Button color="secondary" onClick={this.props.toggleFromParent}>
                            Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
