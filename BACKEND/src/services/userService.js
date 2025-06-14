import bcrypt from 'bcryptjs/dist/bcrypt';
import db from '../models/index';

let handleUserLogin = async(email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'password', 'roleId']
                });

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login successful';
                        // Không trả về password cho client
                        let { password, ...userWithoutPassword } = user.dataValues;
                        userData.user = userWithoutPassword;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User does not exist';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email does not exist';
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};


let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = [];
            if (!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter: id'
                });
            } else if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: { exclude: ['password'] }
                });
            } else {
                let user = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password'] }
                });
                if (user) {
                    users.push(user); // chuyển thành array
                }
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
                users: users
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers
};