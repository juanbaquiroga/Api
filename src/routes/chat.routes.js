import Router from 'express';
import { controller } from '../controllers/index.js';

const router =  Router()

router.route('/').get(controller.getChat)
router.route('/user').get(controller.getUserChat)


export default router;