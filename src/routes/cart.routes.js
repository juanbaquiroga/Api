import Router from 'express'
import { controller } from '../controllers/index.js';

const router =  Router()


router.route('/')
    .get( controller.cart)
    .post(controller.buyCart)
    .delete(controller.resetCart)
router.route('/add')
    .post(controller.addToCart)
router.route('/reset')
    .post(controller.resetCart)

export default router;