import e from "express";
import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async(req, res) => {
    try {
        let message = await CRUDService.createNewUser(req.body);
        console.log(message);
        return res.send('Post CRUD from server');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Create user failed');
    }
};

let displayGetCRUD = async(req, res) => {
    try {
        let data = await CRUDService.getallUsers();
        return res.render('displayCRUD.ejs', {
            dataTable: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Get users failed');
    }
};

let getEditCRUD = async(req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        if (userData) {
            return res.render('editCRUD.ejs', {
                user: userData
            });
        } else {
            return res.send('User not found in DB!');
        }
    } else {
        return res.send('User ID not provided!');
    }
};

let putCRUD = async(req, res) => {
    try {
        let data = req.body;
        let allUsers = await CRUDService.updateUserData(data);
        return res.render('displayCRUD.ejs', {
            dataTable: allUsers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Update user failed');
    }
};

let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('User deleted successfully');
    } else {
        return res.send('User ID not provided!');
    }
};

export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};