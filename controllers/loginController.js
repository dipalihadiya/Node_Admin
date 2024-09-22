const loginModel = require('../model/sinUpmodel');
const bcrypt = require('bcrypt');

const logIn = (req , res) => {

    res.render('src/html/authentication-login');
}

const logInController = async (req , res) => {

    const data = await loginModel.findOne({email : req.body.email});

    console.log("data" , data);

    console.log("req" , req.body);


    if(data){

        bcrypt.compare(req.body.password , data.password , (err, r) => {

            console.log("login model" , err ,r);

            if(r){
                
                console.log("login..");
                res.cookie('userId' , data._id)
                res.redirect('/');
                
            }else{
                console.log("not done..",err);

                res.redirect('/')
                
            }

            
        })

        console.log(req.body);
        
    }else{

        res.redirect('/');
    }
}

module.exports = {logIn , logInController};