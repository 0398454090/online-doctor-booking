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

module.exports = {
    handleLogin: handleLogin
};