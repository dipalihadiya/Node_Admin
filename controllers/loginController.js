const loginModel = require('../models/singUp/signUpmodel');
const bcrypt = require('bcrypt');

const logIn = (req , res) => {

    res.render('src/html/authentication-login');
}

const logInController = async (req , res) => {
    console.log("log innnn");
    
    res.redirect('/');
}
const logout = (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
}

module.exports = {logIn , logInController,logout};