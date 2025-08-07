import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as actions from '../../../store/actions';

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      usersRedux: [],
      searchTerm: '',
      currentPage: 1,
      usersPerPage: 10,
      sortField: null,
      sortDirection: 'asc'
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: Array.isArray(this.props.listUsers) ? this.props.listUsers : []
      });
    }
  }

  handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete user: ${user.email}?`)) {
      this.props.deleteAUserRedux(user.id);
    }
  };

  handleEditUser = (user) => {
    // TODO: implement edit user logic
    console.log('Edit user:', user);
  };

  handleSearchChange = (e) => {
    this.setState({ 
      searchTerm: e.target.value,
      currentPage: 1
    });
  };

  handleSort = (field) => {
    const isAsc = this.state.sortField === field && this.state.sortDirection === 'asc';
    this.setState({
      sortField: field,
      sortDirection: isAsc ? 'desc' : 'asc'
    });
  };

  getSortIcon = (field) => {
    if (this.state.sortField !== field) {
      return <i className="fas fa-sort text-muted"></i>;
    }
    return this.state.sortDirection === 'asc' 
      ? <i className="fas fa-sort-up text-primary"></i>
      : <i className="fas fa-sort-down text-primary"></i>;
  };

  getFilteredAndSortedUsers = () => {
    let filteredUsers = this.state.usersRedux;

    if (this.state.searchTerm) {
      const term = this.state.searchTerm.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        (user.email || '').toLowerCase().includes(term) ||
        (user.firstName || '').toLowerCase().includes(term) ||
        (user.lastName || '').toLowerCase().includes(term) ||
        (user.address || '').toLowerCase().includes(term)
      );
    }

    if (this.state.sortField) {
      filteredUsers.sort((a, b) => {
        let aValue = a[this.state.sortField] || '';
        let bValue = b[this.state.sortField] || '';

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return this.state.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.state.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredUsers;
  };

  getPaginatedUsers = () => {
    const filteredUsers = this.getFilteredAndSortedUsers();
    const startIndex = (this.state.currentPage - 1) * this.state.usersPerPage;
    const endIndex = startIndex + this.state.usersPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  getTotalPages = () => {
    const filteredUsers = this.getFilteredAndSortedUsers();
    return Math.ceil(filteredUsers.length / this.state.usersPerPage);
  };

  handlePageChange = (page) => {
    if (page < 1 || page > this.getTotalPages()) return;
    this.setState({ currentPage: page });
  };

  render() {
    const paginatedUsers = this.getPaginatedUsers();
    const totalPages = this.getTotalPages();
    const filteredUsers = this.getFilteredAndSortedUsers();
    const { isLoading } = this.props;

    return (
      <div className="manage-container">
        <div className="card shadow-lg">
          <div className="card-header bg-gradient-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="fas fa-users me-2"></i>
                User Management
              </h4>
              <div className="d-flex align-items-center">
                <div className="search-container me-3">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="fas fa-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search users..."
                      value={this.state.searchTerm}
                      onChange={this.handleSearchChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            {isLoading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading users...</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="table-dark">
                      <tr>
                        {['email', 'firstName', 'lastName', 'address'].map(field => (
                          <th
                            key={field}
                            className="sortable-header"
                            onClick={() => this.handleSort(field)}
                            style={{cursor: 'pointer'}}
                          >
                            <div className="d-flex align-items-center">
                              <i className={`fas fa-${field === 'email' ? 'envelope' : field === 'address' ? 'map-marker-alt' : 'user'} me-2`}></i>
                              {field === 'email' ? 'Email' : field === 'firstName' ? 'First Name' : field === 'lastName' ? 'Last Name' : 'Address'}
                              {this.getSortIcon(field)}
                            </div>
                          </th>
                        ))}
                        <th className="text-center">
                          <i className="fas fa-cog me-2"></i>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user, index) => (
                          <tr key={user.id || index} className="align-middle">
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-circle me-3">
                                  {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <span className="text-primary fw-medium">{user.email}</span>
                              </div>
                            </td>
                            <td className="fw-medium">{user.firstName}</td>
                            <td className="fw-medium">{user.lastName}</td>
                            <td><span className="text-muted">{user.address}</span></td>
                            <td className="text-center">
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => this.handleEditUser(user)}
                                  title="Edit User"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => this.handleDeleteUser(user)}
                                  title="Delete User"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-5">
                            <div className="no-data">
                              <i className="fas fa-users fa-3x text-muted mb-3"></i>
                              <h5 className="text-muted">No users found</h5>
                              <p className="text-muted">
                                {this.state.searchTerm ? `No users match "${this.state.searchTerm}"` : 'No users available'}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="card-footer bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted">
                        Showing {((this.state.currentPage - 1) * this.state.usersPerPage) + 1} to {Math.min(this.state.currentPage * this.state.usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                      </div>
                      <nav>
                        <ul className="pagination pagination-sm mb-0">
                          <li className={`page-item ${this.state.currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                              className="page-link"
                              onClick={() => this.handlePageChange(this.state.currentPage - 1)}
                              disabled={this.state.currentPage === 1}
                            >
                              <i className="fas fa-chevron-left"></i>
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, idx) => (
                            <li key={idx + 1} className={`page-item ${this.state.currentPage === idx + 1 ? 'active' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => this.handlePageChange(idx + 1)}
                              >
                                {idx + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${this.state.currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                              className="page-link"
                              onClick={() => this.handlePageChange(this.state.currentPage + 1)}
                              disabled={this.state.currentPage === totalPages}
                            >
                              <i className="fas fa-chevron-right"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listUsers: state.admin.users || [],
  isLoading: state.admin.isLoadingUsers || false,
});

const mapDispatchToProps = dispatch => ({
  fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
  deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);