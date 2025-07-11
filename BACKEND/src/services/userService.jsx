import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};


const checkUserEmail = async (userEmail) => {
    try {
        const user = await db.User.findOne({
            where: { email: userEmail }
        });
        return !!user;
    } catch (error) {
        throw error;
    }
};

const handleUserLogin = async (email, password) => {
    try {
        let userData = {};
        const isExist = await checkUserEmail(email);

        if (!isExist) {
            userData.errCode = 1;
            userData.errMessage = 'Email does not exist';
            return userData;
        }

        const user = await db.User.findOne({
            where: { email },
            attributes: ['email', 'password', 'firstName', 'lastName', 'address'],
            raw: true
        });


        if (!user) {
            userData.errCode = 2;
            userData.errMessage = 'User not found';
            return userData;
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            userData.errCode = 3;
            userData.errMessage = 'Wrong password';
            return userData;
        }

        const { password: pw, ...userWithoutPassword } = user;
        userData.errCode = 0;
        userData.errMessage = 'Login successful';
        userData.user = userWithoutPassword;
        return userData;

    } catch (error) {
        throw error;
    }
};

const getAllUsers = async (userId) => {
    try {
        if (!userId) {
            return {
                errCode: 1,
                errMessage: 'Missing required parameter: id'
            };
        }

        let users = [];
        if (userId === 'ALL') {
            users = await db.User.findAll({
                attributes: { exclude: ['password'] }
            });
        } else {
            const user = await db.User.findOne({
                where: { id: userId },
                attributes: { exclude: ['password'] }
            });
            if (user) users.push(user);
        }

        return {
            errCode: 0,
            errMessage: 'OK',
            users
        };

    } catch (error) {
        throw error;
    }
};

const createNewUser = async (data) => {
    try {
        let check = await checkUserEmail(data.email);
        if (check === true) {
            return {
                errCode: 1,
                errMessage: 'Your email is already used, please try another email'
            };
        } else {
            let hashedPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId : data.roleId ,
                positionId: data.positionId,
                image: data.image
            });

            return {
                errCode: 0,
                errMessage: 'User created successfully!'
            };
        }

    } catch (error) {
        throw error;
    }
};


const deleteNewUser = async (userId) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            return {
                errCode: 2,
                errMessage: "The user doesn't exist!"
            };
        }

        await db.User.destroy({ where: { id: userId } });

        return {
            errCode: 0,
            message: 'The user has been deleted!'
        };

    } catch (error) {
        throw error;
    }
};

const updateUserData = async (data) => {
    try {
        if (!data.id) {
            return {
                errCode: 2,
                errMessage: 'Missing required parameter: id'
            };
        }

        const user = await db.User.findOne({ where: { id: data.id }, raw: false });

        if (!user) {
            return {
                errCode: 1,
                errMessage: "User's not found!"
            };
        }

        user.firstName = data.firstName || user.firstName;
        user.lastName = data.lastName || user.lastName;
        user.address = data.address || user.address;
        user.phonenumber = data.phonenumber || user.phonenumber;
        user.gender = data.gender !== undefined ? data.gender : user.gender;
        user.roleId  = data.roleId  || user.roleId ;
        user.positionId = data.positionId || user.positionId;

        await user.save();

        return {
            errCode: 0,
            message: 'Update successful!'
        };

    } catch (error) {
        throw error;
    }
};

const getAllCodeService = async (typeInput) => {
  try {
    if (!typeInput) {
      return {
        errCode: 1,
        errMessage: 'Missing required parameter: type'
      };
    }
    const allcode = await db.AllCode.findAll({ where: { type: typeInput } });
    return {
      errCode: 0,
      data: allcode
    };
  } catch (error) {
    console.error('Lỗi khi truy vấn AllCode:', error);
    throw error;
  }
};




module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser,
    hashUserPassword,
    deleteNewUser,
    updateUserData,
    getAllCodeService,
};
