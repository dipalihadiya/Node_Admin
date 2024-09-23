const model = require('../model/sinUpmodel')
const defaultController = async(req , res) => {
    const data = await model.findOne({_id:req.cookies.userId});
    if(req.cookies.userId){
        res.render('src/html/index',{data})
    }else{
        res.redirect('/login')
    }
}
const profileController = async(req,res) =>{

    if(req.cookies.userId){
        console.log("req.cookies.userId",req.cookies.userId);
        
        const data = await model.findOne({_id:req.cookies.userId});
        console.log("profile con",data);
        res.render('src/html/profile',{data})
    }else{
        res.redirect('/login')
    }
    
}
module.exports={defaultController,profileController}