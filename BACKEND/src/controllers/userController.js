import userService from '../services/userService';

let handleLogin = async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing input parameters!'
            });
        }

        let userData = await userService.handleUserLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode || 0,
            message: userData.errMessage || 'Login successful!',
            user: userData.user || null
        });
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server'
        });
    }
}

let handleGetAllUsers = async(req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            users: []
        })
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
};

let handleCreateNewUser = async(req, res) => {
    try {
        const data = req.body;
        const avatarFile = req.file;

        if (!data.email || !data.password) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing email or password',
            });
        }

        // Debug
        console.log('Data from formData:', data);
        console.log('Avatar file:', avatarFile);

        const result = await userService.createNewUser(data, avatarFile);

        return res.status(200).json(result);
    } catch (e) {
        console.error('Create user error:', e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Lỗi server khi tạo user',
        });
    }
};

let handleDeleteNewUser = async(req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameter: id"
        });
    }

    let message = await userService.deleteNewUser(id);
    return res.status(200).json(message);
};



let handleEditNewUser = async(req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let getAllCode = async(req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu tham số type',
            });
        }

        let data = await userService.getAllCodeService(type);
        if (data.errCode !== 0) {
            return res.status(404).json({
                errCode: data.errCode,
                message: data.message || `Không tìm thấy dữ liệu cho type: ${type}`,
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: data.data,
        });
    } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu AllCode với type ${req.query.type}:`, error);
        return res.status(500).json({
            errCode: -1,
            message: 'Lỗi server khi lấy dữ liệu AllCode',
        });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditNewUser: handleEditNewUser,
    handleDeleteNewUser: handleDeleteNewUser,
    getAllCode: getAllCode
};