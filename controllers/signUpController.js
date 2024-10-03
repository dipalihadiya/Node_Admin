const signUpModel = require('../models/singUp/signUpmodel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUpform = (req , res) => {

    res.render('src/html/authentication-register');

}

const signUpController = async (req , res) => {

    console.log("req" , req.body);
    if(req.body.password === req.body.con_password){
        
        bcrypt.hash(req.body.password , saltRounds , async (err , hashPassword) => {
            console.log("hash" , hashPassword);

            const data = {

                username : req.body.username,
                email : req.body.email,
                password : hashPassword
            }
            console.log("data" , data);
            
            try{
                let todo = new signUpModel(data);
                console.log("db" , todo);
                
                await todo.save();

                res.redirect('/login')
            }catch(err){
                console.log("err" , err);
                res.redirect('/login')
            }
            
        })
    }else{
        console.log("not workingg");
        
        res.redirect('/');
    }
    
}

module.exports = {signUpController , signUpform}