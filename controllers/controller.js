const defaultController = (req , res) => {
    if(req.cookies.userId){
        res.render('src/html/index')
    }else{
        res.redirect('/login')
    }
}
module.exports={defaultController}