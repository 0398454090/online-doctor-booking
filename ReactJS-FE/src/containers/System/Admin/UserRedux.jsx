  import React, { Component } from 'react';
  import { FormattedMessage, injectIntl } from 'react-intl';
  import { connect } from 'react-redux';
  import { toast } from 'react-toastify';
  import * as actions from '../../../store/actions';
  import TableManageUser from './TableManageUser';

  class UserRedux extends Component {
      constructor(props) {
          super(props);
          this.state = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phonenumber: '',
          address: '',
          gender: '',
          positionId: '',
          roleId: '',
          avatarFile: null,
          avatarPreview: '',
          showImageModal: false,
          isSaving: false,
          genderRedux: [],
          positionRedux: [],
          roleRedux: [],


          errors: {
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              phonenumber: '',
              address: '',
              gender: '',
              positionId: '',
              roleId: '',
              avatar: '',
            },

          };
      }

      componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
      }
      componentDidUpdate(prevProps) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
          console.log('Updated genderRedux:', this.props.genderRedux);  // <== Thêm dòng này
          this.setState({ genderRedux: this.props.genderRedux });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
          console.log('Updated positionRedux:', this.props.positionRedux);  // <== Thêm dòng này
          this.setState({ positionRedux: this.props.positionRedux });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
          console.log('Updated roleRedux:', this.props.roleRedux);  // <== Thêm dòng này
          this.setState({ roleRedux: this.props.roleRedux });
        }

        if(prevProps.listUsers !== this.props.listUsers){
          this.setState({
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              phonenumber: '',
              address: '',
              gender: '',
              positionId: '',
              roleId: '',
              avatar: '',
          })
        }
      }

    componentWillUnmount() {
      // Clean up URL object to prevent memory leaks
      if (this.state.avatarPreview) {
        URL.revokeObjectURL(this.state.avatarPreview);
      }
    }

    handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        if (this.state.avatarPreview) {
          URL.revokeObjectURL(this.state.avatarPreview);
        }
        this.setState({
          avatarFile: file,
          avatarPreview: URL.createObjectURL(file),
          errors: { ...this.state.errors, avatar: '' },
        });
      } else {
        this.setState({ errors: { ...this.state.errors, avatar: 'Vui lòng chọn tệp hình ảnh' } });
      }
    };

    handleDragOver = (e) => {
      e.preventDefault();
      e.currentTarget.classList.add('border-primary', 'bg-light');
    };

    handleDragLeave = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('border-primary', 'bg-light');
    };

    handleDrop = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('border-primary', 'bg-light');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        if (this.state.avatarPreview) {
          URL.revokeObjectURL(this.state.avatarPreview);
        }
        this.setState({
          avatarFile: file,
          avatarPreview: URL.createObjectURL(file),
          errors: { ...this.state.errors, avatar: '' },
        });
      } else {
        this.setState({ errors: { ...this.state.errors, avatar: 'Vui lòng chọn tệp hình ảnh' } });
      }
    };

    openImageModal = () => {
      this.setState({ showImageModal: true });
    };

    closeImageModal = () => {
      this.setState({ showImageModal: false });
    };

    validateField = (field, value) => {
      const errors = { ...this.state.errors };
      switch (field) {
        case 'email':
          errors.email = value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email không hợp lệ' : '';
          break;
        case 'password':
          errors.password = value && value.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự' : '';
          break;
        case 'firstName':
        case 'lastName':
          errors[field] = value && value.length < 2 ? `${field} phải có ít nhất 2 ký tự` : '';
          break;
        case 'phonenumber':
          errors.phonenumber= value && !/^\d{10}$/.test(value) ? 'Số điện thoại phải có 10 chữ số' : '';
          break;
        case 'address':
          errors.address = value && value.length < 5 ? 'Địa chỉ phải có ít nhất 5 ký tự' : '';
          break;
        case 'gender':
          errors.gender = !value ? 'Vui lòng chọn giới tính' : '';
          break;
        case 'positionId':
          errors.positionId = !value ? 'Vui lòng chọn chức danh' : '';
          break;
        case 'roleId':
          errors.roleId = !value ? 'Vui lòng chọn vai trò' : '';
          break;
        default:
          break;
      }
      this.setState({ errors });
    };

    onChangeInput = (event, field) => {
      const value = event.target.value;
      this.setState({ [field]: value }, () => {
        this.validateField(field, value);
      });
    };

    checkValidateInput = () => {
      let isValid = true;
      const arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId', 'positionId'];
      const errors = { ...this.state.errors };
      const fieldNames = {
        email: 'Email',
        password: 'Mật khẩu', 
        firstName: 'Tên',
        lastName: 'Họ',
        address: 'Địa chỉ',
        phonenumber: 'Số điện thoại',
        gender: 'Giới tính',
        roleId: 'Vai trò',
        positionId: 'Chức danh'
      };

      // Reset all errors first
      Object.keys(errors).forEach(key => {
        errors[key] = '';
      });

      for (let i = 0; i < arrCheck.length; i++) {
        const field = arrCheck[i];
        if (!this.state[field]) {
          isValid = false;
          errors[field] = `Vui lòng ${field === 'gender' || field === 'roleId' || field === 'positionId' ? 'chọn' : 'nhập'} ${fieldNames[field]}`;
        } else {
          // Validate specific fields
          this.validateField(field, this.state[field]);
        }
      }

      this.setState({ errors });
      if (!isValid) {
        toast.error('Vui lòng điền đầy đủ và chính xác các trường bắt buộc!', {
          position: "top-right",
          autoClose: 3000,
        });
      }
      return isValid;
    };

    handleSaveUser = async () => {
        console.log('Form state:', this.state); // ✅ Thêm dòng này

      if (!this.checkValidateInput()) return;

      this.setState({
        ...this.state,
        isUserCreated: false
      })

      this.setState({ isSaving: true });

      try {
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('address', this.state.address);
        formData.append('phonenumber', this.state.phonenumber);
        formData.append('gender', this.state.gender);
        formData.append('roleId', this.state.roleId);
        formData.append('positionId', this.state.positionId);

        if (this.state.avatarFile) {
          formData.append('image', this.state.avatarFile);
        }

        await this.props.createNewUser(formData);

        // Clear form after successful creation
        this.clearForm();
        
        toast.success('🎉 Tạo người dùng thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        this.setState({ isSaving: false });
        toast.error('❌ Không thể tạo người dùng. Vui lòng thử lại!', {
          position: "top-right",
          autoClose: 4000,
        });
        console.error('Create user error:', error);
      }
    };

    clearForm = () => {
      // Clean up avatar preview URL
      if (this.state.avatarPreview) {
        URL.revokeObjectURL(this.state.avatarPreview);
      }
      
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
        gender: '',
        positionId: '',
        roleId: '',
        avatarFile: null,
        avatarPreview: '',
        errors: {},
        isSaving: false,
      });
    };


    handleSubmit = (e) => {
      e.preventDefault();
      this.handleSaveUser();
    };

    render() {
      const { intl, language, genderRedux = [], roleRedux = [], positionRedux = [] } = this.props;
      const { email, password, firstName, lastName, phonenumber, address, gender, positionId, roleId, avatarPreview, showImageModal, isSaving, errors } = this.state;

      return (
        <div className="container-fluid py-4" style={{
          background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 50%, #ffffff 100%)',
          minHeight: '100vh',
          position: 'relative'
        }}>
          {/* Medical Theme Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2300a8cc" fill-opacity="0.05"%3E%3Cpath d="M20 0v40M0 20h40M20 10a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.4
          }}></div>
          
          <div className="container position-relative">
            <div className="text-center mb-3 p-2" style={{ marginTop: '3.4rem' }}>
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg mb-3" style={{ 
                width: '50px', 
                height: '50px',
                background: 'linear-gradient(135deg, #00a8cc 0%, #0288a7 100%)',
                border: '3px solid #ffffff'
              }}>
                <i className="fas fa-user-md text-white fs-2"></i>
              </div>
              <h2 className="fw-bold mb-2" style={{ 
                color: '#0288a7',
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
              }}>
                <FormattedMessage id="manage-user.title" defaultMessage="Quản lý người dùng hệ thống" />
              </h2>
              <div className="mx-auto rounded-pill" style={{ 
                width: '180px', 
                height: '3px', 
                background: 'linear-gradient(90deg, #00a8cc, #0288a7, #00a8cc)' 
              }}></div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-12 col-lg-12">
                <div className="card shadow-lg border-0" style={{ 
                  borderRadius: '20px', 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  backdropFilter: 'blur(20px)', 
                  border: '1px solid rgba(0, 168, 204, 0.1)',
                  boxShadow: '0 10px 40px rgba(0, 168, 204, 0.1)'
                }}>
                  <div className="card-body p-5">
                    {/* Medical Theme Styles */}
                    <style>{`
                      .medical-form .form-control,
                      .medical-form .form-select {
                        backgroundColor: rgba(255, 255, 255, 0.9) !important;
                        borderColor: rgba(0, 168, 204, 0.3) !important;
                        boxShadow: 0 2px 8px rgba(0, 168, 204, 0.1) !important;
                      }
                      .medical-form .form-control:focus,
                      .medical-form .form-select:focus {
                        borderColor: #00a8cc !important;
                        boxShadow: 0 0 0 0.2rem rgba(0, 168, 204, 0.25) !important;
                      }
                      .medical-form .form-floating label {
                        color: #666 !important;
                      }
                      .medical-form .form-floating label i {
                        color: #00a8cc !important;
                      }
                    `}</style>
                    
                    <form onSubmit={this.handleSubmit} className="medical-form">
                      <div className="row g-4">
                        <div className="col-md-9">
                          {/* Login Information */}
                          <div className="mb-4">
                            <h5 className="fw-bold border-bottom pb-2 d-flex align-items-center gap-2" style={{ color: '#0288a7' }}>
                              <i className="fas fa-key" style={{ color: '#00a8cc' }}></i>
                              <FormattedMessage id="manage-user.form.loginInfo" defaultMessage="Thông tin đăng nhập" />
                            </h5>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="email"
                                    className={`form-control border-2 rounded-4 shadow-sm ${errors.email ? 'border-danger' : ''}`}
                                    id="email"
                                    placeholder="Email"
                                    style={{ 
                                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                      borderColor: 'rgba(0, 168, 204, 0.3)',
                                      boxShadow: '0 2px 8px rgba(0, 168, 204, 0.1)'
                                    }}
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    required
                                  />
                                  <label htmlFor="email" className="text-muted">
                                    <i className="fas fa-envelope me-2" style={{ color: '#00a8cc' }}></i>
                                    <FormattedMessage id="manage-user.form.email" defaultMessage="Email" />
                                  </label>
                                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="password"
                                    className={`form-control border-2 rounded-4 shadow-sm ${errors.password ? 'border-danger' : ''}`}
                                    id="password"
                                    placeholder="Password"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    required
                                  />
                                  <label htmlFor="password" className="text-muted">
                                    <i className="fas fa-lock me-2"></i>
                                    <FormattedMessage id="manage-user.form.password" defaultMessage="Mật khẩu" />
                                  </label>
                                  {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Personal Information */}
                          <div className="mb-4">
                            <h5 className="fw-bold border-bottom pb-2 d-flex align-items-center gap-2" style={{ color: '#0288a7' }}>
                              <i className="fas fa-user" style={{ color: '#00a8cc' }}></i>
                              <FormattedMessage id="manage-user.form.personalInfo" defaultMessage="Thông tin cá nhân" />
                            </h5>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className={`form-control border-2 rounded-4 shadow-sm ${errors.firstName ? 'border-danger' : ''}`}
                                    id="firstName"
                                    placeholder="First Name"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                    required
                                  />
                                  <label htmlFor="firstName" className="text-muted">
                                    <i className="fas fa-user-tag me-2"></i>
                                    <FormattedMessage id="manage-user.form.firstName" defaultMessage="Tên" />
                                  </label>
                                  {errors.firstName && <div className="text-danger small mt-1">{errors.firstName}</div>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className={`form-control border-2 rounded-4 shadow-sm ${errors.lastName ? 'border-danger' : ''}`}
                                    id="lastName"
                                    placeholder="Last Name"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                    required
                                  />
                                  <label htmlFor="lastName" className="text-muted">
                                    <i className="fas fa-user-tag me-2"></i>
                                    <FormattedMessage id="manage-user.form.lastName" defaultMessage="Họ" />
                                  </label>
                                  {errors.lastName && <div className="text-danger small mt-1">{errors.lastName}</div>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className={`form-control border-2 rounded-4 shadow-sm ${errors.phonenumber ? 'border-danger' : ''}`}
                                    id="phonenumber"
                                    placeholder="Phone Number"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    value={phonenumber}
                                    onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                                    required
                                  />
                                  <label htmlFor="phonenumber" className="text-muted">
                                    <i className="fas fa-phone me-2"></i>
                                    <FormattedMessage id="manage-user.form.phoneNumber" defaultMessage="Số điện thoại" />
                                  </label>
                                  {errors.phonenumber && <div className="text-danger small mt-1">{errors.phonenumber}</div>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className={`form-control border-2 rounded-4 shadow-sm ${errors.address ? 'border-danger' : ''}`}
                                    id="address"
                                    placeholder="Address"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                    required
                                  />
                                  <label htmlFor="address" className="text-muted">
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    <FormattedMessage id="manage-user.form.address" defaultMessage="Địa chỉ" />
                                  </label>
                                  {errors.address && <div className="text-danger small mt-1">{errors.address}</div>}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* System Information */}
                          <div className="mb-4">
                            <h5 className="fw-bold border-bottom pb-2 d-flex align-items-center gap-2" style={{ color: '#0288a7' }}>
                              <i className="fas fa-cog" style={{ color: '#00a8cc' }}></i>
                              <FormattedMessage id="manage-user.form.systemInfo" defaultMessage="Thông tin hệ thống" />
                            </h5>
                            <div className="row g-3">
                              <div className="col-md-4">
                                <div className="form-floating">
                                  <select
                                    className={`form-select border-2 rounded-4 shadow-sm ${errors.gender ? 'border-danger' : ''}`}
                                    value={gender}
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    required
                                  >
                                    <option value="" disabled>
                                      <FormattedMessage id="manage-user.form.selectGender" defaultMessage="Chọn giới tính" />
                                    </option>
                                    {Array.isArray(genderRedux) && genderRedux.map((item) =>
                                      item && item.key ? (
                                        <option key={item.key} value={item.key}>
                                          {language === 'en' ? item.valueEn : item.valueVi}
                                        </option>
                                      ) : null
                                    )}

                                  </select>
                                  <label className="text-muted">
                                    <i className="fas fa-venus-mars me-2"></i>
                                    <FormattedMessage id="manage-user.form.gender" defaultMessage="Giới tính" />
                                  </label>
                                  {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-floating">
                                  <select
                                    className={`form-select border-2 rounded-4 shadow-sm ${errors.positionId ? 'border-danger' : ''}`}
                                    value={positionId}
                                    onChange={(event) => this.onChangeInput(event, 'positionId')}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    required
                                  >
                                    <option value="" disabled>
                                      <FormattedMessage id="manage-user.form.selectPosition" defaultMessage="Chọn chức danh" />
                                    </option>
                                    {Array.isArray(positionRedux) && positionRedux.map((item) => (
                                      <option key={item.key} value={item.key}>
                                        {language === 'en' ? item.valueEn : item.valueVi}
                                      </option>
                                    ))}
                                  </select>
                                  <label className="text-muted">
                                    <i className="fas fa-briefcase me-2"></i>
                                    <FormattedMessage id="manage-user.form.position" defaultMessage="Chức danh" />
                                  </label>
                                  {errors.positionId && <div className="text-danger small mt-1">{errors.positionId}</div>}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-floating">
                                  <select
                                    className={`form-select border-2 rounded-4 shadow-sm ${errors.roleId ? 'border-danger' : ''}`}
                                    value={roleId}
                                    onChange={(event) => this.onChangeInput(event, 'roleId')}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    required
                                  >
                                    <option value="" disabled>
                                      <FormattedMessage id="manage-user.form.selectRole" defaultMessage="Chọn vai trò" />
                                    </option>
                                    {Array.isArray(roleRedux) && roleRedux.map((item) => (
                                      <option key={item.key} value={item.key}>
                                        {language === 'en' ? item.valueEn : item.valueVi}
                                      </option>
                                    ))}
                                  </select>
                                  <label className="text-muted">
                                    <i className="fas fa-user-shield me-2"></i>
                                    <FormattedMessage id="manage-user.form.role" defaultMessage="Vai trò" />
                                  </label>
                                  {errors.roleId && <div className="text-danger small mt-1">{errors.roleId}</div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Avatar and Buttons */}
                        <div className="col-md-3">
                          <div className="mb-4">
                            <h5 className="fw-bold border-bottom pb-2 d-flex align-items-center gap-2" style={{ color: '#0288a7' }}>
                              <i className="fas fa-image" style={{ color: '#00a8cc' }}></i>
                              <FormattedMessage id="manage-user.form.avatarSection" defaultMessage="Ảnh đại diện" />
                            </h5>
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                <div className="rounded-circle overflow-hidden border shadow-sm" style={{ width: '150px', height: '150px' }}>
                                  {avatarPreview ? (
                                    <img
                                      src={avatarPreview}
                                      alt="Avatar Preview"
                                      className="w-100 h-100 object-fit-cover"
                                      style={{ cursor: 'pointer' }}
                                      onClick={this.openImageModal}
                                    />
                                  ) : (
                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                      <i className="fas fa-user text-muted" style={{ fontSize: '3.5rem' }}></i>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className="border border-dashed rounded-4 p-3 text-center mt-3"
                                style={{ 
                                  cursor: 'pointer',
                                  borderColor: '#00a8cc !important',
                                  backgroundColor: 'rgba(0, 168, 204, 0.05)'
                                }}
                                onDragOver={this.handleDragOver}
                                onDragLeave={this.handleDragLeave}
                                onDrop={this.handleDrop}
                                onClick={() => document.getElementById('fileInput').click()}
                              >
                                <i className="fas fa-cloud-upload-alt mb-2" style={{ 
                                  fontSize: '2.5rem',
                                  color: '#00a8cc'
                                }}></i>
                                <h6 className="mb-2" style={{ color: '#0288a7' }}>
                                  <FormattedMessage id="manage-user.form.dragImageHere" defaultMessage="Kéo thả ảnh vào đây hoặc nhấp để tải lên" />
                                </h6>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="fileInput"
                                  style={{ display: 'none' }}
                                  onChange={this.handleFileChange}
                                />
                              </div>
                              {errors.avatar && <div className="text-danger small mt-1">{errors.avatar}</div>}
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-lg w-100 py-3 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold text-uppercase mb-3"
                              style={{
                                background: 'linear-gradient(135deg, #00a8cc 0%, #0288a7 100%)',
                                border: 'none',
                                color: 'white',
                                boxShadow: '0 4px 15px rgba(0, 168, 204, 0.3)'
                              }}
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  <FormattedMessage id="manage-user.form.saving" defaultMessage="Đang lưu..." />
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-save fs-5 me-2"></i>
                                  <FormattedMessage id="manage-user.form.saveButton" defaultMessage="Lưu thông tin" />
                                </>
                              )}
                            </button>
                            
                            <button
                              type="button"
                              className="btn w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
                              style={{
                                background: 'rgba(0, 168, 204, 0.1)',
                                border: '2px solid #00a8cc',
                                color: '#0288a7'
                              }}
                              onClick={this.clearForm}
                              disabled={isSaving}
                            >
                              <i className="fas fa-undo-alt me-2"></i>
                              <FormattedMessage id="manage-user.form.clearButton" defaultMessage="Xóa form" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
                    <TableManageUser/>
            </div>

     

            {showImageModal && avatarPreview && (
              <div
                className="modal fade show d-block"
                style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
                onClick={this.closeImageModal}
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content border-0 rounded-4 overflow-hidden">
                    <div className="modal-header border-0 bg-white">
                      <h5 className="modal-title">
                        <i className="fas fa-image me-2"></i>
                        Xem trước ảnh đại diện
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={this.closeImageModal}
                      ></button>
                    </div>
                    <div className="modal-body bg-light p-3 text-center">
                      <img
                        src={avatarPreview}
                        alt="Large Preview"
                        className="img-fluid rounded-3 shadow-lg"
                        style={{
                          maxHeight: '70vh',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
           
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
      language: state.app.language,
      genderRedux: state.admin.genders,
      positionRedux: state.admin.positions,
      roleRedux: state.admin.roles,
      isLoadingGender: state.admin.isLoadingGender,
      listUsers: state.admin.users
    
  });

  const mapDispatchToProps = (dispatch) => ({
      fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
      fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
      fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
      createNewUser: (data) => dispatch(actions.createNewUser(data)),
  });


  export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));
