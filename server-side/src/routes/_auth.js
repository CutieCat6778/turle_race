const express = require('express');
const routes = new express.Router();
const Users = require('../../models/users');
const bcrypt = require('bcrypt');

// Main Route "/auth"
routes.get('/', async(req, res, next) => {
    if(!req.cookie || !req.cookie.user_data) return res.json({status: 405, message: "You haven't loged in! Please login"});
    res.json(req.cookie.user_data);
})

// Register API
routes.post('/register', async(req, res, next) => {
    const data = req.body;
    if(data){
        const ID_DATA = await Users.findOne({_id: data._id})
        if(!ID_DATA){
            data.info.password = await require('../../tools/hashPassword')(data.info.password);
            const userData = new Users(data);
            const user = new Users(userData);
            await user.save();
            res.cookie('user_data', userData, {maxAge: 360000});
            return res.redirect(`${process.env.URL}/`);
        }else return next(createError(500));
    }else return next(createError(500));
})

// Login API
routes.post('/login', (req, res, next) => {
    const data = req.body;
    if(data){
        const userData = await Users.findOne({_id: data._id})
        if(userData){
            const compare = await bcrypt.compare(data.info.password, userData.info.password);
            if(!compare) return res.render('loginFailed', {message: 'Incorrect password, please try again!'});
            res.cookie('user_data', userData, {maxAge: 360000});
            return res.redirect(`${process.env.URL}/`);
        }else return next(createError(500));
    }else return next(createError(500));
})

module.exports = routes;