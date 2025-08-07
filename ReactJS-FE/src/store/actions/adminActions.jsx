import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService } from '../../services/userService';
import { toast } from 'react-toastify';

export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo,
});

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data,
});

export const fetchGenderFail = (error) => ({
    type: actionTypes.FETCH_GENDER_FAIL,
    error,
});

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data,
});

export const fetchPositionFail = (error) => ({
    type: actionTypes.FETCH_POSITION_FAIL,
    error,
});

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data,
});

export const fetchRoleFail = (error) => ({
    type: actionTypes.FETCH_ROLE_FAIL,
    error,
});

// Fetch GENDER
export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService('GENDER');
            console.log('[GENDER] Response:', res);

            if (res && res.data && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data.data));
                console.log('[GENDER] Success:', res.data.data);
            } else {
                dispatch(fetchGenderFail(res?.data?.errMessage || 'Failed to fetch genders'));
                console.error('[GENDER] Fail:', res?.data?.errMessage);
            }
        } catch (e) {
            dispatch(fetchGenderFail(e.message || 'Failed to fetch genders'));
            console.error('[GENDER] Error:', e);
        }
    };
};

// Fetch POSITION
export const fetchPositionStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await getAllCodeService('POSITION');
            console.log('[POSITION] Response:', res);

            if (res && res.data && res.data.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data.data));
                console.log('[POSITION] Success:', res.data.data);
            } else {
                dispatch(fetchPositionFail(res?.data?.errMessage || 'Failed to fetch positions'));
                console.error('[POSITION] Fail:', res?.data?.errMessage);
            }
        } catch (e) {
            dispatch(fetchPositionFail(e.message || 'Failed to fetch positions'));
            console.error('[POSITION] Error:', e);
        }
    };
};

// Fetch ROLE
export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllCodeService('ROLE');
            console.log('[ROLE] Response:', res);

            if (res && res.data && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data.data));
                console.log('[ROLE] Success:', res.data.data);
            } else {
                dispatch(fetchRoleFail(res?.data?.errMessage || 'Failed to fetch roles'));
                console.error('[ROLE] Fail:', res?.data?.errMessage);
            }
        } catch (e) {
            dispatch(fetchRoleFail(e.message || 'Failed to fetch roles'));
            console.error('[ROLE] Error:', e);
        }
    };
};

// Create new user START action
export const createUserStart = () => ({
    type: actionTypes.CREATE_USER_START,
});

// Create new user SUCCESS action
export const saveUserSuccess = (newUser) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    newUser
});


// Create new user FAIL action
export const saveUserFailed = (errorMessage) => ({
    type: actionTypes.CREATE_USER_FAIL,
    error: errorMessage,
});

// Create new user THUNK
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      console.log('hoidanit check create user redux:', res);

      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess()); // hoặc truyền res.user nếu bạn có
        dispatch(fetchAllUsersStart()); // ✅ đúng cú pháp
      } else {
        dispatch(saveUserFailed(res?.errMessage || 'Failed to create user'));
      }
    } catch (e) {
      dispatch(saveUserFailed(e.message || 'Failed to create user'));
      console.log('saveUserFailed error', e);
    }
  };
};

// thunk action
export const fetchAllUsersStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
      let res = await getAllUsers("ALL");

      if (res && res.data && res.data.errCode === 0) {

        // Lấy đúng mảng user trong res.data.users.users
        dispatch(fetchAllUsersSuccess(res.data.users.users || []));
      } else {
        dispatch(fetchAllUsersFail(res?.data?.errMessage || 'Failed to fetch all users'));
      }
    } catch (e) {
      dispatch(fetchAllUsersFail(e.message || 'Failed to fetch all users'));
      console.log('fetchAllUsersFailed error', e);
    }
  };
};


// success action 
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data, // usually an array
});

// fail action — sửa lại để nhận lỗi
export const fetchAllUsersFail = (error) => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL,
    error,
});
export const deleteAUser = (userId) => {
  return async (dispatch) => {
    dispatch(deleteUserSuccess(userId)); // Optimistic update
    
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode !== 0) {
        dispatch(deleteUserFailed(res?.errMessage));
        // Optionally dispatch action to restore the user
      }
    } catch (error) {
      dispatch(deleteUserFailed(error.message));
      // Optionally dispatch action to restore the user
    }
  };
};

export const deleteUserSuccess = (userId) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  userId,
});


export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});



