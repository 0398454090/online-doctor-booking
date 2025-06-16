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
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditNewUser: handleEditNewUser,
    handleDeleteNewUser: handleDeleteNewUser,

};