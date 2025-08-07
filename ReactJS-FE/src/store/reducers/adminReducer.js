import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    isCreatingUser: false,
    isLoadingUsers: false,
    userError: null,
    users: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false
            };
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                isLoadingGender: false
            };

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
                isLoadingPosition: false
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                isLoadingPosition: false
            };

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
                isLoadingRole: false
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                isLoadingRole: false
            };

            // ✅ CREATE USER
        case actionTypes.CREATE_USER_START:
            return {
                ...state,
                isCreatingUser: true,
                userError: null
            };
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isCreatingUser: false,
                userError: null,
                users: [...state.users, action.newUser] // ✅ thêm user mới vào danh sách
            };

        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
                isCreatingUser: false,
                userError: action.error || 'Lỗi tạo user'
            };

        case actionTypes.FETCH_ALL_USERS_START:
            return {
                ...state,
                isLoadingUsers: true
            };

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users || [],
                isLoadingUsers: false
            };


        case actionTypes.FETCH_ALL_USERS_FAIL:
            return {
                ...state,
                users: [],
                isLoadingUsers: false
            };

        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId) // lọc bỏ user đã xóa
            };

        case actionTypes.DELETE_USER_FAIL:
            // Có thể xử lý lỗi nếu cần hoặc giữ nguyên state
            return state;
        default:
            return state;
    }
};

export default adminReducer;