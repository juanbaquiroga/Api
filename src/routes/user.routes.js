import Router from 'express';
import { controller } from '../controllers/index.js';
import passport from 'passport';


const router =  Router()

router.get('/info', controller.info)
router.get('/logout', controller.logout);
router.route('/login').get(controller.login).post(passport.authenticate("login", { successRedirect:'/user/info', failureRedirect: "/user/fail-login" }), controller.login);
router.route('/register').get(controller.register).post(passport.authenticate('register', { failureRedirect:"/user/fail-register", }), controller.register)
router.route('/fail-login').get(controller.failLogin)
router.route('/fail-register').get(controller.failRegister)

export default router;