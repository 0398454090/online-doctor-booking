  import React, { Component } from 'react';
  import { FormattedMessage, injectIntl } from 'react-intl';
  import { connect } from 'react-redux';
  import { toast } from 'react-toastify';
  import * as actions from '../../../store/actions';

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

      for (let i = 0; i < arrCheck.length; i++) {
        if (!this.state[arrCheck[i]]) {
          isValid = false;
          errors[arrCheck[i]] = `Vui lòng nhập ${arrCheck[i]}`;
        }
      }

      this.setState({ errors });
      if (!isValid) {
        toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
      }
      return isValid;
    };

    handleSaveUser = async () => {
        console.log('Form state:', this.state); // ✅ Thêm dòng này

      if (!this.checkValidateInput()) return;

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
        toast.success('Tạo người dùng thành công!');
      } catch (error) {
        this.setState({ isSaving: false });
        toast.error('Không thể tạo người dùng');
      }
    };


    handleSubmit = (e) => {
      e.preventDefault();
      this.handleSaveUser();
    };

    render() {
      const { intl, language, genderRedux = [], roleRedux = [], positionRedux = [] } = this.props;
      const { email, password, firstName, lastName, phonenumber, address, gender, positionId, roleId, avatarPreview, showImageModal, isSaving, errors } = this.state;

       console.log('Render genderRedux:', genderRedux);    // <== Thêm dòng này
      console.log('Render positionRedux:', positionRedux);  // <== Thêm dòng này
      console.log('Render roleRedux:', roleRedux);      // <== Thêm dòng này
      console.log('Current state:', this.state);        // <== Thêm dòng này


      return (
        <div className="container-fluid py-4" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url("https://img4.thuthuatphanmem.vn/uploads/2021/01/10/hinh-anh-bac-si-rat-dep-khi-dang-phau-thuat_021528247.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f0f2f5',
          minHeight: '90vh'
        }}>
          <div className="container">
            <div className="text-center mb-2 p-2">
              <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg mb-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-user-cog text-primary fs-3"></i>
              </div>
              <h2 className="fw-bold text-white mb-2" style={{ textShadow: '1px 1px 8px rgba(0,0,0,0.6)' }}>
                <FormattedMessage id="manage-user.title" defaultMessage="Thêm mới người dùng" />
              </h2>
              <div className="mx-auto rounded-pill" style={{ width: '150px', height: '3px', background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.8))' }}></div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-8">
                <div className="card shadow-lg border-0" style={{ borderRadius: '20px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <div className="card-body p-5">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row g-4">
                        <div className="col-md-9">
                          {/* Login Information */}
                          <div className="mb-4">
                            <h5 className="text-primary fw-bold border-bottom pb-2 d-flex align-items-center gap-2">
                              <i className="fas fa-key"></i>
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
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(13, 110, 253, 0.3)' }}
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    required
                                  />
                                  <label htmlFor="email" className="text-muted">
                                    <i className="fas fa-envelope me-2"></i>
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
                            <h5 className="text-primary fw-bold border-bottom pb-2 d-flex align-items-center gap-2">
                              <i className="fas fa-user"></i>
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
                                    <FormattedMessage id="manage-user.form.phonenumber" defaultMessage="Số điện thoại" />
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
                            <h5 className="text-primary fw-bold border-bottom pb-2 d-flex align-items-center gap-2">
                              <i className="fas fa-cog"></i>
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
                                    <option value="">
                                      <FormattedMessage id="manage-user.form.genderOptions.choose" defaultMessage="Chọn giới tính" />
                                    </option>
                                    {genderRedux.map((item) =>
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
                                    <option value="">
                                      <FormattedMessage id="manage-user.form.positionOptions.choose" defaultMessage="Chọn chức danh" />
                                    </option>
                                    {positionRedux.map((item) => (
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
                                    <option value="">
                                      <FormattedMessage id="manage-user.form.roleOptions.choose" defaultMessage="Chọn vai trò" />
                                    </option>
                                    {roleRedux.map((item) => (
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
                            <h5 className="text-primary fw-bold border-bottom pb-2 d-flex align-items-center gap-2">
                              <i className="fas fa-image"></i>
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
                                className="border border-dashed border-primary rounded-4 p-3 text-center mt-3"
                                style={{ cursor: 'pointer' }}
                                onDragOver={this.handleDragOver}
                                onDragLeave={this.handleDragLeave}
                                onDrop={this.handleDrop}
                                onClick={() => document.getElementById('fileInput').click()}
                              >
                                <i className="fas fa-cloud-upload-alt text-primary mb-2" style={{ fontSize: '2.2rem' }}></i>
                                <h6 className="text-primary mb-2">
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
                              className="btn btn-primary btn-lg w-100 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold text-uppercase mb-3"
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              ) : (
                                <i className="fas fa-save fs-5 me-2"></i>
                              )}
                              <FormattedMessage id="manage-user.form.saveButton" defaultMessage="Lưu" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-lg w-100 py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold"
                              onClick={() => window.history.back()}
                            >
                              <i className="fas fa-times fs-5 me-2"></i>
                              <FormattedMessage id="manage-user.form.cancel" defaultMessage="Hủy" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
    
  });

  const mapDispatchToProps = (dispatch) => ({
      fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
      fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
      fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
      createNewUser: (data) => dispatch(actions.createNewUser(data)),
  });


  export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));
