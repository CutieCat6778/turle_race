const express = require('express');
const routes = new express.Router();

//Rendering the Main page
routes.get('/', (req, res, next) => {
    if(!req.cookie || !req.cookie.user_data) return res.json({status: 405, message: "You haven't loged in! Please login"});
    res.json(req.cookie.user_data);
})

module.exports = routes;