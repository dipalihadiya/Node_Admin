const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const signUp = require('../controllers/signUpController');
const logIn = require('../controllers/loginController');
const passport = require('../config/passportConfig');
const isAuth = require('../auth/isAuth');
const blog = require('../controllers/blog');
const upload = require('../config/multerConfig');
const authContoller = require('../controllers/authController')

router.get('/' ,isAuth, controller.defaultController);
router.get('/signUp',signUp.signUpform)
router.post('/signUpController',signUp.signUpController)
router.get('/logIn' ,logIn.logIn)
router.get('/logout',isAuth,logIn.logout);
router.post('/logInController', passport.authenticate('local', { failureRedirect: '/logIn' }),logIn.logInController);
router.post('/addBlogController',upload.single('blog_img'),blog.addBlogController);
router.get('/addBlog' ,isAuth,blog.addBlog);
router.get('/viewBlog',isAuth,blog.viewBlog);
router.get('/editBlog/:id', blog.editController);
router.post('/updateBlog/:id', upload.single('blog_img'), blog.updateController);
router.get('/deleteBlog/:id', blog.deleteController);
router.get('/allBlog',isAuth,blog.allBlog);
router.get('/change-password' , authContoller.changePassword)
router.post('/changePassController',isAuth , authContoller.changePasscontroler)
router.get('/reset-password' , authContoller.resetPassword)
router.post('/resetPassController' , authContoller.resetPasscontroler)
router.get('/forget-password' , authContoller.forgetPasswordController)
router.post('/forgotPassController' , authContoller.forgotPassword)
router.get('/otpController' , authContoller.otpController)


module.exports = router;