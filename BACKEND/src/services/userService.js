import bcrypt from 'bcryptjs/dist/bcrypt';
import db from '../models/index';
import { where } from 'sequelize';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
};

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

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            //check email is exist ???
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: "Email have exist, Please try another email!"

                })

            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleid,
                positionId: data.positionId,
                image: data.image
            })
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let deleteNewUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: userId }
            });

            if (!foundUser) {
                return resolve({
                    errCode: 2,
                    errMessage: "The user doesn't exist!"
                });
            }

            await db.User.destroy({
                where: { id: userId }
            });

            resolve({
                errCode: 0,
                message: "The user is deleted!"
            });
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing require paramasters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                // await db.User.save({
                //         firstName: data.firstName,
                //         lastName: data.lastName,
                //         address: data.address
                //     }, where: { id: userId }
                // })
                resolve({
                    errCode: 0,
                    message: "Update the user succeeds!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                })
            }
            return null;
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    deleteNewUser: deleteNewUser,
    updateUserData: updateUserData
};