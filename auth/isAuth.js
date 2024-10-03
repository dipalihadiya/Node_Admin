
const isAuth = (req,res,next) => {
    console.log("isAuth");
    
    if(req.isAuthenticated()){
        console.log("isAuth : authenticated");
        
        next();
    }else{
        console.log("isAuth: redirecting to login");
        
        res.redirect('/login')
    }

}

module.exports = isAuth;