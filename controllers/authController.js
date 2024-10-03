const bcrypt = require('bcrypt')
const userModel = require('../models/singUp/signUpmodel');
const otp_generator = require('otp-generator');

let otp = null


const forgotPassword = (req,res) => {
    console.log("forgot passwoard");
    res.render('src/html/forgotPassword');


}
const forgetPasswordController = async (req,res) => {

    console.log("forget password");

    const {email} = req.body;
    const user = await userModel.findOne({email: email});
    if(user){
        console.log("user found");
        res.redirect('/changePassword');
    }else{
        console.log("user not found");
        res.redirect('/forgotPassword');
    }


}

const changePassword = (req,res) => {

    console.log("change password");
    res.render('src/html/changePassword');
}


const otpController = (req,res) => {

    console.log("otp");

    otp = otp_generator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    res.send(otp);

}

const changePasscontroler = async (req,res) => {

    console.log("change passs");
    
    const {password} = req.user;
    const {con_password, new_password, cur_password} = req.body;
    
    bcrypt.compare(cur_password, password, (err, result) => {
                    
        console.log("result",result);
    
        if(result){
            console.log("password matched");    
    
            if(new_password === con_password){
                
                bcrypt.hash(new_password , 10 , async (err , hashPassword) => {
                    console.log("hash" , hashPassword);
                
                    const updatepass = await userModel.updateOne({_id: req.user._id}, {password: hashPassword});
                    console.log("updatepass" , updatepass);
                    
                })
                res.redirect('/');
        }else{
            console.log("password not matched");
            res.redirect('/changePassword');
        }
        }else{
            console.log("password not matched");
            res.redirect('/forgotPassword');
    
        }
    
    })
}


const resetPassword = (req,res) => {

    console.log("reset password");

    res.render('src/html/resetPassword');


}

const resetPasscontroler = async (req,res) => {
    console.log("reset passs");

    const {password} = req.user;
    const {con_password, new_password, cur_password} = req.body;
    
    bcrypt.compare(cur_password, password, (err, result) => {
                    
        console.log("result",result);
    
        if(result){
            console.log("password matched");    
    
            if(new_password === con_password){
                
                bcrypt.hash(new_password , 10 , async (err , hashPassword) => {
                    console.log("hash" , hashPassword);
                
                    const updatepass = await userModel.updateOne({_id: req.user._id}, {password: hashPassword});
                    console.log("updatepass" , updatepass);
                    
                })
                res.redirect('/');
        }else{
            console.log("password not matched");
            res.redirect('/resetPassword');
        }
        }else{
            console.log("password not matched");
            res.redirect('/forgotPassword');
    
        }                   

    })

}

module.exports = {forgotPassword,changePassword,forgetPasswordController,changePasscontroler ,otpController,resetPasscontroler,resetPassword}