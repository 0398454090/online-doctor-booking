import db from "../models/index.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data) => {
    try {
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
        });
        return 'Create a new user successfully!';
    } catch (error) {
        throw error;
    }
};

let hashUserPassword = async(password) => {
    return bcrypt.hash(password, salt);
};

let getallUsers = async() => {
    try {
        let users = await db.User.findAll({ raw: true });
        return users;
    } catch (error) {
        throw error;
    }
};

let getUserInfoById = async(userId) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId },
            raw: true
        });
        return user || null;
    } catch (error) {
        throw error;
    }
};

let updateUserData = async(data) => {
    try {
        let user = await db.User.findOne({ where: { id: data.id } });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allUsers = await db.User.findAll({ raw: true });
            return allUsers;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

let deleteUserById = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } });
            if (user) {
                await db.User.destroy({ where: { id: userId } });
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
}

export default {
    createNewUser,
    getallUsers,
    getUserInfoById,
    updateUserData,
    deleteUserById,
};